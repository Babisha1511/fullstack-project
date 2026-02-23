import { useState, useEffect } from "react";
import { addClient as addClientApi } from "../../api/clientApi";
export default function AdminClients() {
  /* ===== CLIENT DATA (SHARED WITH TRAINER) ===== */

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [membershipFilter, setMembershipFilter] = useState("All");
  const [trainerFilter, setTrainerFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [clients, setClients] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
  fetchClients();
}, []);

const fetchClients = async () => {
  try {
    const res = await fetch("http://localhost:8086/api/clients");
    const data = await res.json();
    setClients(data);
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    membership: "Basic",
    trainer: "",
    status: "Active",
    goal: "",
    plan: "",
    progress: 0,
  });

  /* ===== SYNC WITH LOCAL STORAGE ===== */

  /* ===== ADD CLIENT ===== */
 const handleAddClient = async () => {
  if (!form.name) return;

  try {
    const response = await addClientApi({
      name: form.name,
      email:
        form.email ||
        form.name.toLowerCase().replace(/\s+/g, "") + "@gym.com",
      phone: form.phone,
      membership: form.membership,
      trainer: form.trainer,
      status: form.status.toUpperCase(),
    });

    setSuccessMessage(response.data);  // 🔥 show backend message

    fetchClients();
    setShowModal(false);

    setForm({
      name: "",
      email: "",
      phone: "",
      membership: "Basic",
      trainer: "",
      status: "Active",
    });

    // Auto-hide message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (error) {
    console.error("Error saving client:", error);
  }
};

const removeClient = async (id) => {
  try {
    await fetch(`http://localhost:8086/api/clients/${id}`, {
      method: "DELETE",
    });

    // Update UI after delete
    setClients(clients.filter((c) => c.id !== id));

    setSuccessMessage("Client removed successfully");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (error) {
    console.error("Error deleting client:", error);
  }
};
  /* ===== FILTER ===== */
  const filteredClients = clients.filter((c) => {
    const searchMatch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search));

    const statusMatch =
      statusFilter === "All" || c.status === statusFilter;

    const membershipMatch =
      membershipFilter === "All" ||
      c.membership === membershipFilter;

    const trainerMatch =
      trainerFilter === "All" ||
      (trainerFilter === "Assigned" && c.trainer) ||
      (trainerFilter === "Unassigned" && !c.trainer);

    return (
      searchMatch &&
      statusMatch &&
      membershipMatch &&
      trainerMatch
    );
  });

  /* ===== STATS ===== */
  const total = clients.length;
  const active = clients.filter((c) => c.status === "Active").length;
  const paused = clients.filter((c) => c.status === "Paused").length;
  const expired = clients.filter((c) => c.status === "Expired").length;

  return (
    <main
      className="min-h-screen text-white p-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://png.pngtree.com/thumb_back/fh260/background/20230721/pngtree-contemporary-3d-render-of-a-gym-with-modern-interior-design-image_3766556.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ===== HEADER ===== */}
      {successMessage && (
  <div className="mb-6 p-3 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30">
    {successMessage}
  </div>
)}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Admin Client Management</h1>
          <p className="text-gray-400 text-sm">
            Manage members, trainers, and subscriptions
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 rounded-lg bg-[#39ff14] text-black font-semibold shadow-lg"
        >
          ➕ Add Client
        </button>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Stat title="Total Clients" value={total} />
        <Stat title="Active" value={active} />
        <Stat title="Paused" value={paused} />
        <Stat title="Expired" value={expired} />
      </div>

      {/* ===== SEARCH & FILTERS ===== */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-black/70 border border-white/10 rounded-lg px-4 py-2"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black/70 border border-white/10 rounded-lg px-3 py-2"
        >
          <option value="All">Status: All</option>
          <option>Active</option>
          <option>Paused</option>
          <option>Expired</option>
        </select>

        <select
          value={membershipFilter}
          onChange={(e) => setMembershipFilter(e.target.value)}
          className="bg-black/70 border border-white/10 rounded-lg px-3 py-2"
        >
          <option value="All">Membership</option>
          <option>Basic</option>
          <option>Pro</option>
          <option>Elite</option>
        </select>

        <select
          value={trainerFilter}
          onChange={(e) => setTrainerFilter(e.target.value)}
          className="bg-black/70 border border-white/10 rounded-lg px-3 py-2"
        >
          <option value="All">Trainer</option>
          <option value="Assigned">Assigned</option>
          <option value="Unassigned">Unassigned</option>
        </select>
      </div>

      {/* ===== CLIENT TABLE ===== */}
      <div className="bg-black/70 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="text-left px-6 py-3">Client</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Membership</th>
              <th>Trainer</th>
              <th>Status</th>
              <th className="text-right px-6">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredClients.map((c, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="px-6 py-4 font-medium">{c.name}</td>
                <td className="text-center">{c.email}</td>
                <td className="text-center">{c.phone || "-"}</td>
                <td className="text-center">{c.membership}</td>
                <td className="text-center">{c.trainer || "—"}</td>
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      c.status === "Active"
                        ? "bg-[#39ff14]/20 text-[#39ff14]"
                        : c.status === "Paused"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="text-right px-6">
                  <button
                    onClick={() => removeClient(c.id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-3 text-xs text-gray-400">
          Showing {filteredClients.length} of {clients.length} clients
        </div>
      </div>

      {/* ===== ADD CLIENT MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-md border border-white/10">
            <h2 className="text-xl font-bold mb-4">Add Client</h2>

            <input
              placeholder="Name"
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email (optional)"
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <select
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              onChange={(e) =>
                setForm({ ...form, membership: e.target.value })
              }
            >
              <option>Basic</option>
              <option>Pro</option>
              <option>Elite</option>
            </select>

            <input
              placeholder="Trainer (optional)"
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              onChange={(e) =>
                setForm({ ...form, trainer: e.target.value })
              }
            />

            <select
              className="w-full mb-4 px-3 py-2 bg-black border border-white/10 rounded"
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Active</option>
              <option>Paused</option>
              <option>Expired</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="px-4 py-2 rounded bg-[#39ff14] text-black font-semibold"
              >
                Save Client
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ===== STAT CARD ===== */
function Stat({ title, value }) {
  return (
    <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-[#39ff14]">{value}</h2>
    </div>
  );
} 