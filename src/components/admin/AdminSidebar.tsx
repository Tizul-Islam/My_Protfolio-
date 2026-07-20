"use client";

import { useRouter } from "next/navigation";

export type AdminSection =
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "services"
  | "contact"
  | "password";

type SidebarItem = {
  id: AdminSection;
  label: string;
  emoji: string;
  description: string;
};

const sidebarItems: SidebarItem[] = [
  { id: "hero", label: "Hero", emoji: "🏠", description: "Name, roles, links" },
  { id: "about", label: "About", emoji: "👤", description: "Bio, experience, education" },
  { id: "skills", label: "Skills", emoji: "🛠️", description: "Tech stack categories" },
  { id: "projects", label: "Projects", emoji: "📁", description: "Portfolio projects" },
  { id: "services", label: "Services", emoji: "⚙️", description: "Service offerings" },
  { id: "contact", label: "Contact", emoji: "📞", description: "Email, phone, location" },
  { id: "password", label: "Password", emoji: "🔑", description: "Change admin password" },
];

type Props = {
  active: AdminSection;
  onChange: (section: AdminSection) => void;
};

export default function AdminSidebar({ active, onChange }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("portfolio_admin_session");
    router.push("/admin");
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-[#080810] border-b md:border-b-0 md:border-r border-gray-800/80 flex flex-col min-h-0 md:min-h-screen flex-shrink-0">
      {/* Header */}
      <div className="p-5 border-b border-gray-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00ff99]/10 border border-[#00ff99]/20 flex items-center justify-center text-[#00ff99] text-lg flex-shrink-0">
            🎛️
          </div>
          <div>
            <h2 className="text-white font-extrabold font-poppins text-[15px] leading-none">Admin Panel</h2>
            <p className="text-gray-600 text-[11px] font-inter mt-0.5">Portfolio Control Board</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {/* Mobile: horizontal scroll, Desktop: vertical */}
        <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0">
          {sidebarItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                id={`admin-nav-${item.id}`}
                onClick={() => onChange(item.id)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left cursor-pointer flex-shrink-0 md:flex-shrink min-w-max md:min-w-0 w-full ${
                  isActive
                    ? "bg-[#00ff99]/10 border border-[#00ff99]/20 text-white"
                    : "border border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                <span className="text-xl leading-none flex-shrink-0">{item.emoji}</span>
                <div className="min-w-0">
                  <p className={`text-sm font-bold font-inter leading-none ${isActive ? "text-white" : ""}`}>
                    {item.label}
                  </p>
                  <p className="text-[11px] text-gray-600 mt-0.5 font-inter hidden md:block truncate">
                    {item.description}
                  </p>
                </div>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00ff99] flex-shrink-0 hidden md:block" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-800/60 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200 cursor-pointer w-full"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span className="text-sm font-inter">View Portfolio</span>
        </a>
        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 cursor-pointer w-full"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="text-sm font-inter">Logout</span>
        </button>
      </div>
    </aside>
  );
}
