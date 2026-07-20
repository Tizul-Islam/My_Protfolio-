"use client";

import { useState } from "react";
import { SkillCategory, SkillItem } from "@/data/portfolio";
import { iconGroups, getIcon } from "@/data/iconRegistry";

type Props = {
  data: SkillCategory[];
  onChange: (data: SkillCategory[]) => void;
  onSave: () => void;
  saved: boolean;
};

export default function SkillsEditor({ data, onChange, onSave, saved }: Props) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);
  const [newSkillName, setNewSkillName] = useState<Record<number, string>>({});
  const [newSkillIcon, setNewSkillIcon] = useState<Record<number, string>>({});

  const updateCategory = (i: number, field: keyof SkillCategory, value: SkillCategory[keyof SkillCategory]) => {
    const cats = [...data];
    cats[i] = { ...cats[i], [field]: value };
    onChange(cats);
  };

  const removeCategory = (i: number) => {
    onChange(data.filter((_, idx) => idx !== i));
  };

  const addCategory = () => {
    const newCat: SkillCategory = {
      title: "New Category",
      categoryIconKey: "BsCodeSlash",
      skills: [],
    };
    onChange([...data, newCat]);
    setExpandedCategory(data.length);
  };

  const addSkill = (catIdx: number) => {
    const name = newSkillName[catIdx]?.trim();
    const iconKey = newSkillIcon[catIdx] || "BsCodeSlash";
    if (!name) return;

    const skill: SkillItem = { name, iconKey, color: "text-gray-300" };
    const cats = [...data];
    cats[catIdx] = { ...cats[catIdx], skills: [...cats[catIdx].skills, skill] };
    onChange(cats);
    setNewSkillName((prev) => ({ ...prev, [catIdx]: "" }));
    setNewSkillIcon((prev) => ({ ...prev, [catIdx]: "" }));
  };

  const removeSkill = (catIdx: number, skillIdx: number) => {
    const cats = [...data];
    cats[catIdx] = {
      ...cats[catIdx],
      skills: cats[catIdx].skills.filter((_, i) => i !== skillIdx),
    };
    onChange(cats);
  };

  const updateSkillName = (catIdx: number, skillIdx: number, value: string) => {
    const cats = [...data];
    cats[catIdx].skills[skillIdx] = { ...cats[catIdx].skills[skillIdx], name: value };
    onChange(cats);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-poppins">🛠️ Skills Section</h2>
          <p className="text-gray-500 text-sm font-inter mt-1">Skill categories এবং প্রতিটি skill</p>
        </div>
        <button
          id="skills-save-btn"
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

      {/* Categories */}
      <div className="space-y-4">
        {data.map((cat, catIdx) => {
          const expanded = expandedCategory === catIdx;
          const CatIcon = getIcon(cat.categoryIconKey);
          return (
            <div key={catIdx} className="bg-[#0a0a12] border border-gray-800/60 rounded-2xl overflow-hidden">
              {/* Category Header Row */}
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="w-9 h-9 rounded-lg bg-[#00ff99]/10 border border-[#00ff99]/15 flex items-center justify-center text-[#00ff99] flex-shrink-0">
                  <CatIcon size={16} />
                </div>
                <span className="font-bold text-white font-inter flex-1 text-sm">{cat.title}</span>
                <span className="text-xs text-gray-600 font-inter">{cat.skills.length} skills</span>
                <button
                  onClick={() => removeCategory(catIdx)}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded-lg transition-all cursor-pointer flex-shrink-0"
                >
                  ✕
                </button>
                <button
                  onClick={() => setExpandedCategory(expanded ? null : catIdx)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0 text-sm"
                >
                  {expanded ? "▲" : "▼"}
                </button>
              </div>

              {/* Expanded Content */}
              {expanded && (
                <div className="border-t border-gray-800/60 px-5 py-4 space-y-4">
                  {/* Category title edit */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="admin-field">
                      <label className="admin-label">Category Title</label>
                      <input
                        id={`cat-title-${catIdx}`}
                        type="text"
                        value={cat.title}
                        onChange={(e) => updateCategory(catIdx, "title", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Category Icon</label>
                      <select
                        id={`cat-icon-${catIdx}`}
                        value={cat.categoryIconKey}
                        onChange={(e) => updateCategory(catIdx, "categoryIconKey", e.target.value)}
                        className="admin-input"
                      >
                        {iconGroups.map((group) => (
                          <optgroup key={group.label} label={group.label}>
                            {group.keys.map((key) => (
                              <option key={key} value={key}>{key}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div>
                    <label className="admin-label mb-2">Skills</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {cat.skills.map((skill, skillIdx) => {
                        const SkillIcon = getIcon(skill.iconKey);
                        return (
                          <div
                            key={skillIdx}
                            className="flex items-center gap-1.5 bg-[#0f0f1a] border border-gray-800 rounded-full px-3 py-1.5 group"
                          >
                            <SkillIcon size={13} className={skill.color} />
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => updateSkillName(catIdx, skillIdx, e.target.value)}
                              className="bg-transparent text-xs text-gray-200 font-inter outline-none w-[90px]"
                            />
                            <button
                              onClick={() => removeSkill(catIdx, skillIdx)}
                              className="text-gray-700 hover:text-red-400 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 ml-1 text-xs leading-none"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add new skill */}
                    <div className="flex gap-2 flex-wrap">
                      <input
                        id={`new-skill-name-${catIdx}`}
                        type="text"
                        value={newSkillName[catIdx] ?? ""}
                        onChange={(e) => setNewSkillName((prev) => ({ ...prev, [catIdx]: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && addSkill(catIdx)}
                        className="admin-input flex-1 min-w-[140px]"
                        placeholder="Skill name"
                      />
                      <select
                        id={`new-skill-icon-${catIdx}`}
                        value={newSkillIcon[catIdx] ?? "BsCodeSlash"}
                        onChange={(e) => setNewSkillIcon((prev) => ({ ...prev, [catIdx]: e.target.value }))}
                        className="admin-input w-auto min-w-[130px]"
                      >
                        {iconGroups.map((group) => (
                          <optgroup key={group.label} label={group.label}>
                            {group.keys.map((key) => (
                              <option key={key} value={key}>{key}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <button
                        onClick={() => addSkill(catIdx)}
                        disabled={!newSkillName[catIdx]?.trim()}
                        className="px-4 py-2 rounded-lg bg-[#00ff99]/10 text-[#00ff99] border border-[#00ff99]/20 hover:bg-[#00ff99]/20 transition-all disabled:opacity-30 cursor-pointer text-sm font-bold"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add Category */}
        <button
          id="add-skill-category-btn"
          onClick={addCategory}
          className="w-full py-3 rounded-xl border border-dashed border-gray-700 text-gray-500 hover:text-[#00ff99] hover:border-[#00ff99]/40 transition-all duration-200 text-sm font-inter cursor-pointer"
        >
          + Add New Category
        </button>
      </div>
    </div>
  );
}
