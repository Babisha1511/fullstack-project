import { useState } from "react";

export default function AdminSettings() {
  /* ===== GET ADMIN NAME FROM LOGIN ===== */
  const emailFromLogin = localStorage.getItem("userEmail");

  const baseName = emailFromLogin
    ? emailFromLogin.split("@")[0].split(".")[0]
    : "Admin";

  const adminName =
    baseName.charAt(0).toUpperCase() + baseName.slice(1);

  /* ===== STATES ===== */
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const saveSettings = () => {
    alert("Admin settings saved successfully ✅");
  };

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://png.pngtree.com/thumb_back/fh260/background/20230721/pngtree-contemporary-3d-render-of-a-gym-with-modern-interior-design-image_3766556.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      <section className="p-8 max-w-6xl mx-auto">

        {/* ===== PAGE HEADER ===== */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Admin Settings</h1>
          <p className="text-gray-400 mt-1">
            Manage profile, system preferences, and security controls
          </p>
        </div>

        {/* ===== GRID LAYOUT ===== */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ===== PROFILE CARD ===== */}
          <div className="bg-black/70 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Admin Name</label>
                <input
                  value={adminName}
                  disabled
                  className="w-full mt-1 px-4 py-2 rounded bg-black/80 border border-white/10 text-gray-300"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  value={emailFromLogin || ""}
                  disabled
                  className="w-full mt-1 px-4 py-2 rounded bg-black/80 border border-white/10 text-gray-300"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Role</label>
                <input
                  value="System Administrator"
                  disabled
                  className="w-full mt-1 px-4 py-2 rounded bg-black/80 border border-white/10 text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* ===== NOTIFICATIONS ===== */}
          <div className="bg-black/70 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>

            <div className="space-y-4">
              <Toggle
                label="Email Notifications"
                checked={emailNotif}
                onChange={setEmailNotif}
              />
              <Toggle
                label="SMS Alerts"
                checked={smsNotif}
                onChange={setSmsNotif}
              />
            </div>
          </div>

          {/* ===== SYSTEM SETTINGS ===== */}
          <div className="bg-black/70 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">System Settings</h2>

            <div className="space-y-4">
              <Toggle
                label="Maintenance Mode"
                checked={maintenance}
                onChange={setMaintenance}
              />
              <Toggle
                label="Dark Mode (UI)"
                checked={darkMode}
                onChange={setDarkMode}
              />
              <Toggle
                label="Automatic Daily Backup"
                checked={autoBackup}
                onChange={setAutoBackup}
              />
            </div>
          </div>

          {/* ===== SECURITY ===== */}
          <div className="bg-black/70 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Security</h2>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>✔ Two-factor authentication enabled</li>
              <li>✔ Last login: Today</li>
              <li>✔ Session timeout: 30 minutes</li>
              <li>✔ IP monitoring active</li>
            </ul>
          </div>
        </div>

        {/* ===== SAVE BUTTON ===== */}
        <div className="mt-10">
          <button
            onClick={saveSettings}
            className="px-6 py-3 rounded-lg bg-[#39ff14] text-black font-semibold shadow-lg"
          >
            Save All Settings
          </button>
        </div>
      </section>
    </main>
  );
}

/* ===== TOGGLE COMPONENT ===== */
function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex justify-between items-center">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        className="w-5 h-5"
      />
    </label>
  );
}

