import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { getMemberships } from "../../api/membershipApi";

export default function Reports() {

  /* ================= STATE ================= */
  const [plans, setPlans] = useState([]);
  const [clients, setClients] = useState([]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadData();
  }, []);

  // Auto refresh when membership page dispatches event
  useEffect(() => {
    const handler = () => loadData();
    window.addEventListener("membershipUpdated", handler);
    return () => window.removeEventListener("membershipUpdated", handler);
  }, []);

  const loadData = async () => {
    try {
      // Load membership plans from backend
      const response = await getMemberships();
      setPlans(response.data);

      // Load clients from Client Management (localStorage)
      const storedClients =
        JSON.parse(localStorage.getItem("gym_clients")) || [];

      setClients(storedClients);

    } catch (error) {
      console.error("Failed to load report data:", error);
    }
  };

  /* ================= CALCULATIONS ================= */

  // 🔥 Total Members (from Client Management)
  const totalMembers = clients.length;

  // 🔥 Total Revenue (based on client subscriptions)
  const totalRevenue = clients.reduce((sum, client) => {
    const plan = plans.find(
      (p) => p.name === client.membership
    );
    return sum + (plan?.price || 0);
  }, 0);

  // 🔥 Distribution per plan
  const planDistribution = plans.map((plan) => {

    const count = clients.filter(
      (c) => c.membership === plan.name
    ).length;

    return {
      label: plan.name,
      value: totalMembers
        ? `${count} Members`
        : "0 Members"
    };
  });

  /* ================= CSV EXPORT ================= */
  const handleDownloadCSV = () => {

    const headers = ["Plan", "Members", "Revenue"];

    const data = plans.map((plan) => {
      const count = clients.filter(
        (c) => c.membership === plan.name
      ).length;

      return [
        plan.name,
        count,
        count * plan.price
      ];
    });

    const csvRows = [
      headers.join(","),
      ...data.map((row) => row.join(","))
    ];

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gym-reports.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ================= PDF EXPORT ================= */
  const handleExportPDF = () => {

  const doc = new jsPDF();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.text("Reports & Analytics", 20, 20);

  doc.setFontSize(12);
  doc.text("Membership Performance Report", 20, 30);

  let y = 45;

  plans.forEach((plan) => {
    doc.text(
      `${plan.name}  -  Price: Rs. ${plan.price}`,
      20,
      y
    );
    y += 10;
  });

  // Add total revenue at bottom
  const totalRevenue = plans.reduce(
    (sum, plan) => sum + (plan.price || 0),
    0
  );

  y += 10;
  doc.setFontSize(14);
  doc.text(`Total Revenue: Rs. ${totalRevenue}`, 20, y);

  doc.save("gym-reports.pdf");
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
            Reports & Analytics
          </h1>
          <p className="text-gray-400 mt-1">
            Monitor performance, revenue, and overall gym activity.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExportPDF}
            className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Export PDF
          </button>

          <button
            onClick={handleDownloadCSV}
            className="px-5 py-2 rounded-lg font-semibold transition"
            style={{
              backgroundColor: "#39ff14",
              color: "black",
              boxShadow: "0 0 20px rgba(57,255,20,0.4)",
            }}
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* ===== KPI STATS ===== */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Stat title="Total Revenue" value={`₹${totalRevenue}`} />
        <Stat title="Total Members" value={totalMembers} />
        <Stat title="Total Plans" value={plans.length} />
        <Stat
          title="Avg Revenue / Member"
          value={
            totalMembers
              ? `₹${Math.round(totalRevenue / totalMembers)}`
              : "₹0"
          }
        />
      </div>

      {/* ===== DISTRIBUTION ===== */}
      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        <ReportCard
          title="Membership Distribution"
          description="Breakdown of active memberships by plan"
          rows={planDistribution}
        />
      </div>

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

function ReportCard({ title, description, rows }) {
  return (
    <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>

      <div className="space-y-3">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex justify-between items-center text-sm"
          >
            <span>{row.label}</span>
            <span className="font-semibold text-[#39ff14]">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 