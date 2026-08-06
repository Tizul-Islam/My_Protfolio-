"use client";

import { useState } from "react";
import { DBProject } from "./SortableProjectList";

type ProjectFormProps = {
  initialData?: DBProject | null;
  onSubmit: (data: Partial<DBProject>) => Promise<void>;
  onCancel: () => void;
};

export default function ProjectForm({ initialData, onSubmit, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || "");
  const [image, setImage] = useState(initialData?.image || "");
  
  // Store features and tags as comma-separated strings for easy editing
  const [features, setFeatures] = useState(initialData?.features?.join(", ") || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const formattedFeatures = features.split(",").map((s) => s.trim()).filter((s) => s);
      const formattedTags = tags.split(",").map((s) => s.trim()).filter((s) => s);

      await onSubmit({
        title,
        description,
        liveUrl,
        githubUrl: githubUrl || undefined,
        image: image || undefined,
        features: formattedFeatures,
        tags: formattedTags,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-white mb-6 font-poppins">
        {initialData ? "Edit Project" : "Add New Project"}
      </h3>
      
      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 font-inter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ff99]"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Live URL *</label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ff99]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ff99] h-24"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">GitHub URL</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ff99]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ff99]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Features (comma separated)</label>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ff99] h-20"
              placeholder="e.g. User Auth, Stripe Integration, Real-time Chat"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
            <textarea
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ff99] h-20"
              placeholder="e.g. Next.js, Tailwind, Prisma"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-[#00ff99] text-black hover:bg-[#00e688] shadow-[0_0_20px_rgba(0,255,153,0.2)] transition-all flex items-center gap-2"
          >
            {isSubmitting ? "Saving..." : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
