"use client";

import { useEffect, useRef } from "react";

const VERTEXT_SHADER_SOURCE = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform vec3 u_ripples[12]; // x: x_pos, y: y_pos, z: normalized_age (0.0 to 1.0)
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    
    vec2 disp = vec2(0.0);
    
    for (int i = 0; i < 12; i++) {
      vec3 ripple = u_ripples[i];
      float age = ripple.z;
      
      if (age > 0.0) {
        vec2 r_pos = ripple.xy;
        vec2 diff = uv - r_pos;
        diff.x *= aspect;
        
        float dist = length(diff);
        float radius = age * 0.45; // Wave propagation speed/limit
        
        if (dist < radius && dist > radius - 0.12) {
          // Wave falloff formulas
          float waveFront = (dist - radius) * 50.0;
          float strength = (1.0 - age) * 0.035 * smoothstep(0.0, 0.04, age);
          float wave = sin(waveFront) * strength;
          disp += normalize(diff) * wave;
        }
      }
    }
    
    vec2 displacedUv = uv + disp;
    
    // Deep space black base matching portfolio #040406
    vec3 baseBg = vec3(0.015, 0.015, 0.024);
    
    // Soft radial glows displaced by water ripples
    float g1 = length(displacedUv - vec2(0.15, 0.15));
    vec3 glow1 = vec3(0.0, 1.0, 0.6) * (1.0 - smoothstep(0.0, 0.45, g1)) * 0.025;
    
    float g2 = length(displacedUv - vec2(0.85, 0.85));
    vec3 glow2 = vec3(0.0, 0.8, 1.0) * (1.0 - smoothstep(0.0, 0.50, g2)) * 0.025;
    
    vec3 color = baseBg + glow1 + glow2;
    
    // Ambient repeating dot grid mapping displaced by ripples
    vec2 gridUv = fract(displacedUv * u_resolution / 24.0);
    float gridLine = step(0.96, gridUv.x) + step(0.96, gridUv.y);
    color += vec3(0.006) * gridLine;
    
    // Highlight ripple wave fronts with neon green accent glow
    color += vec3(0.0, 1.0, 0.6) * length(disp) * 0.65;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported, falling back to static CSS background.");
      return;
    }

    // Helper functions for shader compilation
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation failed: ", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(VERTEXT_SHADER_SOURCE, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(FRAGMENT_SHADER_SOURCE, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking failed: ", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup full screen quad buffer
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uRipples = gl.getUniformLocation(program, "u_ripples");

    // Setup uniform ripples array data
    const ripples = Array(12).fill(0).map(() => ({ x: 0, y: 0, age: 0 }));
    const ripplesData = new Float32Array(36);
    let nextRippleIndex = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - (e.clientY / window.innerHeight);

      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 18) {
        ripples[nextRippleIndex] = { x, y, age: 0.01 };
        nextRippleIndex = (nextRippleIndex + 1) % 12;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const x = touch.clientX / window.innerWidth;
      const y = 1.0 - (touch.clientY / window.innerHeight);

      const dx = touch.clientX - lastMouseX;
      const dy = touch.clientY - lastMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 18) {
        ripples[nextRippleIndex] = { x, y, age: 0.01 };
        nextRippleIndex = (nextRippleIndex + 1) % 12;
        lastMouseX = touch.clientX;
        lastMouseY = touch.clientY;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - (e.clientY / window.innerHeight);
      
      // Spawn two ripples slightly offset to create a splash effect
      ripples[nextRippleIndex] = { x, y, age: 0.01 };
      nextRippleIndex = (nextRippleIndex + 1) % 12;
      
      setTimeout(() => {
        ripples[nextRippleIndex] = { x: x + 0.01, y: y - 0.01, age: 0.02 };
        nextRippleIndex = (nextRippleIndex + 1) % 12;
      }, 50);
    };

    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (Math.abs(scrollDiff) > 4) {
        const x = lastMouseX / window.innerWidth;
        const y = 1.0 - (lastMouseY / window.innerHeight);
        ripples[nextRippleIndex] = { x, y, age: 0.01 };
        nextRippleIndex = (nextRippleIndex + 1) % 12;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Render loop
    let animationId: number;
    const render = () => {
      // Update ripple age details
      for (let i = 0; i < 12; i++) {
        const r = ripples[i];
        if (r.age > 0) {
          r.age += 0.018; // Speed of ripple fade/propagation
          if (r.age > 1.0) {
            r.age = 0.0;
          }
        }
        ripplesData[i * 3] = r.x;
        ripplesData[i * 3 + 1] = r.y;
        ripplesData[i * 3 + 2] = r.age;
      }

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform3fv(uRipples, ripplesData);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    render();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-30 block bg-[#040406]"
    />
  );
}
