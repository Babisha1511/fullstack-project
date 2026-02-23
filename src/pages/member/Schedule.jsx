import { useEffect, useState } from "react";

import {
  getSchedules,
  bookSchedule,
  cancelSchedule
} from "../../api/scheduleApi";

export default function Schedule() {

  const [classes, setClasses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [confirmBookId, setConfirmBookId] = useState(null);
  const [confirmCancelId, setConfirmCancelId] = useState(null);

  // Track bookings for this user
  const [myBookings, setMyBookings] = useState([]);

  /* ================= LOAD FROM BACKEND ================= */
  useEffect(() => {
    loadSchedules();
  }, []);
// Reload when other parts of the app update schedules (trainer panel)

useEffect(() => {
    const handler = () => loadSchedules();
    window.addEventListener("schedulesUpdated", handler);
    return () => window.removeEventListener("schedulesUpdated", handler);
  }, []);

  const loadSchedules = async () => {
  try {
    console.log("Calling GET schedules...");

    const response = await getSchedules();

    console.log("FULL RESPONSE:", response);
    console.log("RESPONSE.DATA:", response.data);
    console.log("IS ARRAY?", Array.isArray(response.data));

    setClasses(Array.isArray(response.data) ? response.data : []);

  } catch (error) {
    console.error("ERROR LOADING SCHEDULES:", error);
  }
};

  const isFull = (cls) => cls.status === "Full";
  const isBooked = (cls) => myBookings.includes(cls.id);

  /* ================= CONFIRMED BOOK ================= */
const confirmBook = (cls) => {

  setMyBookings(prev =>
    prev.includes(cls.id) ? prev : [...prev, cls.id]
  );

  setConfirmBookId(null);

};






  /* ================= CONFIRMED CANCEL ================= */

const confirmCancel = (cls) => {

  setMyBookings(prev =>
    prev.filter(id => id !== cls.id)
  );

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
        </div>

        <h3 className="text-xs tracking-widest text-gray-400 mb-3">
          CATEGORIES
        </h3>

        <ul className="space-y-3 text-sm">
          {[
            "Yoga",
            "Strength",
            "Cardio",
            "Zumba",
            "Boxing",
            "CrossFit"
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
                {cls.clients}/{cls.capacity} Seats
              </p>

              <p className="text-xs text-gray-400 mb-4">
                Status: {cls.status}
              </p>

              {/* ================= BUTTON LOGIC ================= */}
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

) : isBooked(cls) ? (

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
    onClick={(e) => {
      e.stopPropagation();
      setConfirmBookId(cls.id);
    }}
    className="w-full bg-[#39ff14] text-black py-2 rounded-lg"
  >
    Book Now
  </button>

)}



            </div>
          ))}

        </div>
      </main>

      {/* ================= RIGHT PANEL ================= */}
      {selected && (
        <aside className="w-96 border-l border-white/10 p-6 hidden xl:block bg-black">
          <p className="text-xs text-[#39ff14] mb-2">
            {selected.day} • {selected.time}
          </p>

          <h2 className="text-2xl font-bold mb-6">
            {selected.title}
          </h2>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-[#121212] p-3 rounded-xl">
              {selected.duration}
            </div>

            <div className="bg-[#121212] p-3 rounded-xl">
              {isBooked(selected) ? "Booked" : selected.status}
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
