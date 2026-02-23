import { useState, useEffect } from "react";
import { getClients } from "../../api/clientApi";
import { addClient as addClientApi } from "../../api/clientApi";

export default function TrainerClients() {
 const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    goal: "",
    plan: "",
    progress: 0,
  });

useEffect(() => {
  fetchClients();
}, []);

const fetchClients = async () => {
  try {
    const response = await getClients();
    setClients(response.data);
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
};

  /* ===== ADD CLIENT ===== */
  const handleAddClient = async () => {
  if (!form.name || !form.goal || !form.plan) return;

  try {
    const response = await addClientApi({
      name: form.name,
      email:
        form.email ||
        form.name.toLowerCase().replace(/\s+/g, "") + "@gym.com",
      membership: "Trainer Added",
      trainer: "Assigned",
      status: "Active",
      goal: form.goal,
      plan: form.plan,
      progress: Number(form.progress) || 0,
    });

    setSuccessMessage("Client added successfully");

    fetchClients(); // refresh from backend
    setShowModal(false);

    setForm({
      name: "",
      email: "",
      goal: "",
      plan: "",
      progress: 0,
    });

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (error) {
    console.error("Error saving client:", error);
  }
};
  /* ===== REMOVE CLIENT ===== */
  const removeClient = async (id) => {
  try {
    await fetch(`http://localhost:8086/api/clients/${id}`, {
      method: "DELETE",
    });

    setSuccessMessage("Client removed successfully");

    fetchClients(); // refresh list

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (error) {
    console.error("Error deleting client:", error);
  }
};

  /* ===== SEARCH FILTER ===== */
  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.goal && c.goal.toLowerCase().includes(search.toLowerCase())) ||
      (c.plan && c.plan.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://png.pngtree.com/thumb_back/fh260/background/20230721/pngtree-contemporary-3d-render-of-a-gym-with-modern-interior-design-image_3766556.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ===== PAGE OVERLAY CONTENT ===== */}
      <section className="p-8">
        {successMessage && (
  <div className="mb-6 p-3 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30">
    {successMessage}
  </div>
)}
        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Trainer Clients</h1>
            <p className="text-gray-400 text-sm">
              View and manage assigned clients
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 rounded-lg bg-[#39ff14] text-black font-semibold shadow-lg"
          >
            ➕ Add Client
          </button>
        </div>

        {/* ===== SEARCH ===== */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, goal, plan..."
          className="w-full mb-6 px-4 py-2 rounded-lg bg-black/70 border border-white/10"
        />

        {/* ===== CLIENT TABLE ===== */}
        <div className="bg-black/70 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="text-left px-6 py-3">Client</th>
                <th>Goal</th>
                <th>Plan</th>
                <th>Progress</th>
                <th className="text-right px-6">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredClients.map((c, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="px-6 py-4">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.email}</p>
                  </td>

                  <td className="text-center">{c.goal}</td>
                  <td className="text-center">{c.plan}</td>

                  <td className="text-center">
                    <div className="w-28 h-2 bg-white/10 rounded-full mx-auto">
                      <div
                        className="h-2 bg-[#39ff14] rounded-full"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-gray-400">
                      {c.progress}%
                    </p>
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
      </section>

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
              placeholder="Goal"
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              onChange={(e) =>
                setForm({ ...form, goal: e.target.value })
              }
            />

            <input
              placeholder="Plan"
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              onChange={(e) =>
                setForm({ ...form, plan: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Progress (%)"
              className="w-full mb-4 px-3 py-2 bg-black border border-white/10 rounded"
              onChange={(e) =>
                setForm({ ...form, progress: e.target.value })
              }
            />

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
