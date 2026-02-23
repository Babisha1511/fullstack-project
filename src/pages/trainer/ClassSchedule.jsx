import { useState, useEffect } from "react";
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule
} from "../../api/scheduleApi";

export default function ClassSchedule() {

  /* ================= STATE ================= */
  const [classes, setClasses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  /* ================= LOAD FROM BACKEND ================= */
  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const response = await getSchedules();
      setClasses(response.data);
    } catch (error) {
      console.error("Error loading schedules:", error);
    }
  };

  /* ================= ACTIONS ================= */
  const openAdd = () => {
    setMode("add");
    setSelectedClass(null);
    setModalOpen(true);
  };

  const openEdit = (cls) => {
    setMode("edit");
    setSelectedClass(cls);
    setModalOpen(true);
  };

  const openView = (cls) => {
    setMode("view");
    setSelectedClass(cls);
    setModalOpen(true);
  };

 const saveClass = async (data) => {

  const clients = Number(data.clients || 0);
  const capacity = Number(data.capacity || 0);

  const status =
    clients >= capacity
      ? "Full"
      : capacity - clients <= 3
      ? "Filling Fast"
      : "Available";

  const payload = {
    ...data,
    clients,
    capacity,
    status
  };

  try {

    if (mode === "add") {
      await createSchedule(payload);
    } else {
      await updateSchedule(data.id, payload);
    }

    await loadSchedules();

    // 🔥🔥🔥 ADD THIS LINE
    window.dispatchEvent(new Event("schedulesUpdated"));

    setModalOpen(false);

  } catch (error) {
    console.error("SAVE ERROR:", error);
  }
};

const confirmDelete = async (id) => {
  try {
    await deleteSchedule(id);

    setClasses(prev =>
      prev.filter(cls => cls.id !== id)
    );

    setDeleteId(null);

    window.dispatchEvent(new Event("schedulesUpdated"));

  } catch (error) {
    console.error("Delete failed:", error);
  }
};



  /* ================= UI ================= */
  return (
    <div className="relative min-h-screen text-white">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/a7/55/0e/a7550e08439c5a9443ab3f7db6c6fab7.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 p-8 min-h-screen">

        {/* HEADER */}
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Class Schedule</h1>
            <p className="text-gray-400">Manage training sessions</p>
          </div>

          <button
            onClick={openAdd}
            className="bg-[#39ff14] text-black px-5 py-2 rounded-lg font-semibold"
          >
            ➕ Add Class
          </button>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {days.map((day) => (
            <div
              key={day}
              className="bg-black/60 border border-white/10 rounded-xl p-5"
            >
              <h3 className="font-semibold mb-4">{day}</h3>

              {classes
                .filter((c) => c.day === day)
                .map((cls) => (
                  <div
                    key={cls.id}
                    className="bg-black/70 border border-white/10 rounded-lg p-4 mb-4"
                  >
                    <p className="text-sm text-gray-400">{cls.time}</p>
                    <h4 className="font-semibold">{cls.title}</h4>
                    <p className="text-xs text-gray-400 mb-3">
                      {cls.clients}/{cls.capacity} clients
                    </p>

                    {/* ACTIONS */}
                    {deleteId === cls.id ? (
                      <div className="bg-red-900/30 p-2 rounded text-sm">
                        <p className="mb-2 text-red-400">
                          Confirm delete this class?
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => confirmDelete(cls.id)}
                            className="flex-1 bg-red-500 text-black rounded py-1"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteId(null)}
                            className="flex-1 border border-white/20 rounded py-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(cls)}
                          className="flex-1 border border-[#39ff14]/60 text-[#39ff14] rounded py-1"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => openView(cls)}
                          className="flex-1 border border-blue-400/60 text-blue-400 rounded py-1"
                        >
                          👁
                        </button>
                        <button
                          onClick={() => setDeleteId(cls.id)}
                          className="flex-1 border border-red-500/60 text-red-500 rounded py-1"
                        >
                          🗑
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* MODAL */}
        {modalOpen && (
          <ClassModal
            mode={mode}
            data={selectedClass}
            onClose={() => setModalOpen(false)}
            onSave={saveClass}
            days={days}
          />
        )}
      </div>
    </div>
  );
}

/* ================= MODAL ================= */

function ClassModal({ mode, data, onClose, onSave, days }) {

  const [form, setForm] = useState(
    data
      ? { ...data }
      : {
          day: "Monday",
          time: "",
          duration: "",
          title: "",
          clients: 0,
          capacity: 20,
        }
  );

  const readOnly = mode === "view";

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded-xl w-[420px] border border-white/10">
        <h2 className="text-xl font-bold mb-4 capitalize">
          {mode} Class
        </h2>

        <select
          value={form.day}
          disabled={readOnly}
          onChange={(e) =>
            setForm({ ...form, day: e.target.value })
          }
          className="w-full mb-3 p-2 bg-black border border-white/20 rounded"
        >
          {days.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        {["time", "duration", "title", "clients", "capacity"].map((f) => (
          <input
            key={f}
            value={form[f]}
            readOnly={readOnly}
            placeholder={f}
            onChange={(e) =>
              setForm({ ...form, [f]: e.target.value })
            }
            className="w-full mb-3 p-2 bg-black border border-white/20 rounded"
          />
        ))}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-white/20 px-4 py-2 rounded"
          >
            Close
          </button>

          {mode !== "view" && (
            <button
              onClick={() => onSave(form)}
              className="bg-[#39ff14] text-black px-4 py-2 rounded font-semibold"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
