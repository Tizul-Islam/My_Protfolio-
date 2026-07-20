"use client";

import { useState } from "react";
import { AboutData, ExperienceItem, EducationItem } from "@/data/portfolio";

type Props = {
  data: AboutData;
  onChange: (data: AboutData) => void;
  onSave: () => void;
  saved: boolean;
};

export default function AboutEditor({ data, onChange, onSave, saved }: Props) {
  const [activeTab, setActiveTab] = useState<"profile" | "experience" | "education">("profile");

  const update = <K extends keyof AboutData>(key: K, value: AboutData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const updateStat = (index: number, field: "value" | "label", value: string) => {
    const stats = [...data.stats];
    stats[index] = { ...stats[index], [field]: value };
    update("stats", stats);
  };

  // --- Profile Bio ---
  const updateBioLine = (index: number, value: string) => {
    const bio = [...data.profileBio];
    bio[index] = value;
    update("profileBio", bio);
  };

  // --- Experience ---
  const addExperience = () => {
    const empty: ExperienceItem = {
      role: "New Role",
      company: "Company Name",
      period: "Month – Month Year",
      description: "Description of responsibilities...",
      projects: [],
    };
    update("experience", [...data.experience, empty]);
  };

  const removeExperience = (i: number) => {
    update("experience", data.experience.filter((_, idx) => idx !== i));
  };

  const updateExperience = (i: number, field: keyof ExperienceItem, value: string | string[]) => {
    const list = [...data.experience];
    list[i] = { ...list[i], [field]: value };
    update("experience", list);
  };

  const updateExpProject = (expIndex: number, projIndex: number, value: string) => {
    const projects = [...data.experience[expIndex].projects];
    projects[projIndex] = value;
    updateExperience(expIndex, "projects", projects);
  };

  const addExpProject = (expIndex: number) => {
    const projects = [...data.experience[expIndex].projects, "Project Name"];
    updateExperience(expIndex, "projects", projects);
  };

  const removeExpProject = (expIndex: number, projIndex: number) => {
    const projects = data.experience[expIndex].projects.filter((_, i) => i !== projIndex);
    updateExperience(expIndex, "projects", projects);
  };

  // --- Education ---
  const addEducation = () => {
    const empty: EducationItem = {
      degree: "Degree Name",
      institution: "Institution",
      period: "Year",
      description: "Description...",
    };
    update("education", [...data.education, empty]);
  };

  const removeEducation = (i: number) => {
    update("education", data.education.filter((_, idx) => idx !== i));
  };

  const updateEducation = (i: number, field: keyof EducationItem, value: string) => {
    const list = [...data.education];
    list[i] = { ...list[i], [field]: value };
    update("education", list);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-poppins">👤 About Section</h2>
          <p className="text-gray-500 text-sm font-inter mt-1">Bio, stats, experience এবং education</p>
        </div>
        <button
          id="about-save-btn"
          onClick={onSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm font-inter transition-all duration-300 cursor-pointer ${
            saved
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-[#00ff99] text-black hover:bg-[#00e688] shadow-[0_0_20px_rgba(0,255,153,0.2)]"
          }`}
        >
          {saved ? "✓ Saved!" : "💾 Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#0a0a12] rounded-xl p-1 border border-gray-800/60 w-fit">
        {(["profile", "experience", "education"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-bold font-inter capitalize transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? "bg-[#00ff99]/15 text-[#00ff99] border border-[#00ff99]/20"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab === "profile" ? "📝 Profile" : tab === "experience" ? "💼 Experience" : "🎓 Education"}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="admin-field">
              <label className="admin-label">Heading</label>
              <input
                id="about-heading"
                type="text"
                value={data.heading}
                onChange={(e) => update("heading", e.target.value)}
                className="admin-input"
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Subheading <span className="text-[#00ff99]">(accent text)</span></label>
              <input
                id="about-subheading"
                type="text"
                value={data.subheading}
                onChange={(e) => update("subheading", e.target.value)}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-label">Current Focus <span className="text-gray-600">(floating badge)</span></label>
            <input
              id="about-focus"
              type="text"
              value={data.currentFocus}
              onChange={(e) => update("currentFocus", e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-field">
            <label className="admin-label">Profile Bio — Paragraph 1</label>
            <textarea
              id="about-bio-1"
              value={data.profileBio[0] ?? ""}
              onChange={(e) => updateBioLine(0, e.target.value)}
              className="admin-input min-h-[90px] resize-none"
            />
          </div>

          <div className="admin-field">
            <label className="admin-label">Profile Bio — Paragraph 2</label>
            <textarea
              id="about-bio-2"
              value={data.profileBio[1] ?? ""}
              onChange={(e) => updateBioLine(1, e.target.value)}
              className="admin-input min-h-[90px] resize-none"
            />
          </div>

          {/* Stats */}
          <div className="admin-field">
            <label className="admin-label">Stats Cards</label>
            <div className="grid grid-cols-3 gap-3">
              {data.stats.map((stat, i) => (
                <div key={i} className="bg-[#0a0a12] border border-gray-800/60 rounded-xl p-4 space-y-2">
                  <input
                    id={`about-stat-value-${i}`}
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(i, "value", e.target.value)}
                    className="admin-input text-center font-bold text-lg"
                    placeholder="Value"
                  />
                  <input
                    id={`about-stat-label-${i}`}
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(i, "label", e.target.value)}
                    className="admin-input text-center text-xs"
                    placeholder="Label"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === "experience" && (
        <div className="space-y-5">
          {data.experience.map((exp, i) => (
            <div key={i} className="bg-[#0a0a12] border border-gray-800/60 rounded-2xl p-5 space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-inter">Experience #{i + 1}</span>
                <button
                  onClick={() => removeExperience(i)}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  ✕ Remove
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="admin-field">
                  <label className="admin-label">Role / Position</label>
                  <input id={`exp-role-${i}`} type="text" value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} className="admin-input" />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Company Name</label>
                  <input id={`exp-company-${i}`} type="text" value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} className="admin-input" />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Period</label>
                  <input id={`exp-period-${i}`} type="text" value={exp.period} onChange={(e) => updateExperience(i, "period", e.target.value)} className="admin-input" placeholder="June – Nov 2025" />
                </div>
              </div>
              <div className="admin-field">
                <label className="admin-label">Description</label>
                <textarea id={`exp-desc-${i}`} value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} className="admin-input min-h-[80px] resize-none" />
              </div>
              <div className="admin-field">
                <label className="admin-label">Projects Shipped</label>
                <div className="space-y-2">
                  {exp.projects.map((proj, pi) => (
                    <div key={pi} className="flex gap-2">
                      <input type="text" value={proj} onChange={(e) => updateExpProject(i, pi, e.target.value)} className="admin-input flex-1" />
                      <button onClick={() => removeExpProject(i, pi)} className="px-2.5 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer text-sm">✕</button>
                    </div>
                  ))}
                  <button onClick={() => addExpProject(i)} className="text-xs text-[#00ff99] border border-[#00ff99]/20 bg-[#00ff99]/5 hover:bg-[#00ff99]/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer">+ Add Project</button>
                </div>
              </div>
            </div>
          ))}
          <button
            id="add-experience-btn"
            onClick={addExperience}
            className="w-full py-3 rounded-xl border border-dashed border-gray-700 text-gray-500 hover:text-[#00ff99] hover:border-[#00ff99]/40 transition-all duration-200 text-sm font-inter cursor-pointer"
          >
            + Add Experience
          </button>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === "education" && (
        <div className="space-y-5">
          {data.education.map((edu, i) => (
            <div key={i} className="bg-[#0a0a12] border border-gray-800/60 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-inter">Education #{i + 1}</span>
                <button onClick={() => removeEducation(i)} className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 rounded-lg transition-all cursor-pointer">✕ Remove</button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="admin-field">
                  <label className="admin-label">Degree</label>
                  <input id={`edu-degree-${i}`} type="text" value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} className="admin-input" />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Institution</label>
                  <input id={`edu-inst-${i}`} type="text" value={edu.institution} onChange={(e) => updateEducation(i, "institution", e.target.value)} className="admin-input" />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Period</label>
                  <input id={`edu-period-${i}`} type="text" value={edu.period} onChange={(e) => updateEducation(i, "period", e.target.value)} className="admin-input" placeholder="Class of 2025" />
                </div>
              </div>
              <div className="admin-field">
                <label className="admin-label">Description</label>
                <textarea id={`edu-desc-${i}`} value={edu.description} onChange={(e) => updateEducation(i, "description", e.target.value)} className="admin-input min-h-[80px] resize-none" />
              </div>
            </div>
          ))}
          <button
            id="add-education-btn"
            onClick={addEducation}
            className="w-full py-3 rounded-xl border border-dashed border-gray-700 text-gray-500 hover:text-[#00ff99] hover:border-[#00ff99]/40 transition-all duration-200 text-sm font-inter cursor-pointer"
          >
            + Add Education
          </button>
        </div>
      )}
    </div>
  );
}
