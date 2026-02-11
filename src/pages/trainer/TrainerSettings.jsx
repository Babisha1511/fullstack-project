import { useState, useEffect } from "react";

export default function TrainerSettings() {
  /* ===== GET TRAINER FROM LOGIN ===== */
  const emailFromLogin = localStorage.getItem("userEmail");

  const baseName = emailFromLogin
    ? emailFromLogin.split("@")[0]
    : "trainer";

  const formattedName =
    baseName.charAt(0).toUpperCase() + baseName.slice(1);

  /* ===== STATES ===== */
  const [firstName, setFirstName] = useState(formattedName);
  const [lastName, setLastName] = useState("");
  const [email] = useState(emailFromLogin || "");
  const [bio, setBio] = useState("");

  const [emailNotif, setEmailNotif] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [metricUnits, setMetricUnits] = useState(false);

  /* ===== VALIDATION ERRORS ===== */
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  /* ===== LOAD SAVED SETTINGS ===== */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("trainer_settings"));
    if (saved) {
      setFirstName(saved.firstName);
      setLastName(saved.lastName);
      setBio(saved.bio);
      setEmailNotif(saved.emailNotif);
      setPublicProfile(saved.publicProfile);
      setMetricUnits(saved.metricUnits);
    }
  }, []);

  /* ===== SAVE HANDLER ===== */
  const handleSave = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!bio.trim()) newErrors.bio = "Bio is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const data = {
      firstName,
      lastName,
      bio,
      emailNotif,
      publicProfile,
      metricUnits,
    };

    localStorage.setItem("trainer_settings", JSON.stringify(data));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <main
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/a7/55/0e/a7550e08439c5a9443ab3f7db6c6fab7.jpg')",
      }}
    >
      {/* ===== SUCCESS TOAST ===== */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#39ff14] text-black px-5 py-3 rounded-lg shadow-xl text-sm font-medium">
          ✅ Changes saved successfully
        </div>
      )}

      {/* ===== PAGE OVERLAY ===== */}
      <section className="min-h-screen w-full bg-black/75 p-8">

        {/* ===== HEADER ===== */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-wide">Settings</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your account preferences and personal information.
          </p>
        </div>

        {/* ===== PROFILE CARD ===== */}
        <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-center justify-between mb-12">
          <div className="flex items-center gap-5">
            <img
              src={`https://i.pravatar.cc/100?u=${email}`}
              alt="Trainer"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-400 text-sm">{email}</p>
              <span className="inline-block mt-1 text-xs bg-[#39ff14]/20 text-[#39ff14] px-2 py-1 rounded">
                Trainer Account
              </span>
            </div>
          </div>
        </div>

        {/* ===== PERSONAL INFORMATION ===== */}
        <Section title="Personal Information">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="First Name *"
              value={firstName}
              onChange={setFirstName}
              error={errors.firstName}
            />
            <Input
              label="Last Name *"
              value={lastName}
              onChange={setLastName}
              error={errors.lastName}
            />
          </div>

          <Input
            label="Email Address"
            value={email}
            disabled
            icon="✉️"
          />

          <div>
            <label className="text-sm text-gray-400">
              Bio *
            </label>
            <textarea
              rows={4}
              className={`w-full mt-2 bg-black/70 border rounded-lg px-4 py-3 outline-none resize-none ${
                errors.bio
                  ? "border-red-500"
                  : "border-white/10"
              }`}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            {errors.bio && (
              <p className="text-xs text-red-400 mt-1">
                {errors.bio}
              </p>
            )}
          </div>
        </Section>

        {/* ===== TRAINER PREFERENCES ===== */}
        <Section title="Trainer Preferences">
          <Toggle
            title="Email Notifications"
            desc="Receive daily summaries of client activities."
            enabled={emailNotif}
            setEnabled={setEmailNotif}
          />

          <Toggle
            title="Public Profile Visibility"
            desc="Allow new clients to discover you in search."
            enabled={publicProfile}
            setEnabled={setPublicProfile}
          />

          <Toggle
            title="Metric Units"
            desc="Use kg/cm instead of lbs/in."
            enabled={metricUnits}
            setEnabled={setMetricUnits}
          />
        </Section>

        {/* ===== ACTION BUTTONS ===== */}
        <div className="flex justify-end gap-4 mt-12">
          <button
            className="border border-white/20 px-6 py-2 rounded-lg hover:bg-white/10"
            onClick={() => window.location.reload()}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg font-medium bg-[#39ff14] text-black shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </section>
    </main>
  );
}

/* ===== REUSABLE COMPONENTS ===== */

function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h3 className="text-lg font-semibold mb-4 tracking-wide">
        {title}
      </h3>
      <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, icon, disabled, error }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <div className="relative mt-2">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {icon}
          </span>
        )}
        <input
          value={value}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`w-full bg-black/70 border rounded-lg px-4 py-2 outline-none ${
            icon ? "pl-10" : ""
          } ${
            error
              ? "border-red-500"
              : "border-white/10"
          } ${disabled ? "opacity-60" : ""}`}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

function Toggle({ title, desc, enabled, setEnabled }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
          enabled ? "bg-[#39ff14]" : "bg-white/20"
        }`}
      >
        <span
          className={`w-4 h-4 rounded-full transition ${
            enabled ? "bg-black ml-6" : "bg-white ml-0"
          }`}
        />
      </button>
    </div>
  );
}
