"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ADMIN_PASSWORD_KEY = "portfolio_admin_pw";
const DEFAULT_PASSWORD = "tizul@admin2025";
const SESSION_KEY = "portfolio_admin_session";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Already logged in? Go to dashboard
  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === "authenticated") {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Get stored password or use default
    const storedPw = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;

    setTimeout(() => {
      if (password === storedPw) {
        sessionStorage.setItem(SESSION_KEY, "authenticated");
        router.push("/admin/dashboard");
      } else {
        setError("Wrong password! Try again.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff99]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-[#0a0a10]/90 border border-gray-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ff99]/60 to-transparent" />

          {/* Logo / Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#00ff99]/10 border border-[#00ff99]/20 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,255,153,0.1)]">
              <svg className="w-8 h-8 text-[#00ff99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-white font-poppins tracking-tight">Admin Panel</h1>
            <p className="text-gray-500 text-sm font-inter mt-1">Portfolio Control Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="admin-password" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-inter">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoComplete="current-password"
                  className="w-full bg-[#0f0f18] border border-gray-800 rounded-xl px-4 py-3.5 text-white text-sm font-inter placeholder-gray-600 focus:outline-none focus:border-[#00ff99]/50 focus:ring-1 focus:ring-[#00ff99]/20 transition-all duration-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm font-inter"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#00ff99] text-black font-bold py-3.5 rounded-xl hover:bg-[#00e688] transition-all duration-300 shadow-[0_0_25px_rgba(0,255,153,0.2)] hover:shadow-[0_0_35px_rgba(0,255,153,0.35)] disabled:opacity-50 disabled:cursor-not-allowed font-inter text-sm relative overflow-hidden group cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Enter Dashboard"
              )}
            </button>
          </form>

          {/* Back to portfolio link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors font-inter"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>

        {/* Hint text */}
        <p className="text-center text-xs text-gray-700 mt-4 font-inter">
          Default password: <span className="text-gray-500 font-mono">tizul@admin2025</span>
        </p>
      </motion.div>
    </div>
  );
}
