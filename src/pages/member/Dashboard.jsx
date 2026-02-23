import { useState, useEffect } from "react";

export default function MemberDashboard() {
  // ✅ GET NAME FROM LOGIN
  const userName =
    localStorage.getItem("userName") || "Member";

  const [workoutActive, setWorkoutActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState([false, false, false]);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const [progress, setProgress] = useState({
    time: 0,
    calories: 0,
  });

  useEffect(() => {
    let timer;
    if (workoutActive) {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [workoutActive]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const calories = Math.floor(seconds * 0.15);

  const resetWorkout = () => {
    setWorkoutActive(false);
    setSeconds(0);
    setCompleted([false, false, false]);
    setCompletedCount(0);
    setWorkoutCompleted(false);
    setProgress({ time: 0, calories: 0 });
  };

  return (
    <div className="flex min-h-screen">
      <main
        className="flex-1 space-y-8 p-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.8)), url('https://t3.ftcdn.net/jpg/02/96/19/10/360_F_296191090_PGQXIC2Y8CCsrJ7fgCsDd8OuVN8uJtNY.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* ================= HEADER ================= */}
        <div className="flex items-center gap-4">
          
          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome back,{" "}
              <span className="text-[#39ff14]">
                {userName}
              </span>
            </h1>
            <p className="text-gray-400 text-sm">
              Ready to crush your goals today?
            </p>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Calories Burned", value: "450", unit: "kcal" },
            { title: "Water Intake", value: "1.5", unit: "L" },
            { title: "Active Minutes", value: "45", unit: "mins" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/10 rounded-xl p-6"
            >
              <p className="text-gray-400 text-sm">{item.title}</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {item.value}
                <span className="text-[#39ff14] text-lg ml-1">
                  {item.unit}
                </span>
              </h2>
              <div className="h-2 bg-black rounded-full mt-4">
                <div className="h-2 bg-[#39ff14] rounded-full w-2/3"></div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= WORKOUT & DIET ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WORKOUT */}
          <div className="bg-[#111] border border-white/10 rounded-xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Daily Workout Routine
              </h3>

              {!workoutCompleted ? (
                <button
                  onClick={() => setWorkoutActive(true)}
                  className="bg-[#39ff14] text-black px-4 py-1.5 rounded-full text-sm font-semibold"
                >
                  Start Workout
                </button>
              ) : (
                <button
                  onClick={resetWorkout}
                  className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold"
                >
                  Reset Workout
                </button>
              )}
            </div>

            <ul className="space-y-3">
              {[
                "Bench Press – 3 x 12",
                "Tricep Dips – 3 x 10",
                "Pushups – Failure",
              ].map((workout, i) => (
                <li
                  key={i}
                  className="flex justify-between bg-black px-4 py-3 rounded-lg"
                >
                  <span className="text-white">{workout}</span>
                  <span
                    className={`w-4 h-4 rounded-full ${
                      i < completedCount
                        ? "bg-[#39ff14]"
                        : "border border-[#39ff14]"
                    }`}
                  ></span>
                </li>
              ))}
            </ul>
          </div>

          {/* DIET */}
          <div className="bg-[#111] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Diet Chart
            </h3>
            <ul className="space-y-4">
              <li className="text-white">
                Breakfast – Oatmeal & Whey Protein
                <span className="text-[#39ff14] ml-2">450 kcal</span>
              </li>
              <li className="text-white">
                Lunch – Grilled Chicken Salad
                <span className="text-[#39ff14] ml-2">650 kcal</span>
              </li>
              <li className="text-white">
                Dinner – Grilled Fish & Quinoa
                <span className="text-[#39ff14] ml-2">550 kcal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= PROGRESS & CONSISTENCY ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Weight Loss Journey
            </h3>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">
                  Workout Time ({progress.time} mins)
                </p>
                <div className="h-3 bg-black rounded-full">
                  <div
                    className="h-3 bg-[#39ff14] rounded-full"
                    style={{
                      width: `${Math.min(progress.time * 2, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-1">
                  Calories Burned ({progress.calories} kcal)
                </p>
                <div className="h-3 bg-black rounded-full">
                  <div
                    className="h-3 bg-[#39ff14] rounded-full"
                    style={{
                      width: `${Math.min(progress.calories / 5, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Consistency
            </h3>

            <div className="flex gap-2 mt-4 flex-wrap">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded ${
                    i < completedCount
                      ? "bg-[#39ff14]"
                      : "bg-black"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MODAL ================= */}
        {workoutActive && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#111] p-6 rounded-xl w-full max-w-md border border-[#39ff14]">
              <h2 className="text-xl font-bold text-white mb-2">
                Chest & Triceps
              </h2>
              <p className="text-[#39ff14] mb-4">
                ⏱ {formatTime(seconds)} | 🔥 {calories} kcal
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  "Bench Press – 3x12",
                  "Tricep Dips – 3x10",
                  "Pushups – Failure",
                ].map((item, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      const copy = [...completed];
                      copy[i] = !copy[i];
                      setCompleted(copy);
                    }}
                    className={`cursor-pointer p-3 rounded border ${
                      completed[i]
                        ? "border-[#39ff14] text-[#39ff14]"
                        : "border-white/20 text-white"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between">
                <button
                  onClick={resetWorkout}
                  className="border border-white/30 px-4 py-2 rounded text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const count =
                      completed.filter(Boolean).length;
                    setCompletedCount(count);
                    setWorkoutCompleted(true);
                    setWorkoutActive(false);
                    setProgress({
                      time: Math.floor(seconds / 60),
                      calories,
                    });
                    setSeconds(0);
                    setCompleted([false, false, false]);
                  }}
                  className="bg-[#39ff14] text-black px-4 py-2 rounded font-semibold"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


