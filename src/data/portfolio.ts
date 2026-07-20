// ============================================================
// PORTFOLIO DATA — Central Source of Truth
// Admin Dashboard এই file-এর data পড়ে এবং localStorage-এ save করে।
// Portfolio components localStorage থেকে data পড়ে, না পেলে এই default data ব্যবহার করে।
// ============================================================

export type SocialLink = {
  platform: "GitHub" | "LinkedIn" | "Facebook";
  href: string;
};

export type Stat = {
  icon: string; // icon name string (e.g. "FaGraduationCap")
  value: string;
  label: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  projects: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  description: string;
};

export type SkillItem = {
  name: string;
  iconKey: string; // key to look up the icon in the icon map
  color: string;
};

export type SkillCategory = {
  title: string;
  categoryIconKey: string;
  skills: SkillItem[];
};

export type Project = {
  title: string;
  description: string;
  features: string[];
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  image?: string;
};

export type Service = {
  iconKey: string;
  title: string;
  description: string;
  link: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  location: string;
};

export type HeroData = {
  name: string;
  shortName: string;
  roles: string[];
  bio: string;
  socialLinks: SocialLink[];
  resumeFileName: string;
  availableForOpportunities: boolean;
};

export type AboutData = {
  heading: string;
  subheading: string;
  currentFocus: string;
  profileBio: string[];
  stats: Stat[];
  experience: ExperienceItem[];
  education: EducationItem[];
};

export type PortfolioData = {
  hero: HeroData;
  about: AboutData;
  skillCategories: SkillCategory[];
  projects: Project[];
  services: Service[];
  contact: ContactInfo;
};

