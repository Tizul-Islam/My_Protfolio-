"use client";

import { useState } from "react";
import { DBProject } from "./SortableProjectList";

type ProjectFormProps = {
  initialData?: DBProject | null;
  onSubmit: (data: Partial<DBProject>) => Promise<void>;
  onCancel: () => void;
};

export default function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [imageMode, setImageMode] = useState<"upload" | "url" | "path">("url");

  const handleImageUpload = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const [features, setFeatures] = useState<string[]>(
    initialData?.features || [],
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const [newFeature, setNewFeature] = useState("");
  const [newTag, setNewTag] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFeature = () => {
    const feat = newFeature.trim();
    if (!feat) return;
    setFeatures([...features, feat]);
    setNewFeature("");
  };

  const removeFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const updateFeature = (idx: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[idx] = value;
    setFeatures(newFeatures);
  };

  const addTag = () => {
    const tag = newTag.trim();
    if (!tag) return;
    setTags([...tags, tag]);
    setNewTag("");
  };

  const removeTag = (idx: number) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!title || !description || !liveUrl) {
      setError("Title, description, and live URL are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit({
        title,
        description,
        liveUrl,
        githubUrl: githubUrl || undefined,
        image: image || undefined,
        features,
        tags,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0a0a12] border border-gray-800/60 rounded-2xl overflow-hidden mt-4">
      <div className="flex items-center justify-between border-b border-gray-800/60 px-5 py-4">
        <h3 className="text-sm font-bold text-[#00ff99] font-inter">
          {initialData ? `Editing: ${title}` : "Create New Project"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
        >
          ✕
        </button>
      </div>

      <div className="px-5 py-5 space-y-5">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="admin-field">
            <label className="admin-label">Project Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Live URL *</label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="admin-input"
              placeholder="https://..."
              required
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">
              GitHub URL <span className="text-gray-600">(optional)</span>
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="admin-input"
              placeholder="https://github.com/..."
            />
          </div>
          <div className="admin-field md:col-span-2">
            <label className="admin-label">Image Source</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {(["upload", "url", "path"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setImageMode(mode)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                    imageMode === mode
                      ? "bg-[#00ff99] text-black shadow-[0_0_10px_rgba(0,255,153,0.3)]"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  {mode === "upload" && "📤 Upload from PC"}
                  {mode === "url" && "☁️ Cloud URL"}
                  {mode === "path" && "📁 Local Path"}
                </button>
              ))}
            </div>

            {imageMode === "upload" && (
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={(e) => handleImageUpload(e.target.files?.[0])}
                className="admin-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#00ff99]/10 file:text-[#00ff99] hover:file:bg-[#00ff99]/20 file:cursor-pointer cursor-pointer"
              />
            )}
            {imageMode === "url" && (
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="admin-input"
                placeholder="https://cloudinary.com/... or supabase..."
              />
            )}
            {imageMode === "path" && (
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="admin-input"
                placeholder="/projects/myproject.png"
              />
            )}
            {image && imageMode === "upload" && image.startsWith("data:image") && (
              <div className="mt-2 text-xs text-[#00ff99]">
                ✓ Image loaded and ready to save
              </div>
            )}
          </div>
        </div>

        <div className="admin-field">
          <label className="admin-label">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="admin-input min-h-[90px] resize-none"
            required
          />
        </div>

        {/* Features */}
        <div className="admin-field">
          <label className="admin-label">Key Features</label>
          <div className="space-y-2">
            {features.map((feat, fi) => (
              <div key={fi} className="flex gap-2">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => updateFeature(fi, e.target.value)}
                  className="admin-input flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(fi)}
                  className="px-2.5 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addFeature())
                }
                className="admin-input flex-1 border-dashed"
                placeholder="Add feature"
              />
              <button
                type="button"
                onClick={addFeature}
                disabled={!newFeature.trim()}
                className="px-4 py-2 rounded-lg bg-[#00ff99]/10 text-[#00ff99] border border-[#00ff99]/20 hover:bg-[#00ff99]/20 transition-all disabled:opacity-30 cursor-pointer text-sm font-bold"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="admin-field">
          <label className="admin-label">Tech Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, ti) => (
              <span
                key={ti}
                className="flex items-center gap-1.5 bg-[#0f0f1a] border border-gray-800 rounded-full px-3 py-1 text-xs text-gray-300 font-inter"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(ti)}
                  className="text-gray-600 hover:text-red-400 transition-colors cursor-pointer text-xs"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
              className="admin-input flex-1 border-dashed"
              placeholder="Add tag (e.g. React)"
            />
            <button
              type="button"
              onClick={addTag}
              disabled={!newTag.trim()}
              className="px-4 py-2 rounded-lg bg-[#00ff99]/10 text-[#00ff99] border border-[#00ff99]/20 hover:bg-[#00ff99]/20 transition-all disabled:opacity-30 cursor-pointer text-sm font-bold"
            >
              + Add
            </button>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-gray-800/60 mt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-[#00ff99] text-black hover:bg-[#00e688] shadow-[0_0_20px_rgba(0,255,153,0.2)] transition-all"
          >
            {isSubmitting ? "Saving..." : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
