import { useEffect, useState } from "react";
import {
  createWorkoutPlan,
  getAllWorkoutPlans,
  deleteWorkoutPlan
} from "../../api/workoutPlanApi";

export default function Workout() {
  const [showModal, setShowModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    memberId: "",
    title: "",
    exerciseIds: ""
  });

  /* ===== LOAD ALL PLANS ===== */
  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await getAllWorkoutPlans();
      setPlans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ===== CREATE PLAN ===== */
  const addWorkout = async () => {
    if (!form.memberId || !form.title) return;

    const exerciseArray = form.exerciseIds
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");

    try {
      await createWorkoutPlan({
        memberId: form.memberId.trim().toLowerCase(),
        title: form.title,
        exerciseIds: exerciseArray
      });

      setShowSuccess(true);
setTimeout(() => setShowSuccess(false), 2000);


      setForm({
        memberId: "",
        title: "",
        exerciseIds: ""
      });

      setShowModal(false);
      loadPlans();
    } catch (error) {
      console.error(error);
    }
  };

  /* ===== DELETE PLAN ===== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this workout plan?")) return;

    try {
      await deleteWorkoutPlan(id);
      loadPlans();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
  className="min-h-screen bg-cover bg-center bg-no-repeat text-white relative"
  style={{
    backgroundImage:
      "url('https://i.pinimg.com/1200x/a7/55/0e/a7550e08439c5a9443ab3f7db6c6fab7.jpg')",
  }}
>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* CONTENT WRAPPER */}
  <div className="relative z-10">


      {/* HEADER */}
      <div className="flex justify-between items-center pt-10 px-10">
         <h1 className="text-3xl font-bold text-white">
  Workout Plans
</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#39ff14] text-black px-4 py-2 text-sm rounded-md font-medium hover:scale-105 transition shadow-md"
        >
          + Create Plan
        </button>
      </div>

      {/* WORKOUT PLAN CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 pb-10 mt-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-105 transition"
          >
            {/* MEMBER */}
            <p className="text-sm text-gray-400 mb-1">Member</p>
            <h3 className="text-lg font-semibold mb-4">
              {plan.memberId}
            </h3>

            {/* TITLE */}
            <p className="text-sm text-gray-400 mb-1">Plan</p>
            <h4 className="text-md font-medium mb-4">
              {plan.title}
            </h4>

            {/* EXERCISE COUNT */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-sm">
                Exercises
              </span>
              <span className="bg-[#39ff14] text-black px-3 py-1 rounded-full text-sm font-semibold">
                {plan.exerciseIds?.length || 0}
              </span>
            </div>

            {/* DELETE */}
            <button
              onClick={() => handleDelete(plan.id)}
              className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white font-medium transition"
            >
              Delete Plan
            </button>
          </div>
        ))}
      </div>
      {showSuccess && (
  <div className="fixed bottom-6 right-6 bg-[#39ff14] text-black px-6 py-3 rounded-lg font-semibold shadow-lg">
    ✅ Workout Plan Saved Successfully
  </div>
)}


      {/* MODAL */}
      {showModal && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
    <div className="bg-[#111] p-6 rounded-xl w-[400px]">

      <h2 className="text-lg font-bold mb-4 text-white">
        Create Workout Plan
      </h2>

      <input
        placeholder="Member Email"
        value={form.memberId}
        onChange={(e) =>
          setForm({ ...form, memberId: e.target.value })
        }
        className="w-full mb-3 p-2 bg-black border border-white/20 rounded text-white"
      />

      <input
        placeholder="Plan Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        className="w-full mb-3 p-2 bg-black border border-white/20 rounded text-white"
      />

      <input
        placeholder="Exercise Names (comma separated)"
        value={form.exerciseIds}
        onChange={(e) =>
          setForm({
            ...form,
            exerciseIds: e.target.value
          })
        }
        className="w-full mb-4 p-2 bg-black border border-white/20 rounded text-white"
      />

      {/* BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="w-1/2 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md transition"
        >
          Back
        </button>

        <button
          onClick={addWorkout}
          className="w-1/2 bg-[#39ff14] text-black py-2 rounded-md font-semibold hover:scale-105 transition"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}
    </div>
    </main>
  );
}
