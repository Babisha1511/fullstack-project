import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter credentials");
      return;
    }

    let role = null;

    // ================= ROLE DETECTION =================
    if (email.endsWith("@admin.com")) {
      role = "admin";
    } else if (email.endsWith("@trainer.com")) {
      role = "trainer";
    } else if (email.endsWith("@member.com")) {
      role = "member";
    } else {
      alert("Invalid email domain");
      return;
    }

    // ================= ⭐ NEW: NAME DERIVE =================
    const nameFromEmail = email.split("@")[0];
    const formattedName =
      nameFromEmail.charAt(0).toUpperCase() +
      nameFromEmail.slice(1);

    // ================= SAVE DETAILS =================
    localStorage.setItem("role", role);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", formattedName); // ⭐ ADDED

    // ================= REDIRECT =================
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black text-white">
      {/* ================= LEFT SECTION ================= */}
      <div
        className="relative hidden md:flex flex-col justify-between p-12 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554284126-aa88f22d8b74')",
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div
              className="p-2 rounded-lg font-bold"
              style={{ backgroundColor: "#39ff14", color: "black" }}
            >
              🏋️
            </div>
            <span className="text-xl font-bold text-[#39ff14]">
              FitTrack
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight">
            Professional <br />
            <span className="text-gray-300">Gym Management</span> <br />
            <span className="text-[#39ff14]">System</span>
          </h1>

          <p className="text-gray-400 max-w-md mt-6 text-sm">
            The complete management solution for modern fitness centers.
            Schedule trainers, track memberships, and manage diet plans
            seamlessly.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-gray-400 text-sm">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#39ff14]/40"></div>
            <div className="w-8 h-8 rounded-full bg-[#39ff14]/30"></div>
            <div className="w-8 h-8 rounded-full bg-[#39ff14]/20"></div>
          </div>
          Trusted by 500+ Fitness Centers
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-black/70 backdrop-blur-lg p-10 rounded-2xl border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Log in to your{" "}
            <span className="text-[#39ff14]">FitTrack</span> dashboard.
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-gray-400">
              Username or Email
            </label>
            <input
              type="email"
              placeholder="example@member.com"
              className="w-full mt-2 bg-[#161616] border border-white/10 px-4 py-3 rounded-lg
                         focus:outline-none focus:border-[#39ff14]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 bg-[#161616] border border-white/10 px-4 py-3 rounded-lg
                         focus:outline-none focus:border-[#39ff14]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* OPTIONS */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#39ff14]" />
              Remember me
            </label>
            <span className="hover:text-[#39ff14] cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#39ff14",
              color: "black",
              boxShadow: "0 0 20px rgba(57,255,20,0.4)",
            }}
          >
            Log In →
          </button>

          {/* SIGN UP */}
          <p className="text-center text-gray-400 text-sm mt-6">
            New to FitTrack?{" "}
            <span className="text-[#39ff14] hover:underline cursor-pointer">
              Create an account
            </span>
          </p>

          {/* DIVIDER */}
          <div className="flex items-center my-6 text-gray-500 text-xs">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-3 text-[#39ff14]">System Access</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* SUPPORT */}
          <button
            type="button"
            className="w-full border border-white/10 py-3 rounded-lg
                       hover:border-[#39ff14]/40 hover:text-[#39ff14]
                       transition flex items-center justify-center gap-2"
          >
            🎧 Contact Support
          </button>

          {/* DEMO INFO */}
          <p className="text-xs text-gray-500 text-center mt-6">
            example@admin.com | example@trainer.com | example@member.com
          </p>
        </form>
      </div>
    </div>
  );
}
