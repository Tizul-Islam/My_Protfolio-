"use client";

import { useState } from "react";
import { Project } from "@/data/portfolio";

type Props = {
  data: Project[];
  onChange: (data: Project[]) => void;
  onSave: () => void;
  saved: boolean;
};

export default function ProjectsEditor({ data, onChange, onSave, saved }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [newTag, setNewTag] = useState<Record<number, string>>({});
  const [newFeature, setNewFeature] = useState<Record<number, string>>({});

  const update = (i: number, field: keyof Project, value: Project[keyof Project]) => {
    const projects = [...data];
    projects[i] = { ...projects[i], [field]: value };
    onChange(projects);
  };

  const addProject = () => {
    const empty: Project = {
      title: "New Project",
      description: "Project description...",
      features: ["Feature 1"],
      tags: ["React"],
      liveUrl: "https://",
      githubUrl: "",
      image: "",
    };
    onChange([...data, empty]);
    setExpanded(data.length);
  };

  const removeProject = (i: number) => {
    onChange(data.filter((_, idx) => idx !== i));
    if (expanded === i) setExpanded(null);
  };

  const addTag = (i: number) => {
    const tag = newTag[i]?.trim();
    if (!tag) return;
    update(i, "tags", [...data[i].tags, tag]);
    setNewTag((prev) => ({ ...prev, [i]: "" }));
  };

  const removeTag = (projIdx: number, tagIdx: number) => {
    update(projIdx, "tags", data[projIdx].tags.filter((_, i) => i !== tagIdx));
  };

  const addFeature = (i: number) => {
    const feat = newFeature[i]?.trim();
    if (!feat) return;
    update(i, "features", [...data[i].features, feat]);
    setNewFeature((prev) => ({ ...prev, [i]: "" }));
  };

  const removeFeature = (projIdx: number, featIdx: number) => {
    update(projIdx, "features", data[projIdx].features.filter((_, i) => i !== featIdx));
  };

  const updateFeature = (projIdx: number, featIdx: number, value: string) => {
    const features = [...data[projIdx].features];
    features[featIdx] = value;
    update(projIdx, "features", features);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-poppins">📁 Projects Section</h2>
          <p className="text-gray-500 text-sm font-inter mt-1">Portfolio projects add, edit, delete করো</p>
        </div>
        <button
          id="projects-save-btn"
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

      {/* Projects list */}
      <div className="space-y-4">
        {data.map((proj, i) => {
          const isExpanded = expanded === i;
          return (
            <div key={i} className="bg-[#0a0a12] border border-gray-800/60 rounded-2xl overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="w-8 h-8 rounded-lg bg-[#00ff99]/10 border border-[#00ff99]/15 flex items-center justify-center text-[#00ff99] text-xs font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <span className="font-bold text-white font-inter flex-1 text-sm truncate">{proj.title}</span>
                <span className="text-xs text-gray-600 font-inter flex-shrink-0">{proj.tags.join(", ").slice(0, 25)}{proj.tags.join(", ").length > 25 ? "..." : ""}</span>
                <button
                  onClick={() => removeProject(i)}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded-lg transition-all cursor-pointer flex-shrink-0"
                >
                  ✕
                </button>
                <button
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0 text-sm"
                >
                  {isExpanded ? "▲" : "▼"}
                </button>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div className="border-t border-gray-800/60 px-5 py-4 space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="admin-field">
                      <label className="admin-label">Project Title</label>
                      <input id={`proj-title-${i}`} type="text" value={proj.title} onChange={(e) => update(i, "title", e.target.value)} className="admin-input" />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Live URL</label>
                      <input id={`proj-live-${i}`} type="url" value={proj.liveUrl} onChange={(e) => update(i, "liveUrl", e.target.value)} className="admin-input" placeholder="https://..." />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">GitHub URL <span className="text-gray-600">(optional)</span></label>
                      <input id={`proj-github-${i}`} type="url" value={proj.githubUrl ?? ""} onChange={(e) => update(i, "githubUrl", e.target.value)} className="admin-input" placeholder="https://github.com/..." />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Image Path <span className="text-gray-600">(/public/projects/...)</span></label>
                      <input id={`proj-image-${i}`} type="text" value={proj.image ?? ""} onChange={(e) => update(i, "image", e.target.value)} className="admin-input" placeholder="/projects/myproject.png" />
                    </div>
                  </div>

                  <div className="admin-field">
                    <label className="admin-label">Description</label>
                    <textarea id={`proj-desc-${i}`} value={proj.description} onChange={(e) => update(i, "description", e.target.value)} className="admin-input min-h-[90px] resize-none" />
                  </div>

                  {/* Features */}
                  <div className="admin-field">
                    <label className="admin-label">Key Features <span className="text-gray-600">(max 3 shown)</span></label>
                    <div className="space-y-2">
                      {proj.features.map((feat, fi) => (
                        <div key={fi} className="flex gap-2">
                          <input type="text" value={feat} onChange={(e) => updateFeature(i, fi, e.target.value)} className="admin-input flex-1" />
                          <button onClick={() => removeFeature(i, fi)} className="px-2.5 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer text-sm">✕</button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input
                          id={`proj-new-feat-${i}`}
                          type="text"
                          value={newFeature[i] ?? ""}
                          onChange={(e) => setNewFeature((prev) => ({ ...prev, [i]: e.target.value }))}
                          onKeyDown={(e) => e.key === "Enter" && addFeature(i)}
                          className="admin-input flex-1 border-dashed"
                          placeholder="Add feature"
                        />
                        <button onClick={() => addFeature(i)} disabled={!newFeature[i]?.trim()} className="px-4 py-2 rounded-lg bg-[#00ff99]/10 text-[#00ff99] border border-[#00ff99]/20 hover:bg-[#00ff99]/20 transition-all disabled:opacity-30 cursor-pointer text-sm font-bold">+ Add</button>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="admin-field">
                    <label className="admin-label">Tech Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {proj.tags.map((tag, ti) => (
                        <span key={ti} className="flex items-center gap-1.5 bg-[#0f0f1a] border border-gray-800 rounded-full px-3 py-1 text-xs text-gray-300 font-inter">
                          {tag}
                          <button onClick={() => removeTag(i, ti)} className="text-gray-600 hover:text-red-400 transition-colors cursor-pointer text-xs">✕</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        id={`proj-new-tag-${i}`}
                        type="text"
                        value={newTag[i] ?? ""}
                        onChange={(e) => setNewTag((prev) => ({ ...prev, [i]: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && addTag(i)}
                        className="admin-input flex-1 border-dashed"
                        placeholder="Add tag (e.g. React)"
                      />
                      <button onClick={() => addTag(i)} disabled={!newTag[i]?.trim()} className="px-4 py-2 rounded-lg bg-[#00ff99]/10 text-[#00ff99] border border-[#00ff99]/20 hover:bg-[#00ff99]/20 transition-all disabled:opacity-30 cursor-pointer text-sm font-bold">+ Add</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button
          id="add-project-btn"
          onClick={addProject}
          className="w-full py-3 rounded-xl border border-dashed border-gray-700 text-gray-500 hover:text-[#00ff99] hover:border-[#00ff99]/40 transition-all duration-200 text-sm font-inter cursor-pointer"
        >
          + Add New Project
        </button>
      </div>
    </div>
  );
}
