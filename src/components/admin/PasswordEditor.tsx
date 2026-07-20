"use client";

import { useState } from "react";

const ADMIN_PASSWORD_KEY = "portfolio_admin_pw";
const DEFAULT_PASSWORD = "tizul@admin2025";

export default function PasswordEditor() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;

    if (currentPw !== stored) {
      setError("Current password is incorrect.");
      return;
    }
    if (newPw.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPw !== confirmPw) {
      setError("New passwords do not match.");
      return;
    }

    localStorage.setItem(ADMIN_PASSWORD_KEY, newPw);
    setSuccess("Password changed successfully! ✓");
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
  };

  const handleReset = () => {
    localStorage.removeItem(ADMIN_PASSWORD_KEY);
    setSuccess("Password reset to default: tizul@admin2025 ✓");
    setError("");
  };

  const inputClass = "w-full bg-[#0f0f18] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm font-inter placeholder-gray-600 focus:outline-none focus:border-[#00ff99]/50 focus:ring-1 focus:ring-[#00ff99]/20 transition-all duration-200";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-white font-poppins">🔑 Change Password</h2>
        <p className="text-gray-500 text-sm font-inter mt-1">Admin dashboard-এর password change করো</p>
      </div>

      <div className="max-w-md">
        <div className="bg-[#0a0a12] border border-gray-800/60 rounded-2xl p-6 space-y-5">
          <form onSubmit={handleChange} className="space-y-4">
            <div>
              <label className="admin-label">Current Password</label>
              <div className="relative">
                <input
                  id="pw-current"
                  type={showPw ? "text" : "password"}
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  className={inputClass + " pr-11"}
                  placeholder="Current password"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div>
              <label className="admin-label">New Password <span className="text-gray-600">(min 8 chars)</span></label>
              <input
                id="pw-new"
                type={showPw ? "text" : "password"}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className={inputClass}
                placeholder="New password"
                required
              />
            </div>

            <div>
              <label className="admin-label">Confirm New Password</label>
              <input
                id="pw-confirm"
                type={showPw ? "text" : "password"}
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                className={inputClass}
                placeholder="Repeat new password"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm font-inter">
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-sm font-inter">
                {success}
              </div>
            )}

            <button
              id="pw-change-btn"
              type="submit"
              disabled={!currentPw || !newPw || !confirmPw}
              className="w-full bg-[#00ff99] text-black font-bold py-3 rounded-xl hover:bg-[#00e688] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-inter text-sm"
            >
              Change Password
            </button>
          </form>

          <div className="border-t border-gray-800/60 pt-4">
            <button
              id="pw-reset-btn"
              onClick={handleReset}
              className="w-full py-2.5 rounded-xl border border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-600 transition-all duration-200 text-sm font-inter cursor-pointer"
            >
              Reset to Default Password
            </button>
            <p className="text-xs text-gray-700 text-center mt-2 font-inter">
              Default: <span className="font-mono">tizul@admin2025</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
