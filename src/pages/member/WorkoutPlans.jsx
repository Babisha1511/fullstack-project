import { useEffect, useState } from "react";

export default function WorkoutPlans() {
  /* ===== GET USER EMAIL ===== */
  const rawEmail = localStorage.getItem("userEmail");
  const userEmail = rawEmail ? rawEmail.trim().toLowerCase() : null;

  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [completed, setCompleted] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  /* ===== LOAD WORKOUT PLAN ===== */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("trainer_workout_plans")) || {};

    console.log("🧠 RAW EMAIL:", rawEmail);
    console.log("🧠 NORMALIZED EMAIL:", userEmail);
    console.log("📦 ALL STORED PLANS:", stored);

    if (!userEmail) {
      setWorkoutPlan(null);
      return;
    }

    if (stored[userEmail]) {
      setWorkoutPlan(stored[userEmail]);
      return;
    }

    const fallbackKey = Object.keys(stored).find(
      (k) => k.trim().toLowerCase() === userEmail
    );

    if (fallbackKey) {
      setWorkoutPlan(stored[fallbackKey]);
      return;
    }

    setWorkoutPlan(null);
  }, []);

  /* ===== TOGGLE EXERCISE ===== */
  const toggleExercise = (name) => {
    setCompleted((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1200);
  };

  /* ===== NO PLAN ===== */
  if (!workoutPlan) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://t3.ftcdn.net/jpg/02/96/19/10/360_F_296191090_PGQXIC2Y8CCsrJ7fgCsDd8OuVN8uJtNY.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <p className="text-gray-300 text-lg">
          🚫 No workout plan assigned yet
        </p>
      </div>
    );
  }

  /* ===== PROGRESS ===== */
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round(
    (completedCount / workoutPlan.exercises.length) * 100
  );

  return (
    <main
      className="min-h-screen text-white p-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://t3.ftcdn.net/jpg/02/96/19/10/360_F_296191090_PGQXIC2Y8CCsrJ7fgCsDd8OuVN8uJtNY.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ===== HEADER ===== */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold">My Workout Plan</h1>
        <p className="text-gray-400 mt-1">
          Complete your exercises and track progress
        </p>
      </header>

      {/* ===== SUMMARY ===== */}
      <section className="grid md:grid-cols-4 gap-6 mb-12">
        <Stat title="Plan Name" value={workoutPlan.planName} />
        <Stat title="Goal" value={workoutPlan.goal} />
        <Stat title="Frequency" value={workoutPlan.frequency} />
        <Stat title="Progress" value={`${progress}%`} />
      </section>

      {/* ===== EXERCISES ===== */}
      <section className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-5">
          Today’s Exercises
        </h3>

        <div className="space-y-3">
          {workoutPlan.exercises.map((ex, i) => {
            const done = completed[ex.name];

            return (
              <div
                key={i}
                onClick={() => toggleExercise(ex.name)}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition
                  ${
                    done
                      ? "bg-[#39ff14]/20 border border-[#39ff14]/40"
                      : "bg-black border border-white/10 hover:border-[#39ff14]/30"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border
                      ${
                        done
                          ? "bg-[#39ff14] text-black border-[#39ff14]"
                          : "border-gray-500"
                      }`}
                  >
                    {done && "✓"}
                  </span>

                  <div>
                    <p className="font-medium">{ex.name}</p>
                    <p className="text-xs text-gray-400">
                      {ex.sets}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full
                    ${
                      done
                        ? "bg-[#39ff14] text-black"
                        : "bg-white/10 text-gray-400"
                    }`}
                >
                  {done ? "Completed" : "Pending"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== TOAST ===== */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-[#39ff14] text-black px-5 py-3 rounded-lg font-medium shadow-lg">
          ✅ Progress Updated
        </div>
      )}
    </main>
  );
}

/* ===== STAT CARD ===== */
function Stat({ title, value }) {
  return (
    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h2 className="text-xl font-semibold text-[#39ff14]">
        {value}
      </h2>
    </div>
  );
}
