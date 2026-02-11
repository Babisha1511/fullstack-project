import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

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
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-wide">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          System overview, performance metrics, and management controls.
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Stat title="Total Members" value="1,248" />
        <Stat title="Active Trainers" value="38" />
        <Stat title="Monthly Revenue" value="₹4.6L" />
        <Stat title="Pending Renewals" value="57" />
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <Section title="Quick Actions">
        <div className="grid md:grid-cols-4 gap-6">
          <ActionCard
            title="Add Trainer"
            desc="Register new trainer"
            icon="🧑‍🏫"
            onClick={() => navigate("/admin/trainers")}
          />

          <ActionCard
            title="Add Member"
            desc="Create member account"
            icon="👤"
            onClick={() => navigate("/admin/clients")}
          />

          <ActionCard
            title="Manage Memberships"
            desc="Plans & renewals"
            icon="💳"
            onClick={() => navigate("/admin/membership")}
          />

          <ActionCard
            title="View Reports"
            desc="Revenue & usage"
            icon="📊"
            onClick={() => navigate("/admin/reports")}
          />
        </div>
      </Section>

      {/* ===== SYSTEM OVERVIEW ===== */}
      <Section title="System Overview">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* RECENT MEMBERS */}
          <div className="bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
            <HeaderRow title="Recent Members" />
            <Table>
              <Row name="Arjun Patel" role="Member" status="Active" />
              <Row name="Sneha Iyer" role="Member" status="Active" />
              <Row name="Rahul Mehta" role="Member" status="Pending" />
            </Table>
          </div>

          {/* RECENT TRAINERS */}
          <div className="bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
            <HeaderRow title="Trainer Activity" />
            <Table>
              <Row name="Alex Fit" role="Trainer" status="Active" />
              <Row name="Neha Sharma" role="Trainer" status="Active" />
              <Row name="Rohit Verma" role="Trainer" status="Inactive" />
            </Table>
          </div>
        </div>
      </Section>

      {/* ===== FINANCIAL SUMMARY ===== */}
      <Section title="Financial Summary">
        <div className="bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="text-left px-6 py-3">Transaction</th>
                <th>Date</th>
                <th>User</th>
                <th>Status</th>
                <th className="text-right px-6">Amount</th>
              </tr>
            </thead>
            <tbody>
              <PaymentRow
                txn="#TXN-8821"
                user="Karthik"
                status="Active"
                amount="₹12,000"
              />
              <PaymentRow
                txn="#TXN-8810"
                user="Membership Renewal"
                status="Pending"
                amount="₹2,000"
              />
              <PaymentRow
                txn="#TXN-8799"
                user="Store Purchase"
                status="Active"
                amount="₹1,200"
              />
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function Stat({ title, value }) {
  return (
    <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-[#39ff14]/40 transition">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h2 className="text-3xl font-bold text-[#39ff14]">{value}</h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-5 tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}

function ActionCard({ title, desc, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-black/60 backdrop-blur-lg border border-white/10
                 rounded-2xl p-6 hover:border-[#39ff14]/40
                 hover:scale-[1.02] transition cursor-pointer"
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h4 className="font-semibold text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-400">{desc}</p>
    </div>
  );
}

function HeaderRow({ title }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
      <h4 className="font-semibold">{title}</h4>
      <span className="text-xs text-gray-400 cursor-pointer hover:text-[#39ff14]">
        View All
      </span>
    </div>
  );
}

function Table({ children }) {
  return <div className="divide-y divide-white/10">{children}</div>;
}

function Row({ name, role, status }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 text-sm">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active:
      "bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14]/40",
    Pending: "bg-yellow-500/20 text-yellow-400",
    Inactive: "bg-gray-500/20 text-gray-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PaymentRow({ txn, user, status, amount }) {
  return (
    <tr className="border-t border-white/10 hover:bg-white/5 transition">
      <td className="px-6 py-4">{txn}</td>
      <td className="text-center text-gray-400">Today</td>
      <td className="text-center">{user}</td>
      <td className="text-center">
        <StatusBadge status={status} />
      </td>
      <td className="px-6 text-right font-semibold text-[#39ff14]">
        {amount}
      </td>
    </tr>
  );
}

