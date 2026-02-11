import { useState, useEffect } from "react";

export default function MemberSettings() {
  /* ===== GET MEMBER FROM LOGIN ===== */
  const emailFromLogin = localStorage.getItem("userEmail");
  const nameFromLogin = localStorage.getItem("userName");

  // ✅ UNIQUE STORAGE KEY PER MEMBER
  const STORAGE_KEY = `member_settings_${emailFromLogin}`;

  /* ===== STATES ===== */
  const [profile, setProfile] = useState({
    name: nameFromLogin || "",
    email: emailFromLogin || "",
    phone: "",
  });

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  /* ===== LOAD SAVED SETTINGS (FIXED) ===== */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      setProfile(saved.profile);
      setNotifications(saved.notifications);
      setDarkMode(saved.darkMode);
    }
  }, [STORAGE_KEY]);

  /* ===== DARK MODE ===== */
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-black", "text-white");
      document.body.classList.remove("bg-white", "text-black");
    } else {
      document.body.classList.add("bg-white", "text-black");
      document.body.classList.remove("bg-black", "text-white");
    }
  }, [darkMode]);

  /* ===== SAVE HANDLER (FIXED) ===== */
  const handleSave = () => {
    // ✅ Update dashboard name also
    localStorage.setItem("userName", profile.name);

    // ✅ Save per member
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        profile,
        notifications,
        darkMode,
      })
    );

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div
      className="min-h-screen p-8 text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://t3.ftcdn.net/jpg/02/96/19/10/360_F_296191090_PGQXIC2Y8CCsrJ7fgCsDd8OuVN8uJtNY.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">Member Settings</h1>
      <p className="text-gray-400 mb-10">
        Manage your profile and preferences
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* PROFILE */}
        <div className="bg-black/70 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Profile Information
          </h2>

          <Input
            label="Full Name"
            value={profile.name}
            onChange={(v) =>
              setProfile({ ...profile, name: v })
            }
          />

          <Input label="Email" value={profile.email} disabled />

          <Input
            label="Phone Number"
            value={profile.phone}
            onChange={(v) =>
              setProfile({ ...profile, phone: v })
            }
          />

          <button
            onClick={handleSave}
            className="mt-6 bg-[#39ff14] text-black px-6 py-2 rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </div>

        {/* PREFERENCES */}
        <div className="bg-black/70 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Preferences
          </h2>

          <Toggle
            label="Enable Notifications"
            enabled={notifications}
            setEnabled={setNotifications}
          />

          <Toggle
            label="Dark Mode"
            enabled={darkMode}
            setEnabled={setDarkMode}
          />
        </div>
      </div>

      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-[#39ff14] text-black px-5 py-3 rounded-lg font-medium">
          ✅ Settings Saved Successfully
        </div>
      )}
    </div>
  );
}

/* INPUT */
function Input({ label, value, onChange, disabled }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-400 mb-1">
        {label}
      </label>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange && onChange(e.target.value)
        }
        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2"
      />
    </div>
  );
}

/* TOGGLE */
function Toggle({ label, enabled, setEnabled }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <span>{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full transition ${
          enabled ? "bg-[#39ff14]" : "bg-gray-600"
        }`}
      >
        <span
          className={`block w-4 h-4 bg-white rounded-full transition ${
            enabled ? "ml-6" : "ml-1"
          }`}
        />
      </button>
    </div>
  );
}

