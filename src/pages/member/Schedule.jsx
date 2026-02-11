import { useEffect, useState } from "react";

const STORAGE_KEY = "gym_classes";

export default function Schedule() {
  /* ================= STATE ================= */
  const [classes, setClasses] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selected, setSelected] = useState(null);
  const [confirmBookId, setConfirmBookId] = useState(null);
  const [confirmCancelId, setConfirmCancelId] = useState(null);

  /* ================= AUTO SYNC ================= */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  }, [classes]);

  /* ================= HELPERS ================= */
  const isFull = (cls) => cls.clients >= cls.capacity;
  const isBookedByMe = (cls) => cls.bookedByMe === true;

  const calculateStatus = (clients, capacity) => {
    if (clients >= capacity) return "Full";
    if (capacity - clients <= 3) return "Filling Fast";
    return "Available";
  };

  /* ================= CONFIRMED BOOK ================= */
  const confirmBook = (cls) => {
    if (isFull(cls) || isBookedByMe(cls)) return;

    const updated = classes.map((c) => {
      if (c.id === cls.id) {
        const newClients = Math.min(c.clients + 1, c.capacity);
        return {
          ...c,
          clients: newClients,
          bookedByMe: true,
          status: calculateStatus(newClients, c.capacity),
        };
      }
      return c;
    });

    setClasses(updated);
    setSelected(updated.find((c) => c.id === cls.id));
    setConfirmBookId(null);
  };

  /* ================= CONFIRMED CANCEL ================= */
  const confirmCancel = (cls) => {
    if (!isBookedByMe(cls)) return;

    const updated = classes.map((c) => {
      if (c.id === cls.id) {
        const newClients = Math.max(c.clients - 1, 0);
        return {
          ...c,
          clients: newClients,
          bookedByMe: false,
          status: calculateStatus(newClients, c.capacity),
        };
      }
      return c;
    });

    setClasses(updated);
    setSelected(updated.find((c) => c.id === cls.id));
    setConfirmCancelId(null);
  };

  return (
    <div className="min-h-screen text-white flex">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-72 border-r border-white/10 p-6 hidden lg:block bg-black">
        <h2 className="text-lg font-semibold mb-6">
          Weekly Overview
        </h2>

        <div className="grid grid-cols-7 gap-2 text-sm text-center mb-10 text-gray-400">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d}>{d}</div>
          ))}
          {[28, 29, 30, 1, 2, 3, 4].map((day) => (
            <div
              key={day}
              className={`py-1 rounded-full ${
                day === 4
                  ? "bg-[#39ff14] text-black font-semibold"
                  : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <h3 className="text-xs tracking-widest text-gray-400 mb-3">
          CATEGORIES
        </h3>
        <ul className="space-y-3 text-sm">
          {[
            "Yoga & Pranayama",
            "Strength Training",
            "Functional Training",
            "Cardio Burn",
            "Zumba",
            "Boxing Fitness",
            "CrossFit",
          ].map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              {c}
            </li>
          ))}
        </ul>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        className="flex-1 p-8"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://t3.ftcdn.net/jpg/02/96/19/10/360_F_296191090_PGQXIC2Y8CCsrJ7fgCsDd8OuVN8uJtNY.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="text-3xl font-bold mb-1">
          Weekly Schedule
        </h1>
        <p className="text-gray-400 mb-8">
          Book or cancel your training sessions
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setSelected(cls)}
              className="cursor-pointer rounded-2xl p-5 bg-[#121212] border border-white/10"
            >
              <p className="text-xs text-gray-400 mb-2">
                {cls.day} • {cls.time} • {cls.duration}
              </p>

              <h3 className="font-semibold text-lg mb-2">
                {cls.title}
              </h3>

              <p className="text-xs text-gray-400 mb-2">
                Seats {cls.clients}/{cls.capacity}
              </p>

              <p className="text-xs text-gray-400 mb-4">
                Status: {cls.status}
              </p>

              {confirmBookId === cls.id ? (
                <div className="bg-green-900/30 p-3 rounded-lg text-sm">
                  <p className="text-green-400 mb-3">
                    Confirm booking this class?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmBook(cls);
                      }}
                      className="flex-1 bg-[#39ff14] text-black py-1 rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmBookId(null);
                      }}
                      className="flex-1 border border-white/20 py-1 rounded"
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : confirmCancelId === cls.id ? (
                <div className="bg-red-900/30 p-3 rounded-lg text-sm">
                  <p className="text-red-400 mb-3">
                    Confirm cancel booking?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmCancel(cls);
                      }}
                      className="flex-1 bg-red-500 py-1 rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmCancelId(null);
                      }}
                      className="flex-1 border border-white/20 py-1 rounded"
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : isBookedByMe(cls) ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmCancelId(cls.id);
                  }}
                  className="w-full bg-red-500 text-white py-2 rounded-lg"
                >
                  Cancel Booking
                </button>
              ) : (
                <button
                  disabled={isFull(cls)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmBookId(cls.id);
                  }}
                  className="w-full bg-[#39ff14] disabled:bg-gray-500 text-black py-2 rounded-lg"
                >
                  {isFull(cls) ? "FULL" : "Book Now"}
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* ================= RIGHT DETAILS PANEL ================= */}
      {selected && (
        <aside className="w-96 border-l border-white/10 p-6 hidden xl:block bg-black">
          <p className="text-xs text-[#39ff14] mb-2">
            {selected.day} • {selected.time}
          </p>

          <h2 className="text-2xl font-bold mb-6">
            {selected.title}
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-[#121212] p-3 rounded-xl">
              {selected.duration}
            </div>
            <div className="bg-[#121212] p-3 rounded-xl">
              {selected.status}
            </div>
            <div className="bg-[#121212] p-3 rounded-xl">
              {selected.clients}/{selected.capacity}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

