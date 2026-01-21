// AdminDashboard.jsx
import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">FitTrack Admin</h2>
        <ul>
          <li>🏠 Dashboard</li>
          <li>👥 Members</li>
          <li>💪 Trainers</li>
          <li>📅 Classes</li>
          <li>💳 Payments</li>
          <li>📦 Inventory</li>
          <li>📊 Reports</li>
          <li>⚙️ Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Top Navbar */}
        <header className="navbar">
          <input type="text" placeholder="Search..." />
          <div className="nav-icons">
            <span>🔔</span>
            <span>👤 Admin</span>
          </div>
        </header>

        {/* Dashboard Overview */}
        <section className="overview">
          <div className="card">Total Members: 320</div>
          <div className="card">Monthly Revenue: $12,400</div>
          <div className="card">Upcoming Renewals: 45</div>
          <div className="card">Trainer Ratio: 1:15</div>
        </section>

        {/* Charts Section */}
        <section className="charts">
          <div className="chart">📈 Revenue Growth (Line Chart)</div>
          <div className="chart">🥧 Membership Types (Pie Chart)</div>
          <div className="chart">📊 Class Attendance (Bar Chart)</div>
        </section>

        {/* Quick Actions */}
        <section className="actions">
          <button>Add New Member</button>
          <button>Schedule Class</button>
          <button>Generate Report</button>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
