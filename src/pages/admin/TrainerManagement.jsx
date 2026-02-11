import { useState, useEffect } from "react";

const STORAGE_KEY = "gym_trainers";

export default function TrainerManagement() {
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔍 FILTER STATES
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [specializationFilter, setSpecializationFilter] = useState("All");

  /* ================= LOAD FROM LOCAL STORAGE ================= */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setTrainers(JSON.parse(stored));
    } else {
      const initialTrainers = [
        {
          name: "Alex Fit",
          email: "alex.fit@gym.com",
          specialization: "Strength",
          clients: 18,
          status: "Active",
        },
        {
          name: "Neha Sharma",
          email: "neha.sharma@gym.com",
          specialization: "Yoga",
          clients: 12,
          status: "Active",
        },
        {
          name: "Rohit Verma",
          email: "rohit.verma@gym.com",
          specialization: "Cardio",
          clients: 6,
          status: "On Leave",
        },
        {
          name: "Vikram Rao",
          email: "vikram.rao@gym.com",
          specialization: "Strength",
          clients: 0,
          status: "Inactive",
        },
      ];

      setTrainers(initialTrainers);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialTrainers)
      );
    }
  }, []);

  /* ================= ADD TRAINER ================= */
  const addTrainer = (trainer) => {
    const updated = [...trainers, trainer];
    setTrainers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setShowModal(false);
  };

  /* ================= FILTER LOGIC ================= */
  const filteredTrainers = trainers.filter((t) => {
    const searchMatch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.specialization.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" || t.status === statusFilter;

    const specializationMatch =
      specializationFilter === "All" ||
      t.specialization === specializationFilter;

    return searchMatch && statusMatch && specializationMatch;
  });

  /* ================= STATS ================= */
  const total = trainers.length;
  const active = trainers.filter(t => t.status === "Active").length;
  const onLeave = trainers.filter(t => t.status === "On Leave").length;
  const inactive = trainers.filter(t => t.status === "Inactive").length;

  return (
    <div
      className="p-8 min-h-screen text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://png.pngtree.com/thumb_back/fh260/background/20230721/pngtree-contemporary-3d-render-of-a-gym-with-modern-interior-design-image_3766556.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Trainer Management</h1>
          <p className="text-gray-400 mt-1">
            Manage trainers, their status, and assigned clients.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 rounded-lg font-semibold"
          style={{
            backgroundColor: "#39ff14",
            color: "black",
            boxShadow: "0 0 20px rgba(57,255,20,0.4)",
          }}
        >
          ➕ Add Trainer
        </button>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <Stat title="Total Trainers" value={total} />
        <Stat title="Active Trainers" value={active} />
        <Stat title="On Leave" value={onLeave} />
        <Stat title="Inactive" value={inactive} />
      </div>

      {/* ===== SEARCH & FILTER ===== */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Search by name, email, specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-black/70 border border-white/10 rounded-lg px-4 py-2 outline-none"
        />

        <div className="flex gap-3 text-sm">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/70 border border-white/10 rounded-lg px-3 py-2"
          >
            <option value="All">Status: All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>On Leave</option>
          </select>

          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className="bg-black/70 border border-white/10 rounded-lg px-3 py-2"
          >
            <option value="All">Specialization</option>
            <option>Strength</option>
            <option>Yoga</option>
            <option>Cardio</option>
          </select>
        </div>
      </div>

      {/* ===== TRAINER TABLE ===== */}
      <div className="bg-black/70 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="text-left px-6 py-3">Trainer</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Clients</th>
              <th>Status</th>
              <th className="text-right px-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTrainers.map((t, i) => (
              <TrainerRow key={i} {...t} />
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 text-xs text-gray-400">
          Showing {filteredTrainers.length} of {trainers.length} trainers
        </div>
      </div>

      {showModal && (
        <AddTrainerModal
          onClose={() => setShowModal(false)}
          onAdd={addTrainer}
        />
      )}
    </div>
  );
}

/* ===== COMPONENTS ===== */

function Stat({ title, value }) {
  return (
    <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-[#39ff14]">{value}</h2>
    </div>
  );
}

function TrainerRow({ name, email, specialization, clients, status }) {
  const statusStyle = {
    Active: "bg-[#39ff14]/20 text-[#39ff14]",
    Inactive: "bg-gray-500/20 text-gray-400",
    "On Leave": "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <tr className="border-t border-white/10 hover:bg-white/5">
      <td className="px-6 py-4 flex gap-3 items-center">
        <img
          src={`https://i.pravatar.cc/40?u=${email}`}
          className="rounded-full"
        />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-400">{email}</p>
        </div>
      </td>
      <td className="text-center">{email}</td>
      <td className="text-center">{specialization}</td>
      <td className="text-center">{clients}</td>
      <td className="text-center">
        <span className={`px-3 py-1 rounded-full text-xs ${statusStyle[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-6 text-right space-x-3">
        <button>👁</button>
        <button>✏️</button>
        <button>🗑</button>
      </td>
    </tr>
  );
}

function AddTrainerModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: "Strength",
    status: "Active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, clients: 0 });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-black border border-white/10 rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Add Trainer</h2>

        <input
          placeholder="Name"
          className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <select
          className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
          onChange={(e) =>
            setForm({ ...form, specialization: e.target.value })
          }
        >
          <option>Strength</option>
          <option>Yoga</option>
          <option>Cardio</option>
        </select>

        <select
          className="w-full mb-4 px-3 py-2 bg-black border border-white/10 rounded"
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="text-gray-400">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-[#39ff14] text-black font-semibold"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
