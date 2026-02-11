import { useState } from "react";

export default function Workout() {
  const [showModal, setShowModal] = useState(false);

  const [workouts, setWorkouts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("trainer_workout_list")) || [
        {
          email: "aisha@gmail.com",
          name: "Aisha Sharma",
          goal: "Weight Loss",
          plan: "Fat Burn Pro",
          frequency: "5 days / week",
          progress: 0,
          status: "Active",
        },
      ]
    );
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    goal: "",
    plan: "",
    frequency: "",
  });

  /* ===== SAVE WORKOUT ===== */
  const addWorkout = () => {
    if (
      !form.name ||
      !form.email ||
      !form.goal ||
      !form.plan ||
      !form.frequency
    )
      return;

    const newWorkout = {
      ...form,
      progress: 0,
      status: "Active",
    };

    /* ---- Trainer list (table) ---- */
    const updatedList = [...workouts, newWorkout];
    setWorkouts(updatedList);
    localStorage.setItem(
      "trainer_workout_list",
      JSON.stringify(updatedList)
    );

    /* ---- Member workout plan ---- */
    const storedPlans =
      JSON.parse(localStorage.getItem("trainer_workout_plans")) || {};

    storedPlans[form.email] = {
      planName: form.plan,
      goal: form.goal,
      frequency: form.frequency,
      exercises: [
        { name: "Treadmill Running", sets: "20 min" },
        { name: "Jump Squats", sets: "3 × 15" },
        { name: "Push Ups", sets: "3 × 12" },
        { name: "Plank Hold", sets: "3 × 45 sec" },
        { name: "Mountain Climbers", sets: "3 × 30 sec" },
      ],
    };

    localStorage.setItem(
      "trainer_workout_plans",
      JSON.stringify(storedPlans)
    );

    setForm({
      name: "",
      email: "",
      goal: "",
      plan: "",
      frequency: "",
    });

    setShowModal(false);
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/a7/55/0e/a7550e08439c5a9443ab3f7db6c6fab7.jpg')",
      }}
    >
      <section className="min-h-screen p-8 bg-black/80">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Workout Plans</h1>
            <p className="text-gray-400 mt-1">
              Create and assign workout routines to members
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 rounded-lg bg-[#39ff14] text-black font-semibold
                       shadow-[0_0_20px_rgba(57,255,20,0.4)]
                       hover:scale-105 transition"
          >
            ➕ Create Workout Plan
          </button>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Stat title="Total Plans" value={workouts.length} />
          <Stat title="Active Members" value={workouts.length} />
          <Stat title="Paused Plans" value="0" />
          <Stat title="Completion Avg" value="—" />
        </div>

        {/* ===== TABLE ===== */}
        <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-6 py-3 text-left">Client</th>
                <th>Email</th>
                <th>Goal</th>
                <th>Plan</th>
                <th>Frequency</th>
                <th>Status</th>
                <th className="px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {workouts.map((w, i) => (
                <tr
                  key={i}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/40?u=${w.email}`}
                      alt={w.name}
                      className="rounded-full"
                    />
                    <span>{w.name}</span>
                  </td>

                  <td className="text-center">{w.email}</td>
                  <td className="text-center">{w.goal}</td>
                  <td className="text-center">{w.plan}</td>
                  <td className="text-center">{w.frequency}</td>

                  <td className="text-center">
                    <span className="px-3 py-1 rounded-full text-xs bg-[#39ff14] text-black">
                      {w.status}
                    </span>
                  </td>

                  <td className="px-6 text-right space-x-3">
                    <button className="text-gray-400 hover:text-[#39ff14]">
                      ✏️
                    </button>
                    <button className="text-gray-400 hover:text-[#39ff14]">
                      👁
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="w-[420px] bg-gradient-to-br from-black to-zinc-900 p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Create Workout Plan
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-[#39ff14]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Client Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <Input
                label="Client Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              <Input
                label="Goal"
                value={form.goal}
                onChange={(e) =>
                  setForm({ ...form, goal: e.target.value })
                }
              />
              <Input
                label="Plan Name"
                value={form.plan}
                onChange={(e) =>
                  setForm({ ...form, plan: e.target.value })
                }
              />
              <Input
                label="Frequency"
                value={form.frequency}
                onChange={(e) =>
                  setForm({
                    ...form,
                    frequency: e.target.value,
                  })
                }
              />

              <button
                onClick={addWorkout}
                className="w-full py-2 rounded-lg bg-[#39ff14] text-black font-semibold
                           shadow-[0_0_20px_rgba(57,255,20,0.5)]
                           hover:scale-105 transition"
              >
                Save Workout Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
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

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-3 py-2 rounded-lg bg-black/60
                   border border-white/10 text-white
                   focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
      />
    </div>
  );
}
