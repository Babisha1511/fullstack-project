import jsPDF from "jspdf";

export default function Reports() {
  const handleDownloadCSV = () => {
    const headers = [
      "Month",
      "New Members",
      "Renewals",
      "Revenue",
      "Trainer Sessions",
    ];

    const data = [
      ["September", 120, 86, "₹4.1L", 780],
      ["October", 154, 112, "₹4.6L", 840],
      ["November", 132, 94, "₹4.3L", 810],
    ];

    const csvRows = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ];

    const csvContent = csvRows.join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "gym-reports.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* ===== PDF EXPORT HANDLER ===== */
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reports & Analytics", 14, 20);

    doc.setFontSize(12);
    doc.text("Monthly Performance Report", 14, 30);

    const rows = [
      ["September", "120", "86", "₹4.1L", "780"],
      ["October", "154", "112", "₹4.6L", "840"],
      ["November", "132", "94", "₹4.3L", "810"],
    ];

    let y = 40;

    doc.setFontSize(10);
    doc.text("Month", 14, y);
    doc.text("New Members", 45, y);
    doc.text("Renewals", 85, y);
    doc.text("Revenue", 115, y);
    doc.text("Sessions", 155, y);

    y += 8;

    rows.forEach((r) => {
      doc.text(r[0], 14, y);
      doc.text(r[1], 55, y);
      doc.text(r[2], 95, y);
      doc.text(r[3], 115, y);
      doc.text(r[4], 160, y);
      y += 7;
    });

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
        <Stat title="Total Revenue" value="₹28.4L" />
        <Stat title="Monthly Growth" value="+12.6%" />
        <Stat title="Active Members" value="1,091" />
        <Stat title="Trainer Utilization" value="87%" />
      </div>

      {/* ===== REPORT SECTIONS ===== */}
      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        <ReportCard
          title="Membership Distribution"
          description="Breakdown of active memberships by plan"
          rows={[
            { label: "Basic", value: "42%" },
            { label: "Pro", value: "38%" },
            { label: "Elite", value: "20%" },
          ]}
        />

        <ReportCard
          title="Revenue Summary"
          description="Monthly revenue sources"
          rows={[
            { label: "Memberships", value: "₹18.6L" },
            { label: "Personal Training", value: "₹6.4L" },
            { label: "Store Sales", value: "₹3.4L" },
          ]}
        />
      </div>

      {/* ===== DETAILED TABLE ===== */}
      <div className="bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="font-semibold tracking-wide">
            Monthly Performance Report
          </h3>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="text-left px-6 py-3">Month</th>
              <th>New Members</th>
              <th>Renewals</th>
              <th>Revenue</th>
              <th>Trainer Sessions</th>
            </tr>
          </thead>

          <tbody>
            <ReportRow
              month="September"
              newMembers="120"
              renewals="86"
              revenue="₹4.1L"
              sessions="780"
            />
            <ReportRow
              month="October"
              newMembers="154"
              renewals="112"
              revenue="₹4.6L"
              sessions="840"
            />
            <ReportRow
              month="November"
              newMembers="132"
              renewals="94"
              revenue="₹4.3L"
              sessions="810"
            />
          </tbody>
        </table>
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

function ReportRow({ month, newMembers, renewals, revenue, sessions }) {
  return (
    <tr className="border-t border-white/10 hover:bg-white/5">
      <td className="px-6 py-4 font-medium">{month}</td>
      <td className="text-center">{newMembers}</td>
      <td className="text-center">{renewals}</td>
      <td className="text-center font-semibold text-[#39ff14]">
        {revenue}
      </td>
      <td className="text-center">{sessions}</td>
    </tr>
  );
}

