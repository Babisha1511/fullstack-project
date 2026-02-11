import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function TrainerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-black">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-[#39ff14]/40">
          🏋️ Trainer Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="dashboard" className={linkStyle}>Dashboard</NavLink>
          <NavLink to="schedule" className={linkStyle}>Class Schedule</NavLink>
          <NavLink to="nutrition" className={linkStyle}>Nutrition</NavLink>
          <NavLink to="clients" className={linkStyle}>Clients</NavLink>
          <NavLink to="workout" className={linkStyle}>Workout</NavLink>
          <NavLink to="settings" className={linkStyle}>Settings</NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 bg-red-600 hover:bg-red-700 py-2 rounded text-white"
        >
          Logout
        </button>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

const linkStyle = ({ isActive }) =>
  `block px-4 py-2 rounded transition ${
    isActive
      ? "bg-[#39ff14] text-black font-semibold"
      : "hover:bg-[#39ff14]/20 text-gray-300"
  }`;