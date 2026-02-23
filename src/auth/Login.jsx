import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ADMIN_EMAIL = "jananybabisha@gmail.com";
export default function Login() {
  
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [preferences, setPreferences] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const isAdminEmail = email === ADMIN_EMAIL;
  const navigate = useNavigate();

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setIsError(true);
setMessage("Please enter credentials");
      return;
    }

    try {
      const response = await fetch("http://localhost:3456/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usernameOrEmail: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const token = await response.text();

      localStorage.setItem("token", token);

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
     const payload = JSON.parse(window.atob(base64));

const role = payload.role.toLowerCase();

localStorage.setItem("role", role);
localStorage.setItem("userEmail", email);

const extractedName = email.split("@")[0]; // ✅ FIX
localStorage.setItem("userName", extractedName);

navigate(`/${role}/dashboard`);

    } catch {
      setIsError(true);
setMessage("Invalid credentials ❌");
    }
  };

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password) {
      setIsError(true);
setMessage("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3456/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          phone,
          preferences
        })
      });

      const message = await response.text();

      if (!response.ok) {
       setIsError(true);
setMessage(message);
        return;
      }

      setIsError(false);
setMessage("Registered Successfully ✅");
setIsRegister(false);

    } catch {
      setIsError(true);
setMessage("Registration failed ❌");
    }
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
          onSubmit={isRegister ? handleRegister : handleLogin}
          className="w-full max-w-md bg-black/70 backdrop-blur-lg p-10 rounded-2xl border border-white/10"
        >

          <h2 className="text-2xl font-bold mb-2">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="text-gray-400 text-sm mb-8">
            {isRegister ? "Register to access FitTrack dashboard." :
              <>Log in to your <span className="text-[#39ff14]">FitTrack</span> dashboard.</>}
          </p>

          {/* REGISTER FIELDS */}
          {isRegister && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full mt-2 bg-[#161616] border border-white/10 px-4 py-3 rounded-lg focus:outline-none focus:border-[#39ff14]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full mt-2 bg-[#161616] border border-white/10 px-4 py-3 rounded-lg focus:outline-none focus:border-[#39ff14]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full mt-2 bg-[#161616] border border-white/10 px-4 py-3 rounded-lg focus:outline-none focus:border-[#39ff14]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Preferences"
                  className="w-full mt-2 bg-[#161616] border border-white/10 px-4 py-3 rounded-lg focus:outline-none focus:border-[#39ff14]"
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                />
              </div>
            </>
          )}

          {/* EMAIL */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter username or email"
              className="w-full mt-2 bg-[#161616] border border-white/10 px-4 py-3 rounded-lg focus:outline-none focus:border-[#39ff14]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-2 bg-[#161616] border border-white/10 px-4 py-3 rounded-lg focus:outline-none focus:border-[#39ff14]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#39ff14",
              color: "black",
              boxShadow: "0 0 20px rgba(57,255,20,0.4)",
            }}
          >
            {isRegister ? "Register →" : "Log In →"}
            
          </button>
          {message && (
  <p
    className={`mt-4 text-sm text-center ${
      isError ? "text-red-400" : "text-[#39ff14]"
    }`}
  >
    {message}
  </p>
)}

          {!isAdminEmail && (
  <p className="text-center text-gray-400 text-sm mt-6">
    {isRegister ? "Already have an account?" : "New to FitTrack?"}{" "}
    <span
      onClick={() => {
  if (!isAdminEmail) {
    setIsRegister(!isRegister);
  }
}}
      className="text-[#39ff14] hover:underline cursor-pointer"
    >
      {isRegister ? "Back to Login" : "Create an account"}
    </span>
  </p>
)}

        </form>
      </div>
    </div>
  );
}
