"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  PortfolioData,
  loadPortfolioData,
  savePortfolioData,
  defaultPortfolioData,
} from "@/data/portfolio";

import AdminSidebar, { AdminSection } from "@/components/admin/AdminSidebar";
import HeroEditor from "@/components/admin/HeroEditor";
import AboutEditor from "@/components/admin/AboutEditor";
import SkillsEditor from "@/components/admin/SkillsEditor";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import ServicesEditor from "@/components/admin/ServicesEditor";
import ContactEditor from "@/components/admin/ContactEditor";
import PasswordEditor from "@/components/admin/PasswordEditor";

const SESSION_KEY = "portfolio_admin_session";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<AdminSection>("hero");

  // Lazy init: load from localStorage on first render
  const [data, setData] = useState<PortfolioData>(() => {
    if (typeof window !== "undefined") {
      return loadPortfolioData();
    }
    return defaultPortfolioData;
  });

  const [saved, setSaved] = useState(false);
  const [unsaved, setUnsaved] = useState(false);

  // Auth guard — redirect if not logged in (router is external system, no setState here)
  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) {
      router.replace("/admin");
    }
  }, [router]);

  // ─── handleDataChange ──────────────────────────────────────────
  // Called from editor onChange handlers (user interaction — not an effect).
  // Updating state here is safe: it's driven by an event, not an effect body.
  const handleDataChange = useCallback((updater: (prev: PortfolioData) => PortfolioData) => {
    setData(updater);
    setUnsaved(true);
    setSaved(false);
  }, []);

  // ─── handleSave ───────────────────────────────────────────────
  const handleSave = useCallback(() => {
    savePortfolioData(data);
    setSaved(true);
    setUnsaved(false);
    // Auto-clear saved badge after 3s (inside setTimeout callback — allowed)
    setTimeout(() => setSaved(false), 3000);
  }, [data]);

  // Keyboard shortcut: Ctrl+S to save
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSave]);

  const handleResetAll = () => {
    if (!confirm("সব data reset হয়ে default-এ ফিরে যাবে। Continue?")) return;
    setData(defaultPortfolioData);
    setUnsaved(false);
    savePortfolioData(defaultPortfolioData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSidebar active={activeSection} onChange={(s) => { setActiveSection(s); setSaved(false); }} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="border-b border-gray-800/80 px-6 py-3.5 flex items-center justify-between gap-4 bg-[#06060e]/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-sm text-gray-500 font-inter hidden sm:block">Dashboard</span>
            <span className="text-gray-700 hidden sm:block">/</span>
            <span className="text-sm font-bold text-white font-inter capitalize">{activeSection}</span>
            {unsaved && (
              <span className="flex items-center gap-1.5 text-xs text-yellow-500/80 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full font-inter">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                Unsaved
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs text-gray-600 font-inter hidden md:block">Ctrl+S to save</span>
            <button
              id="dashboard-reset-btn"
              onClick={handleResetAll}
              className="text-xs text-gray-600 hover:text-red-400 border border-gray-800 hover:border-red-500/30 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-inter hidden sm:block"
            >
              Reset All
            </button>
            <button
              id="dashboard-save-btn"
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm font-inter transition-all duration-300 cursor-pointer ${
                saved
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-[#00ff99] text-black hover:bg-[#00e688] shadow-[0_0_15px_rgba(0,255,153,0.15)]"
              }`}
            >
              {saved ? "✓ Saved!" : "💾 Save"}
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-6 max-w-4xl w-full mx-auto">
          {/* Dot background */}
          <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-20 -z-10" />

          {activeSection === "hero" && (
            <HeroEditor
              data={data.hero}
              onChange={(hero) => handleDataChange((prev) => ({ ...prev, hero }))}
              onSave={handleSave}
              saved={saved}
            />
          )}
          {activeSection === "about" && (
            <AboutEditor
              data={data.about}
              onChange={(about) => handleDataChange((prev) => ({ ...prev, about }))}
              onSave={handleSave}
              saved={saved}
            />
          )}
          {activeSection === "skills" && (
            <SkillsEditor
              data={data.skillCategories}
              onChange={(skillCategories) => handleDataChange((prev) => ({ ...prev, skillCategories }))}
              onSave={handleSave}
              saved={saved}
            />
          )}
          {activeSection === "projects" && (
            <ProjectsEditor
              data={data.projects}
              onChange={(projects) => handleDataChange((prev) => ({ ...prev, projects }))}
              onSave={handleSave}
              saved={saved}
            />
          )}
          {activeSection === "services" && (
            <ServicesEditor
              data={data.services}
              onChange={(services) => handleDataChange((prev) => ({ ...prev, services }))}
              onSave={handleSave}
              saved={saved}
            />
          )}
          {activeSection === "contact" && (
            <ContactEditor
              data={data.contact}
              onChange={(contact) => handleDataChange((prev) => ({ ...prev, contact }))}
              onSave={handleSave}
              saved={saved}
            />
          )}
          {activeSection === "password" && <PasswordEditor />}
        </div>
      </main>
    </div>
  );
}