// ============================================================
// DEFAULT DATA — এটাই original portfolio-র সব content
// ============================================================

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Tizul Islam",
    shortName: "K.M Tizul Islam",
    roles: ["Full Stack Developer", "Software Engineer", "Problem Solver"],
    bio: "Computer Science graduate building responsive frontends, scalable backends, and full-stack web architectures. I craft optimized solutions with React, Next.js, and Node.js.",
    socialLinks: [
      { platform: "GitHub", href: "https://github.com/Tizul-Islam" },
      { platform: "LinkedIn", href: "https://www.linkedin.com/in/tizul-islam" },
      { platform: "Facebook", href: "https://www.facebook.com/tizulislamtt/" },
    ],
    resumeFileName: "Tizul_Islam_Resume.pdf",
    availableForOpportunities: true,
  },

  about: {
    heading: "I'm K.M Tizul Islam, a Passionate",
    subheading: "Web Developer",
    currentFocus: "Full Stack Dev",
    profileBio: [
      "I'm a Computer Science graduate with hands-on experience in full-stack engineering. I enjoy developing high-quality, responsive web products from concept to deploy, applying clean-code guidelines and architectural standards.",
      "My skills span both ends of the stack: frontend UI building with React, Next.js, and Tailwind CSS, and robust backends powered by Node.js, Express, PostgreSQL, and Prisma.",
    ],
    stats: [
      { icon: "FaGraduationCap", value: "2025", label: "CSE Graduate" },
      { icon: "FaLaptopCode", value: "6 Mo", label: "Zensoft Intern" },
      { icon: "FaProjectDiagram", value: "4+", label: "Live Projects" },
    ],
    experience: [
      {
        role: "Junior Front-End Developer Intern",
        company: "Zensoft Lab",
        period: "June – Nov 2025",
        description:
          "Shipped high-fidelity interfaces, managed complex UI state, integrated authentication, and managed REST API connections using Git-based workflows. Collaborated closely with backend developers and design specs.",
        projects: ["AmaderShikkha", "ANT2025", "imc-solution", "Zensoft Lab Website"],
      },
    ],
    education: [
      {
        degree: "B.Sc. in Computer Science & Engineering",
        institution: "Green University of Bangladesh",
        period: "Class of 2025",
        description:
          "Completed a comprehensive computer science syllabus. Participated in intra-department programming competitions and ICPC selection rounds. Active member of the Green University Computer Club (GUCC).",
      },
    ],
  },

  skillCategories: [
    {
      title: "Frontend & Languages",
      categoryIconKey: "BsCodeSlash",
      skills: [
        { name: "React.js", iconKey: "FaReact", color: "text-[#61dafb]" },
        { name: "Next.js", iconKey: "SiNextdotjs", color: "text-white" },
        { name: "TypeScript", iconKey: "SiTypescript", color: "text-[#3178c6]" },
        { name: "Tailwind CSS", iconKey: "SiTailwindcss", color: "text-[#38bdf8]" },
        { name: "Framer Motion", iconKey: "SiFramer", color: "text-[#f43f5e]" },
        { name: "Shadcn/UI", iconKey: "SiShadcnui", color: "text-white" },
        { name: "TanStack Query", iconKey: "SiReactquery", color: "text-[#ff4154]" },
      ],
    },
    {
      title: "Backend & APIs",
      categoryIconKey: "FaServer",
      skills: [
        { name: "Node.js", iconKey: "FaNodeJs", color: "text-[#339933]" },
        { name: "Express.js", iconKey: "SiExpress", color: "text-white" },
        { name: "REST API", iconKey: "BsGlobe", color: "text-[#00ff99]" },
        { name: "JWT Authentication", iconKey: "SiJsonwebtokens", color: "text-[#d63aff]" },
        { name: "Prisma ORM", iconKey: "SiPrisma", color: "text-[#5a67d8]" },
        { name: "RBAC", iconKey: "FaShieldAlt", color: "text-[#ff4a4a]" },
      ],
    },
    {
      title: "Database & Storage",
      categoryIconKey: "BsDatabase",
      skills: [
        { name: "PostgreSQL", iconKey: "SiPostgresql", color: "text-[#4169e1]" },
        { name: "MongoDB", iconKey: "SiMongodb", color: "text-[#47a248]" },
        { name: "Prisma", iconKey: "SiPrisma", color: "text-[#5a67d8]" },
        { name: "SQL", iconKey: "BsDatabase", color: "text-[#00d2ff]" },
      ],
    },
    {
      title: "Cloud & DevOps",
      categoryIconKey: "FaDocker",
      skills: [
        { name: "Docker", iconKey: "FaDocker", color: "text-[#2496ed]" },
        { name: "Nginx", iconKey: "SiNginx", color: "text-[#009639]" },
        { name: "GitHub Actions", iconKey: "SiGithubactions", color: "text-[#2088ff]" },
        { name: "CI/CD", iconKey: "BiGitBranch", color: "text-[#ff9d00]" },
      ],
    },
    {
      title: "Cloud & Services",
      categoryIconKey: "FaAws",
      skills: [
        { name: "AWS", iconKey: "FaAws", color: "text-[#ff9900]" },
        { name: "Cloudinary", iconKey: "SiCloudinary", color: "text-[#3448c5]" },
        { name: "Stripe", iconKey: "SiStripe", color: "text-[#635bff]" },
      ],
    },
    {
      title: "AI & Automation",
      categoryIconKey: "BsRobot",
      skills: [
        { name: "OpenAI API", iconKey: "SiOpenai", color: "text-[#10a37f]" },
        { name: "LangChain", iconKey: "SiLangchain", color: "text-[#13b55c]" },
        { name: "RAG", iconKey: "FaBrain", color: "text-[#a855f7]" },
        { name: "pgvector", iconKey: "SiPostgresql", color: "text-[#4169e1]" },
        { name: "n8n", iconKey: "BsCpu", color: "text-[#ff6d5a]" },
      ],
    },
  ],

  projects: [
    {
      title: "Amader Shikkha",
      description:
        "Multi-tenant education management platform where institutions manage courses, admissions, blogs, and galleries with their own branding. Features multi-tenant routing, Google OAuth, and real-time caching.",
      features: [
        "Multi-Tenant Tenant Routing",
        "Google OAuth Integration",
        "Real-time Query Caching",
      ],
      tags: ["React 19", "Vite", "Tailwind", "Firebase", "DaisyUI"],
      liveUrl: "https://amadershikkha.com/",
      image: "/projects/amadershikkha.png",
    },
    {
      title: "ANT — Shop Management",
      description:
        "Role-based B2B e-commerce system linking manufacturers and retailers with QR shop profiles, balance and inventory tracking, and ordering flows with JWT authentication.",
      features: [
        "Role-Based Dashboard System",
        "Inventory & Balance Tracking",
        "JWT & Secure Auth Routing",
      ],
      tags: ["React 19", "Vite", "Tailwind", "Axios", "JWT"],
      liveUrl: "https://ant2025.com/",
      image: "/projects/ant2025.png",
    },
    {
      title: "IMC-Solution",
      description:
        "Corporate site for a sustainable business solutions partner, highlighting supply channels, sustainable sourcing positioning, and engineering services under a modern dark branding narrative.",
      features: [
        "Sustainable Sourcing Portfolio",
        "Modern Supply Narrative UI",
        "Highly Responsive Layouts",
      ],
      tags: ["React 19", "Vite", "Tailwind", "Axios"],
      liveUrl: "https://imc-solution.com/",
      image: "/projects/imc-solution.png",
    },
    {
      title: "Zensoft Lab",
      description:
        "Full agency website for Zensoft Lab featuring a modern dark landing page, multi-section layout, and conversion-focused copywriting with full mobile responsiveness.",
      features: [
        "Agency Brand Storytelling",
        "Animated Hero Sections",
        "Mobile-First Responsive UI",
      ],
      tags: ["React 19", "Vite", "Tailwind"],
      liveUrl: "https://zensoftlab.com/",
      image: "/projects/zensoftlab.png",
    },
  ],

  services: [
    {
      iconKey: "BsCodeSlash",
      title: "Frontend Engineering",
      description:
        "Crafting modern, responsive, and accessible user interfaces with exceptional user experience.",
      link: "#projects",
    },
    {
      iconKey: "BsLaptop",
      title: "Full Stack Solutions",
      description:
        "Building secure, scalable, and production-ready web applications from frontend to backend.",
      link: "#projects",
    },
    {
      iconKey: "FaServer",
      title: "API & Backend Engineering",
      description:
        "Developing high-performance REST APIs with authentication, database optimization, and clean architecture.",
      link: "#skills",
    },
    {
      iconKey: "BsBarChart",
      title: "Business Applications",
      description:
        "Developing dashboards, management systems, SaaS platforms, and enterprise web solutions.",
      link: "#projects",
    },
    {
      iconKey: "BsLightningCharge",
      title: "Performance Optimization",
      description:
        "Improving application speed, scalability, SEO, accessibility, and overall user experience.",
      link: "#skills",
    },
    {
      iconKey: "BsCloudUpload",
      title: "Deployment & Maintenance",
      description:
        "Managing deployment pipelines, cloud hosting, monitoring, and continuous delivery for reliable production environments.",
      link: "#contact",
    },
  ],

  contact: {
    email: "tizulislamtt@gmail.com",
    phone: "+880 1875-607026",
    location: "West Kafrul, Mirpur, Dhaka-1216",
  },
};

// ============================================================
// STORAGE KEY
// ============================================================
export const STORAGE_KEY = "portfolio_data_v1";

// ============================================================
// HELPER — Load data (localStorage first, then default)
// Client-side only (call inside useEffect or 'use client' components)
// ============================================================
export function loadPortfolioData(): PortfolioData {
  if (typeof window === "undefined") return defaultPortfolioData;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultPortfolioData;
    const parsed = JSON.parse(saved) as PortfolioData;
    // Merge with defaults to handle new fields added later
    return {
      ...defaultPortfolioData,
      ...parsed,
      hero: { ...defaultPortfolioData.hero, ...parsed.hero },
      about: { ...defaultPortfolioData.about, ...parsed.about },
      contact: { ...defaultPortfolioData.contact, ...parsed.contact },
    };
  } catch {
    return defaultPortfolioData;
  }
}

// ============================================================
// HELPER — Save data to localStorage
// ============================================================
export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
