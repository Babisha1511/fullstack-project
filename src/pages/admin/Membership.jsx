import { useState, useEffect } from "react";
import {
  getMemberships,
  createMembership,
  deleteMembership
} from "../../api/membershipApi";

const CLIENT_KEY = "gym_clients";


export default function Membership() {

  
  /* ===== CLIENTS STILL LOCAL (optional for now) ===== */
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem(CLIENT_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  /* ===== PLANS FROM BACKEND ===== */
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);

const loadPlans = async () => {
  try {
    const response = await getMemberships();
    console.log("MEMBERSHIPS FROM BACKEND:", response.data);
    setPlans(response.data);
  } catch (error) {
    console.error("Error loading memberships:", error);
  }
};

useEffect(() => {
    console.log("Membership Component Mounted");
    loadPlans();
  }, []);

useEffect(() => {
  const refreshClients = () => {
    const saved = localStorage.getItem(CLIENT_KEY);
    setClients(saved ? JSON.parse(saved) : []);
  };

  refreshClients(); // load once

  window.addEventListener("storage", refreshClients);

  return () => {
    window.removeEventListener("storage", refreshClients);
  };
}, []);

  /* ===== SAVE PLAN ===== */
  const savePlan = async (plan) => {
    try {
      await createMembership(plan);
      await loadPlans();
      setShowModal(false);
      setEditingPlan(null);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  /* ===== DELETE PLAN ===== */
  const removePlan = async (id) => {
    try {
      await deleteMembership(id);
      await loadPlans();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };


  /* ===== STATS ===== */
 
const active = plans.length;
// No expiry tracking available
const expiring = 0;
const expired = 0;

// Revenue = sum of plan price for all active members
const revenue = plans.reduce((sum, plan) => {
  return sum + (plan.price || 0);
}, 0);

  return (
    <div
      className="p-8 min-h-screen text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://png.pngtree.com/thumb_back/fh260/background/20230721/pngtree-contemporary-3d-render-of-a-gym-with-modern-interior-design-image_3766556.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">
            Membership & Renewal
          </h1>
          <p className="text-gray-400 mt-1">
            Manage membership plans, renewals, and expirations.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 rounded-lg font-semibold"
          style={{
            backgroundColor: "#39ff14",
            color: "black",
          }}
        >
          ➕ Create Plan
        </button>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <Stat title="Active Memberships" value={active} />
        <Stat title="Expiring Soon" value={expiring} />
        <Stat title="Expired" value={expired} />
        <Stat title="Monthly Revenue" value={`₹${revenue}`} />
      </div>

      {/* ===== MEMBERSHIP PLANS ===== */}
      <Section title="Membership Plans">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <PlanCard
              key={p.id}
              name={p.name}
              price={`₹${p.price} / month`}
              features={p.features}
              highlight={p.name === "Pro"}
              onDelete={() => removePlan(p.id)}
            />
          ))}
        </div>
      </Section>

      {showModal && (
        <PlanModal
          onClose={() => setShowModal(false)}
          onSave={savePlan}
        />
      )}
    </div>
  );
}

/* ===== COMPONENTS ===== */

function Stat({ title, value }) {
  return (
    <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h2 className="text-3xl font-bold text-[#39ff14]">{value}</h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-5">{title}</h3>
      {children}
    </div>
  );
}

function PlanCard({
  name,
  price,
  features,
  highlight,
  onDelete,
}) {
  return (
    <div
      className={`border rounded-2xl p-6 ${
        highlight
          ? "border-[#39ff14] bg-black/70"
          : "border-white/10 bg-black/60"
      }`}
    >
      <h4 className="text-xl font-bold mb-2">{name}</h4>

      <p className="text-2xl font-semibold mb-4 text-[#39ff14]">
        {price}
      </p>

      <ul className="space-y-2 text-sm text-gray-400 mb-6">
        {features?.map((f, i) => (
          <li key={i}>✔ {f}</li>
        ))}
      </ul>

      <button
        onClick={onDelete}
        className="w-full border border-red-400 text-red-400 py-2 rounded-lg"
      >
        Delete
      </button>
    </div>
  );
}

function PlanModal({ onClose, onSave }) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");

  const submit = () => {
    if (!name || !price) return;

    onSave({
      name,
      price: Number(price),
      features: features.split(",").map((f) => f.trim()),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black border border-white/10 rounded-xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          Create Plan
        </h2>

        <input
          placeholder="Plan Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
        />

        <input
          placeholder="Monthly Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
        />

        <textarea
          placeholder="Features (comma separated)"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full mb-4 px-3 py-2 bg-black border border-white/10 rounded"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-400">
            Cancel
          </button>

          <button
            onClick={submit}
            className="px-4 py-2 rounded bg-[#39ff14] text-black font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
