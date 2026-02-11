import { useEffect, useState } from "react";

export default function Equipments() {
  const [equipments, setEquipments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "Cardio",
    purchase: "",
    condition: "Operational",
    service: "",
  });

  /* ===== INIT LOCAL STORAGE ===== */
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("equipments"));

    if (!existing) {
      const seed = [
        {
          name: "Treadmill X200",
          category: "Cardio",
          purchase: "Jan 2022",
          condition: "Operational",
          service: "Nov 2024",
        },
        {
          name: "Smith Machine",
          category: "Strength",
          purchase: "Mar 2021",
          condition: "Maintenance",
          service: "Oct 2024",
        },
        {
          name: "Elliptical Pro",
          category: "Cardio",
          purchase: "Aug 2020",
          condition: "Operational",
          service: "Dec 2024",
        },
        {
          name: "Battle Rope",
          category: "Functional",
          purchase: "Jun 2019",
          condition: "Out of Order",
          service: "—",
        },
      ];
      localStorage.setItem("equipments", JSON.stringify(seed));
      setEquipments(seed);
    } else {
      setEquipments(existing);
    }
  }, []);

  /* ===== ADD BUTTON ===== */
  const openAddModal = () => {
    setEditIndex(null);
    setForm({
      name: "",
      category: "Cardio",
      purchase: "",
      condition: "Operational",
      service: "",
    });
    setShowModal(true);
  };

  /* ===== EDIT BUTTON ===== */
  const openEditModal = (index) => {
    setEditIndex(index);
    setForm(equipments[index]);
    setShowModal(true);
  };

  /* ===== SAVE EQUIPMENT ===== */
  const saveEquipment = () => {
    let updated;

    if (editIndex !== null) {
      updated = [...equipments];
      updated[editIndex] = form;
    } else {
      updated = [...equipments, form];
    }

    setEquipments(updated);
    localStorage.setItem("equipments", JSON.stringify(updated));
    setShowModal(false);
  };

  /* ===== FILTER ===== */
  const filteredEquipments = equipments.filter((eq) => {
    const matchesSearch =
      eq.name.toLowerCase().includes(search.toLowerCase()) ||
      eq.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || eq.condition === statusFilter;

    const matchesCategory =
      categoryFilter === "All" || eq.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

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
          <h1 className="text-3xl font-bold tracking-wide">
            Equipments
          </h1>
          <p className="text-gray-400 mt-1">
            Track gym equipment status, maintenance, and availability.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2 rounded-lg font-semibold transition"
          style={{
            backgroundColor: "#39ff14",
            color: "black",
            boxShadow: "0 0 20px rgba(57,255,20,0.4)",
          }}
        >
          ➕ Add Equipment
        </button>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <Stat title="Total Equipments" value={equipments.length} />
        <Stat
          title="Operational"
          value={
            equipments.filter(
              (e) => e.condition === "Operational"
            ).length
          }
        />
        <Stat
          title="Under Maintenance"
          value={
            equipments.filter(
              (e) => e.condition === "Maintenance"
            ).length
          }
        />
        <Stat
          title="Out of Order"
          value={
            equipments.filter(
              (e) => e.condition === "Out of Order"
            ).length
          }
        />
      </div>

      {/* ===== SEARCH & FILTER ===== */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Search equipment by name or category..."
          className="flex-1 bg-black/70 border border-white/10 rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3 text-sm">
          <select
            className="bg-black/70 border border-white/10 rounded-lg px-3 py-2"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">Status: All</option>
            <option>Operational</option>
            <option>Maintenance</option>
            <option>Out of Order</option>
          </select>

          <select
            className="bg-black/70 border border-white/10 rounded-lg px-3 py-2"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">Category</option>
            <option>Cardio</option>
            <option>Strength</option>
            <option>Functional</option>
          </select>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-black/70 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="px-6 py-3 text-left">Equipment</th>
              <th>Category</th>
              <th>Purchase Date</th>
              <th>Condition</th>
              <th>Next Service</th>
              <th className="px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipments.map((eq, index) => (
              <EquipmentRow
                key={index}
                {...eq}
                onEdit={() => openEditModal(index)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111] p-6 rounded-xl w-[400px] border border-white/10">
            <h2 className="text-xl font-bold mb-4">
              {editIndex !== null
                ? "Edit Equipment"
                : "Add Equipment"}
            </h2>

            {["name", "purchase", "service"].map((field) => (
              <input
                key={field}
                placeholder={
                  field === "name"
                    ? "Equipment Name"
                    : field === "purchase"
                    ? "Purchase Date"
                    : "Next Service"
                }
                className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
                value={form[field]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field]: e.target.value,
                  })
                }
              />
            ))}

            <select
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              <option>Cardio</option>
              <option>Strength</option>
              <option>Functional</option>
            </select>

            <select
              className="w-full mb-4 px-3 py-2 bg-black border border-white/10 rounded"
              value={form.condition}
              onChange={(e) =>
                setForm({
                  ...form,
                  condition: e.target.value,
                })
              }
            >
              <option>Operational</option>
              <option>Maintenance</option>
              <option>Out of Order</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveEquipment}
                className="px-4 py-2 bg-[#39ff14] text-black rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== COMPONENTS ===== */

function Stat({ title, value }) {
  return (
    <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h2 className="text-3xl font-bold text-[#39ff14]">
        {value}
      </h2>
    </div>
  );
}

function EquipmentRow({
  name,
  category,
  purchase,
  condition,
  service,
  onEdit,
}) {
  const statusStyle = {
    Operational: "bg-[#39ff14]/20 text-[#39ff14]",
    Maintenance: "bg-yellow-500/20 text-yellow-400",
    "Out of Order": "bg-red-500/20 text-red-400",
  };

  return (
    <tr className="border-t border-white/10 hover:bg-white/5">
      <td className="px-6 py-4 font-medium">{name}</td>
      <td className="text-center">{category}</td>
      <td className="text-center">{purchase}</td>
      <td className="text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs ${statusStyle[condition]}`}
        >
          {condition}
        </span>
      </td>
      <td className="text-center text-gray-300">
        {service}
      </td>
      <td className="px-6 text-right">
        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-[#39ff14]"
        >
          ✏️
        </button>
      </td>
    </tr>
  );
}
