import { useEffect, useState } from "react";
import { getAllPayments } from "../../api/paymentApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function StorePaymentAdmin() {

  /* ================= STATE ================= */

  const [transactions, setTransactions] = useState([]);

  /* ================= LOAD MEMBER ORDERS ================= */

  useEffect(() => {
  loadPayments();
}, []);

const loadPayments = async () => {
  try {
    const response = await getAllPayments();
    setTransactions(response.data || []);
  } catch (error) {
    console.error("Failed to load payments:", error);
  }
};

const handleExport = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Store & Payments Report", 14, 20);

  const tableColumn = [
    "Transaction ID",
    "User",
    "Type",
    "Products",
    "Mode",
    "Status",
    "Date",
    "Amount",
  ];

  const tableRows = [];

  transactions.forEach((t) => {
    const rowData = [
  t.id,
  t.user,
  t.type,
  t.products.join(", "),
  t.paymentMode,
  t.status,
  t.date,
  `Rs. ${Number(t.amount).toLocaleString("en-IN")}`,
];
    tableRows.push(rowData);
  });

 autoTable(doc, {
  head: [tableColumn],
  body: tableRows,
  startY: 30,

  styles: {
    fontSize: 8,
    cellPadding: 3,
  },

  columnStyles: {
    7: { 
      halign: "right",   // Amount column aligned right
      cellWidth: 25      // Increase width
    },
    3: {
      cellWidth: 35      // Products column wider
    }
  },

  headStyles: {
    fillColor: [57, 255, 20],  // Neon green header
    textColor: [0, 0, 0],
    fontStyle: "bold"
  }
});
  doc.save("Store_Payments_Report.pdf");
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
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">
            Store & Payments
          </h1>
          <p className="text-gray-400 mt-1">
            Track product sales, memberships, and transactions.
          </p>
        </div>

       <button
  onClick={handleExport}
  className="px-5 py-2 rounded-lg font-semibold transition"
  style={{
    backgroundColor: "#39ff14",
    color: "black",
    boxShadow: "0 0 20px rgba(57,255,20,0.4)",
  }}
>
  Export Report
</button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <Stat
          title="Total Transactions"
          value={transactions.length}
        />
        <Stat
  title="Completed Payments"
  value={transactions.filter(t => t.status === "PAID").length}
/>

<Stat
  title="Orders Placed (COD)"
  value={transactions.filter(t => t.status === "CREATED").length}
/>

<Stat
  title="Total Revenue"
  value={
    "₹" +
    transactions
      .filter(t => t.status === "PAID")
      .reduce((sum, t) => sum + Number(t.amount), 0)
  }
/>
      </div>

      {/* ================= TRANSACTIONS ================= */}
      <div className="bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="text-left px-6 py-3">Transaction ID</th>
              <th className="text-center">User</th>
              <th className="text-center">Type</th>
              <th className="text-center">Products</th>
              <th className="text-center">Payment Mode</th>
              <th className="text-center">Status</th>
              <th className="text-center">Date</th>
              <th className="text-right px-6">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="p-6 text-center text-gray-400"
                >
                  No transactions yet
                </td>
              </tr>
            )}

            {transactions.map((t, i) => (
              <PaymentRow
                key={i}
                id={t.id}
                user={t.user}
                type={t.type}
                products={t.products}
                mode={t.paymentMode}
                status={t.status}
                date={t.date}
                amount={`₹${t.amount}`}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ title, value }) {
  return (
    <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-[#39ff14]/40 transition">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h2 className="text-3xl font-bold text-[#39ff14]">
        {value}
      </h2>
    </div>
  );
}

function PaymentRow({
  id,
  user,
  type,
  products,
  mode,
  status,
  date,
  amount,
}) {

  const statusStyle = {
  PAID:
    "bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14]/40",
  CREATED:
    "bg-blue-500/20 text-blue-400 border border-blue-400/40",
};

  return (
    <tr className="border-t border-white/10 hover:bg-white/5 transition">
      <td className="px-6 py-4">{id}</td>

      <td className="text-center">{user}</td>

      <td className="text-center">{type}</td>

      <td className="text-center text-xs text-gray-300 max-w-xs">
        {products.join(", ")}
      </td>

      <td className="text-center text-gray-400">
        {mode}
      </td>

      <td className="text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs ${statusStyle[status]}`}
        >
          {status}
        </span>
      </td>

      <td className="text-center text-gray-400 text-xs">
        {date}
      </td>

      <td className="px-6 text-right font-semibold text-[#39ff14]">
        {amount}
      </td>
    </tr>
  );
}
