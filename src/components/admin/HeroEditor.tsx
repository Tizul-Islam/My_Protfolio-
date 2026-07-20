"use client";

import { useState } from "react";
import { HeroData } from "@/data/portfolio";

type Props = {
  data: HeroData;
  onChange: (data: HeroData) => void;
  onSave: () => void;
  saved: boolean;
};

export default function HeroEditor({ data, onChange, onSave, saved }: Props) {
  const [newRole, setNewRole] = useState("");

  const updateField = <K extends keyof HeroData>(key: K, value: HeroData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const addRole = () => {
    const trimmed = newRole.trim();
    if (!trimmed) return;
    updateField("roles", [...data.roles, trimmed]);
    setNewRole("");
  };

  const removeRole = (index: number) => {
    updateField("roles", data.roles.filter((_, i) => i !== index));
  };

  const updateRole = (index: number, value: string) => {
    const roles = [...data.roles];
    roles[index] = value;
    updateField("roles", roles);
  };

  const updateSocialLink = (platform: string, href: string) => {
    const links = data.socialLinks.map((l) =>
      l.platform === platform ? { ...l, href } : l
    );
    updateField("socialLinks", links);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-poppins">🏠 Hero Section</h2>
          <p className="text-gray-500 text-sm font-inter mt-1">Portfolio-র প্রথম section যা visitors দেখে</p>
        </div>
        <button
          id="hero-save-btn"
          onClick={onSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm font-inter transition-all duration-300 cursor-pointer ${
            saved
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-[#00ff99] text-black hover:bg-[#00e688] shadow-[0_0_20px_rgba(0,255,153,0.2)]"
          }`}
        >
          {saved ? (
            <>✓ Saved!</>
          ) : (
            <>💾 Save Changes</>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="admin-field">
          <label className="admin-label">Full Name <span className="text-gray-600">(shown in About)</span></label>
          <input
            id="hero-full-name"
            type="text"
            value={data.shortName}
            onChange={(e) => updateField("shortName", e.target.value)}
            className="admin-input"
            placeholder="K.M Tizul Islam"
          />
        </div>

        {/* Display Name */}
        <div className="admin-field">
          <label className="admin-label">Display Name <span className="text-gray-600">(shown in Hero heading)</span></label>
          <input
            id="hero-display-name"
            type="text"
            value={data.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="admin-input"
            placeholder="Tizul Islam"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="admin-field">
        <label className="admin-label">Hero Bio / Description</label>
        <textarea
          id="hero-bio"
          value={data.bio}
          onChange={(e) => updateField("bio", e.target.value)}
          className="admin-input min-h-[100px] resize-none"
          placeholder="Computer Science graduate building..."
        />
      </div>

      {/* Roles */}
      <div className="admin-field">
        <label className="admin-label">Typing Roles <span className="text-gray-600">(typing animation)</span></label>
        <div className="space-y-2.5">
          {data.roles.map((role, i) => (
            <div key={i} className="flex gap-2">
              <input
                id={`hero-role-${i}`}
                type="text"
                value={role}
                onChange={(e) => updateRole(i, e.target.value)}
                className="admin-input flex-1"
              />
              <button
                onClick={() => removeRole(i)}
                disabled={data.roles.length <= 1}
                className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-sm flex-shrink-0"
                title="Remove role"
              >
                ✕
              </button>
            </div>
          ))}
          {/* Add new role */}
          <div className="flex gap-2">
            <input
              id="hero-new-role"
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addRole()}
              className="admin-input flex-1 border-dashed"
              placeholder="Add new role (press Enter)"
            />
            <button
              onClick={addRole}
              disabled={!newRole.trim()}
              className="px-4 py-2 rounded-lg bg-[#00ff99]/10 text-[#00ff99] border border-[#00ff99]/20 hover:bg-[#00ff99]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-sm flex-shrink-0 font-bold"
            >
              + Add
            </button>
          </div>
        </div>
      </div>

      {/* Resume */}
      <div className="admin-field">
        <label className="admin-label">Resume File Name <span className="text-gray-600">(in /public folder)</span></label>
        <input
          id="hero-resume"
          type="text"
          value={data.resumeFileName}
          onChange={(e) => updateField("resumeFileName", e.target.value)}
          className="admin-input"
          placeholder="Tizul_Islam_Resume.pdf"
        />
      </div>

      {/* Available badge */}
      <div className="admin-field">
        <label className="admin-label">Availability Status</label>
        <div className="flex items-center gap-3 mt-1">
          <button
            id="hero-available-toggle"
            onClick={() => updateField("availableForOpportunities", !data.availableForOpportunities)}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer ${
              data.availableForOpportunities ? "bg-[#00ff99]" : "bg-gray-700"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                data.availableForOpportunities ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm font-inter ${data.availableForOpportunities ? "text-[#00ff99]" : "text-gray-500"}`}>
            {data.availableForOpportunities ? "✅ Available for Opportunities" : "❌ Not Available"}
          </span>
        </div>
      </div>

      {/* Social Links */}
      <div className="admin-field">
        <label className="admin-label">Social Links</label>
        <div className="space-y-3">
          {data.socialLinks.map((link) => (
            <div key={link.platform} className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-400 w-20 font-inter flex-shrink-0">
                {link.platform === "GitHub" ? "🐙" : link.platform === "LinkedIn" ? "💼" : "📘"} {link.platform}
              </span>
              <input
                id={`hero-social-${link.platform.toLowerCase()}`}
                type="url"
                value={link.href}
                onChange={(e) => updateSocialLink(link.platform, e.target.value)}
                className="admin-input flex-1"
                placeholder={`https://${link.platform.toLowerCase()}.com/...`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
