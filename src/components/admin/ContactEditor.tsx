"use client";

import { ContactInfo } from "@/data/portfolio";

type Props = {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
  onSave: () => void;
  saved: boolean;
};

export default function ContactEditor({ data, onChange, onSave, saved }: Props) {
  const update = <K extends keyof ContactInfo>(key: K, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-poppins">📞 Contact Section</h2>
          <p className="text-gray-500 text-sm font-inter mt-1">Email, phone এবং location update করো</p>
        </div>
        <button
          id="contact-save-btn"
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

      <div className="bg-[#0a0a12] border border-gray-800/60 rounded-2xl p-6 space-y-6">
        {/* Email */}
        <div className="admin-field">
          <label className="admin-label">
            <span className="inline-flex items-center gap-2">
              📧 Email Address
            </span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className="admin-input"
            placeholder="your@email.com"
          />
          <p className="text-xs text-gray-600 mt-1 font-inter">
            EmailJS template-এও এই email update করতে হবে।
          </p>
        </div>

        {/* Phone */}
        <div className="admin-field">
          <label className="admin-label">
            <span className="inline-flex items-center gap-2">
              📱 Phone Number
            </span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="admin-input"
            placeholder="+880 1234-567890"
          />
        </div>

        {/* Location */}
        <div className="admin-field">
          <label className="admin-label">
            <span className="inline-flex items-center gap-2">
              📍 Location
            </span>
          </label>
          <input
            id="contact-location"
            type="text"
            value={data.location}
            onChange={(e) => update("location", e.target.value)}
            className="admin-input"
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="bg-[#0a0a12] border border-gray-800/60 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest font-inter mb-4">Preview</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-[#00ff99]/10 border border-[#00ff99]/15 rounded-lg flex items-center justify-center text-[#00ff99] flex-shrink-0">
              @
            </div>
            <div>
              <p className="text-xs text-gray-600 font-inter">Email</p>
              <p className="text-white font-inter font-medium">{data.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-[#00ff99]/10 border border-[#00ff99]/15 rounded-lg flex items-center justify-center text-[#00ff99] flex-shrink-0">
              📱
            </div>
            <div>
              <p className="text-xs text-gray-600 font-inter">Phone</p>
              <p className="text-white font-inter font-medium">{data.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-[#00ff99]/10 border border-[#00ff99]/15 rounded-lg flex items-center justify-center text-[#00ff99] flex-shrink-0">
              📍
            </div>
            <div>
              <p className="text-xs text-gray-600 font-inter">Location</p>
              <p className="text-white font-inter font-medium">{data.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
