"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableProjectItem from "./SortableProjectItem";
import ProjectForm from "./ProjectForm";
import { MdAdd } from "react-icons/md";
import { Project } from "@/data/portfolio"; // keep type compatibility if needed, or Prisma type
// Alternatively, since we use Prisma now, we might expect `id` and `position` on the Project.

// We extend the original Project type to include DB fields
export type DBProject = Project & {
  id: string;
  position: number;
};

export default function SortableProjectList() {
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState<DBProject | null>(null);

  // Fetch initial data
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Failed to load projects, invalid data format:", data);
          setError("Failed to load projects (database unavailable)");
          setProjects([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects", err);
        setError("Failed to load projects");
        setIsLoading(false);
      });
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newArray = arrayMove(items, oldIndex, newIndex);
        
        // Recalculate positions based on new index
        const updatedArray = newArray.map((item, index) => ({
          ...item,
          position: index + 1,
        }));

        setIsDirty(true);
        return updatedArray;
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const payload = projects.map((p) => ({
        id: p.id,
        position: p.position,
      }));

      const res = await fetch("/api/projects/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save new order");

      setIsDirty(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSubmit = async (data: Partial<DBProject>) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add project");
    const newProject = await res.json();
    setProjects([...projects, newProject]);
    setIsAdding(false);
  };

  const handleEditSubmit = async (data: Partial<DBProject>) => {
    if (!editingProject) return;
    const res = await fetch(`/api/projects/${editingProject.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update project");
    const updatedProject = await res.json();
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    setEditingProject(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete project");
    }
  };

  if (isLoading) {
    return <div className="text-gray-400">Loading projects...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-poppins">📁 Projects Section (DB)</h2>
          <p className="text-gray-500 text-sm font-inter mt-1">
            Drag and drop to reorder your projects.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-400 text-sm">{error}</span>}
          
          {!isAdding && !editingProject && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <MdAdd size={20} /> Add Project
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={!isDirty || isSaving || isAdding || !!editingProject}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm font-inter transition-all duration-300 ${
              (!isDirty || isAdding || !!editingProject) && !isSaving
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : isSaving
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 cursor-wait"
                : "bg-[#00ff99] text-black hover:bg-[#00e688] shadow-[0_0_20px_rgba(0,255,153,0.2)] cursor-pointer"
            }`}
          >
            {isSaving ? "Saving..." : !isDirty ? "✓ Saved" : "💾 Save Changes"}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isAdding ? (
        <ProjectForm
          onSubmit={handleAddSubmit}
          onCancel={() => setIsAdding(false)}
        />
      ) : editingProject ? (
        <ProjectForm
          initialData={editingProject}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingProject(null)}
        />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {projects.map((proj) => (
                <SortableProjectItem 
                  key={proj.id} 
                  project={proj} 
                  onEdit={setEditingProject}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
