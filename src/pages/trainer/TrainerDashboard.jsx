import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function TrainerDashboard() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [trainerName, setTrainerName] = useState("Trainer");
  const navigate = useNavigate();

  /* ===== READ + NORMALIZE EMAIL AFTER LOGIN ===== */
  useEffect(() => {
    let email = localStorage.getItem("userEmail");

    if (email) {
      // take part before @
      const baseName = email.split("@")[0].trim().toLowerCase();

      // force @member.com
      const normalizedEmail = `${baseName}@member.com`;

      // save back
      localStorage.setItem("userEmail", normalizedEmail);

      // set trainer display name
      const name =
        baseName.charAt(0).toUpperCase() + baseName.slice(1);

      setTrainerName(name);
    }
  }, []);

  /* ===== MOCK TRAINER SCHEDULE ===== */
  const trainerSchedule = {
    "2026-01-30": 5,
    "2026-01-31": 3,
    "2026-02-03": 2,
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/a7/55/0e/a7550e08439c5a9443ab3f7db6c6fab7.jpg')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="min-h-screen bg-black/80 p-8 text-white">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Hello, <span className="text-[#39ff14]">{trainerName}</span>
            </h1>
            <p className="text-gray-400 mt-1">
              You have{" "}
              <span className="text-[#39ff14] font-semibold">5 sessions</span>{" "}
              scheduled for today
            </p>
          </div>

          <button
            onClick={() => setShowCalendar(true)}
            className="px-6 py-2 rounded-xl bg-[#39ff14] text-black font-semibold
                       shadow-[0_0_20px_rgba(57,255,20,0.5)]
                       hover:scale-105 transition"
          >
            📅 View Calendar
          </button>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Stat title="Active Clients" value="24" sub="+2 this week" />
          <Stat title="Sessions Today" value="5 / 8" />
          <Stat title="Plans Pending" value="3" />
          <Stat title="Avg Rating" value="4.9" />
        </div>

        {/* ================= TRAINING CATEGORIES ================= */}
        <Section title="Training Categories">
          <div className="grid md:grid-cols-5 gap-4">
            {[
              "Yoga & Pranayama",
              "Strength & Conditioning",
              "Functional Training",
              "Weight Loss Challenges",
              "Muscle Building",
            ].map((item) => (
              <div
                key={item}
                className="bg-black/60 backdrop-blur-lg border border-white/10
                           rounded-2xl p-5 text-center
                           hover:border-[#39ff14]/40 transition"
              >
                <div className="text-2xl mb-2 text-[#39ff14]">⬢</div>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ================= QUICK ACTIONS ================= */}
        <Section title="Quick Actions">
          <div className="grid md:grid-cols-4 gap-6">

            <QuickCard
              title="Create / Edit Workout Plans"
              desc="Assign new routines"
              img="https://i.pinimg.com/1200x/53/df/ea/53dfea1907d8b49b4f84eb20d8baa1dd.jpg"
              onClick={() => navigate("/trainer/workout")}
            />

            <QuickCard
              title="Create / Edit Nutrition Plans"
              desc="Update diet charts"
              img="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
              onClick={() => navigate("/trainer/nutrition")}
            />

            <QuickCard
              title="Manage Availability"
              desc="Set your hours"
              img="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
              onClick={() => navigate("/trainer/schedule")}
            />

            <QuickCard
              title="Log Client Progress"
              desc="Record progress notes"
              img="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
              onClick={() => navigate("/trainer/clients")}
            />

          </div>
        </Section>

        {/* ================= ASSIGNED CLIENTS ================= */}
        <Section title="Assigned Clients" right="View All">
          <div className="bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-gray-400">
                <tr>
                  <th className="text-left px-6 py-3">Client Name</th>
                  <th>Current Goal</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th className="text-right px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                <ClientRow
                  name="Aisha Sharma"
                  goal="Weight Loss"
                  progress={85}
                  status="Active"
                />
                <ClientRow
                  name="Kabir Khan"
                  goal="Muscle Building"
                  progress={60}
                  status="Active"
                />
                <ClientRow
                  name="Diya Verma"
                  goal="Yoga & Pranayama"
                  progress={45}
                  status="Paused"
                />
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      {/* ================= CALENDAR MODAL ================= */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="w-[380px] p-6 rounded-2xl
                          bg-gradient-to-br from-black to-zinc-900
                          border border-white/10 shadow-2xl">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold tracking-wide">
                Trainer Schedule
              </h2>
              <button
                onClick={() => setShowCalendar(false)}
                className="text-gray-400 hover:text-[#39ff14] text-xl"
              >
                ✕
              </button>
            </div>

            <Calendar
              className="bg-transparent text-white rounded-xl overflow-hidden"
              tileClassName={({ date }) => {
                const d = date.toISOString().split("T")[0];
                return trainerSchedule[d]
                  ? "bg-[#39ff14] text-black rounded-full shadow-[0_0_15px_rgba(57,255,20,0.6)]"
                  : "hover:bg-white/10 rounded-lg";
              }}
              tileContent={({ date }) => {
                const d = date.toISOString().split("T")[0];
                return trainerSchedule[d] ? (
                  <p className="text-[10px] text-center font-semibold">
                    {trainerSchedule[d]} sessions
                  </p>
                ) : null;
              }}
            />

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <span className="w-3 h-3 rounded-full bg-[#39ff14]
                               shadow-[0_0_10px_rgba(57,255,20,0.6)]" />
              Highlighted dates indicate scheduled sessions
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ title, value, sub }) {
  return (
    <div className="bg-black/60 backdrop-blur-lg border border-white/10
                    rounded-2xl p-6 hover:border-[#39ff14]/40 transition">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h2 className="text-3xl font-bold text-[#39ff14]">{value}</h2>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

function Section({ title, right, children }) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-semibold tracking-wide">{title}</h3>
        {right && (
          <span className="text-sm text-gray-400 hover:text-[#39ff14] cursor-pointer">
            {right}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function QuickCard({ title, desc, img, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative h-36 rounded-2xl overflow-hidden
                 border border-white/10 hover:border-[#39ff14]/40
                 hover:scale-[1.02] transition cursor-pointer"
      style={{ backgroundImage: `url(${img})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative p-4">
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-xs text-gray-400 mt-1">{desc}</p>
      </div>
    </div>
  );
}

function ClientRow({ name, goal, progress, status }) {
  return (
    <tr className="border-t border-white/10 hover:bg-white/5 transition">
      <td className="px-6 py-4 flex items-center gap-3">
        <img
          src={`https://i.pravatar.cc/40?u=${name}`}
          alt={name}
          className="rounded-full"
        />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-400">Last session: Recently</p>
        </div>
      </td>

      <td className="text-center">
        <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
          {goal}
        </span>
      </td>

      <td className="text-center">
        <div className="w-24 mx-auto">
          <div className="h-1 bg-white/10 rounded-full">
            <div
              className="h-1 rounded-full bg-[#39ff14]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{progress}%</p>
        </div>
      </td>

      <td className="text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            status === "Active"
              ? "bg-[#39ff14] text-black"
              : "bg-white/10 text-gray-400"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 text-right space-x-3">
        <button className="text-gray-400 hover:text-[#39ff14]">💬</button>
        <button className="text-gray-400 hover:text-[#39ff14]">👁</button>
      </td>
    </tr>
  );
}
