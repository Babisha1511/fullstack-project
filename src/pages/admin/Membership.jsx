import { useState, useEffect } from "react";

const CLIENT_KEY = "gym_clients";
const PLAN_KEY = "gym_membership_plans";

export default function Membership() {
  /* ===== LOAD CLIENTS ===== */
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem(CLIENT_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  /* ===== LOAD PLANS ===== */
  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem(PLAN_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          {
            name: "Basic",
            price: 1500,
            features: [
              "Gym Access",
              "Limited Equipment",
              "No Personal Trainer",
            ],
          },
          {
            name: "Pro",
            price: 3000,
            features: [
              "Full Gym Access",
              "Group Classes",
              "Trainer Support",
            ],
          },
          {
            name: "Elite",
            price: 5000,
            features: [
              "All Pro Features",
              "Personal Trainer",
              "Nutrition Plan",
            ],
          },
        ];
  });

  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  /* ===== SAVE TO STORAGE ===== */
  useEffect(() => {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem(CLIENT_KEY, JSON.stringify(clients));
  }, [clients]);

  /* ===== 🔧 AUTO FIX FOR OLD CLIENTS ===== */
  useEffect(() => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.membership && !c.expiryDate) {
          return {
            ...c,
            expiryDate: new Date(
              new Date().setMonth(new Date().getMonth() + 1)
            ).toISOString(),
          };
        }
        return c;
      })
    );
  }, []);

  /* ===== DATE HELPERS ===== */
  const today = new Date();
  const daysLeft = (date) =>
    Math.ceil((new Date(date) - today) / (1000 * 60 * 60 * 24));

  /* ===== STATS ===== */
  const active = clients.filter(
    (c) => c.expiryDate && daysLeft(c.expiryDate) > 7
  ).length;

  const expiring = clients.filter(
    (c) =>
      c.expiryDate &&
      daysLeft(c.expiryDate) <= 7 &&
      daysLeft(c.expiryDate) > 0
  ).length;

  const expired = clients.filter(
    (c) => c.expiryDate && daysLeft(c.expiryDate) <= 0
  ).length;

  const revenue = clients.reduce((sum, c) => {
    if (c.expiryDate && daysLeft(c.expiryDate) > 0) {
      const plan = plans.find((p) => p.name === c.membership);
      return sum + (plan?.price || 0);
    }
    return sum;
  }, 0);

  /* ===== PLAN SAVE ===== */
  const savePlan = (plan) => {
    if (editingPlan) {
      setPlans(plans.map((p) => (p.name === editingPlan.name ? plan : p)));
    } else {
      setPlans([...plans, plan]);
    }
    setShowModal(false);
    setEditingPlan(null);
  };

  const deletePlan = (name) => {
    setPlans(plans.filter((p) => p.name !== name));
  };

  /* ===== RENEW CLIENT ===== */
  const renewClient = (email) => {
    setClients(
      clients.map((c) =>
        c.email === email
          ? {
              ...c,
              expiryDate: new Date(
                new Date().setMonth(today.getMonth() + 1)
              ).toISOString(),
            }
          : c
      )
    );
  };

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
            Membership & Renewal
          </h1>
          <p className="text-gray-400 mt-1">
            Manage membership plans, renewals, and expirations.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 rounded-lg font-semibold transition"
          style={{
            backgroundColor: "#39ff14",
            color: "black",
            boxShadow: "0 0 20px rgba(57,255,20,0.4)",
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
          {plans.map((p, i) => (
            <PlanCard
              key={i}
              name={p.name}
              price={`₹${p.price} / month`}
              features={p.features}
              highlight={p.name === "Pro"}
              onEdit={() => {
                setEditingPlan(p);
                setShowModal(true);
              }}
              onDelete={() => deletePlan(p.name)}
            />
          ))}
        </div>
      </Section>

      {/* ===== RENEWAL TABLE ===== */}
      <Section title="Upcoming Renewals">
        <div className="bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="text-left px-6 py-3">Client</th>
                <th>Plan</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th className="text-right px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c, i) => {
                if (!c.membership || !c.expiryDate) return null;

                const d = daysLeft(c.expiryDate);
                let status = "Active";
                if (d <= 0) status = "Expired";
                else if (d <= 7) status = "Expiring Soon";

                return (
                  <RenewalRow
                    key={i}
                    name={c.name}
                    plan={c.membership}
                    expiry={new Date(c.expiryDate).toDateString()}
                    status={status}
                    onRenew={() => renewClient(c.email)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {showModal && (
        <PlanModal
          existing={editingPlan}
          onClose={() => {
            setShowModal(false);
            setEditingPlan(null);
          }}
          onSave={savePlan}
        />
      )}
    </div>
  );
}

/* ===== COMPONENTS ===== */

function Stat({ title, value }) {
  return (
    <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
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
  onEdit,
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
        {features.map((f, i) => (
          <li key={i}>✔ {f}</li>
        ))}
      </ul>

      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="flex-1 py-2 rounded-lg bg-[#39ff14] text-black"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 py-2 rounded-lg border border-red-400 text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function RenewalRow({ name, plan, expiry, status, onRenew }) {
  const statusStyle = {
    Active: "bg-[#39ff14]/20 text-[#39ff14]",
    "Expiring Soon": "bg-yellow-500/20 text-yellow-400",
    Expired: "bg-red-500/20 text-red-400",
  };

  return (
    <tr className="border-t border-white/10 hover:bg-white/5">
      <td className="px-6 py-4 flex items-center gap-3">
        <img
          src={`https://i.pravatar.cc/40?u=${name}`}
          className="rounded-full"
        />
        <p className="font-medium">{name}</p>
      </td>
      <td className="text-center">{plan}</td>
      <td className="text-center">{expiry}</td>
      <td className="text-center">
        <span className={`px-3 py-1 rounded-full text-xs ${statusStyle[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-6 text-right">
        {status !== "Active" && (
          <button
            onClick={onRenew}
            className="text-gray-400 hover:text-[#39ff14]"
          >
            🔄 Renew
          </button>
        )}
      </td>
    </tr>
  );
}

function PlanModal({ existing, onClose, onSave }) {
  const [name, setName] = useState(existing?.name || "");
  const [price, setPrice] = useState(existing?.price || "");
  const [features, setFeatures] = useState(
    existing?.features?.join(", ") || ""
  );

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
          {existing ? "Edit Plan" : "Create Plan"}
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
