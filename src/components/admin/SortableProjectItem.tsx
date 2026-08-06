import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DBProject } from "./SortableProjectList";
import { MdDragIndicator, MdEdit, MdDelete } from "react-icons/md"; // Using material icons from react-icons

type Props = {
  project: DBProject;
  onEdit: (project: DBProject) => void;
  onDelete: (id: string) => void;
};

export default function SortableProjectItem({ project, onEdit, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-[#0a0a12] border ${
        isDragging ? "border-[#00ff99] shadow-lg shadow-[#00ff99]/20 opacity-80" : "border-gray-800/60"
      } rounded-2xl overflow-hidden`}
    >
      <div className="flex items-center gap-3 px-5 py-4">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="text-gray-500 hover:text-white cursor-grab active:cursor-grabbing px-1 flex-shrink-0"
        >
          <MdDragIndicator size={24} />
        </div>

        {/* Auto Numbering */}
        <div className="w-8 h-8 rounded-lg bg-[#00ff99]/10 border border-[#00ff99]/15 flex items-center justify-center text-[#00ff99] text-xs font-bold flex-shrink-0">
          {project.position}
        </div>

        {/* Content */}
        <span className="font-bold text-white font-inter flex-1 text-sm truncate">
          {project.title}
        </span>
        <span className="text-xs text-gray-600 font-inter flex-shrink-0 hidden md:block">
          {project.tags.join(", ").slice(0, 35)}
          {project.tags.join(", ").length > 35 ? "..." : ""}
        </span>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(project)}
            className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Edit Project"
          >
            <MdEdit size={18} />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this project?")) {
                onDelete(project.id);
              }
            }}
            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Delete Project"
          >
            <MdDelete size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
