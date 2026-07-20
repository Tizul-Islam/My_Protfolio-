"use client";

import { Service } from "@/data/portfolio";
import { iconGroups, getIcon } from "@/data/iconRegistry";

type Props = {
  data: Service[];
  onChange: (data: Service[]) => void;
  onSave: () => void;
  saved: boolean;
};

export default function ServicesEditor({ data, onChange, onSave, saved }: Props) {
  const update = (i: number, field: keyof Service, value: string) => {
    const services = [...data];
    services[i] = { ...services[i], [field]: value };
    onChange(services);
  };

  const addService = () => {
    const newService: Service = {
      iconKey: "BsCodeSlash",
      title: "New Service",
      description: "Service description here...",
      link: "#contact",
    };
    onChange([...data, newService]);
  };

  const removeService = (i: number) => {
    onChange(data.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-poppins">⚙️ Services Section</h2>
          <p className="text-gray-500 text-sm font-inter mt-1">Service card add, edit, delete করো</p>
        </div>
        <button
          id="services-save-btn"
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

      {/* Service Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((service, i) => {
          const ServiceIcon = getIcon(service.iconKey);
          return (
            <div key={i} className="bg-[#0a0a12] border border-gray-800/60 rounded-2xl p-5 space-y-4 relative group">
              {/* Remove button */}
              <button
                onClick={() => removeService(i)}
                className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>

              {/* Icon preview */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00ff99]/10 border border-[#00ff99]/15 flex items-center justify-center text-[#00ff99] flex-shrink-0">
                  <ServiceIcon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="admin-label mb-1">Icon</label>
                  <select
                    id={`service-icon-${i}`}
                    value={service.iconKey}
                    onChange={(e) => update(i, "iconKey", e.target.value)}
                    className="admin-input text-xs py-1.5"
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

              <div className="admin-field">
                <label className="admin-label">Service Title</label>
                <input
                  id={`service-title-${i}`}
                  type="text"
                  value={service.title}
                  onChange={(e) => update(i, "title", e.target.value)}
                  className="admin-input"
                />
              </div>

              <div className="admin-field">
                <label className="admin-label">Description</label>
                <textarea
                  id={`service-desc-${i}`}
                  value={service.description}
                  onChange={(e) => update(i, "description", e.target.value)}
                  className="admin-input min-h-[80px] resize-none"
                />
              </div>

              <div className="admin-field">
                <label className="admin-label">Link <span className="text-gray-600">(#section or URL)</span></label>
                <input
                  id={`service-link-${i}`}
                  type="text"
                  value={service.link}
                  onChange={(e) => update(i, "link", e.target.value)}
                  className="admin-input"
                  placeholder="#projects"
                />
              </div>
            </div>
          );
        })}

        {/* Add button */}
        <button
          id="add-service-btn"
          onClick={addService}
          className="min-h-[200px] rounded-2xl border border-dashed border-gray-700 text-gray-500 hover:text-[#00ff99] hover:border-[#00ff99]/40 transition-all duration-200 text-sm font-inter cursor-pointer flex items-center justify-center flex-col gap-2"
        >
          <span className="text-2xl">+</span>
          <span>Add New Service</span>
        </button>
      </div>
    </div>
  );
}
