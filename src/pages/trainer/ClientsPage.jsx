import React from "react";
import "./ClientsPage.css";
import { FaSearch, FaChevronRight } from "react-icons/fa";

const clientsData = [
  {
    name: "Aisha Sharma",
    email: "aisha.s@email.com",
    plan: "Gold Annual",
    status: "ACTIVE",
    lastActivity: "Today",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Rohan Verma",
    email: "rohan.v@email.com",
    plan: "Silver Monthly",
    status: "ACTIVE",
    lastActivity: "2h ago",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Ananya Gupta",
    email: "ananya.g@email.com",
    plan: "Personal Training",
    status: "PAUSED",
    lastActivity: "1 week ago",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Vikram Singh",
    email: "vikram.s@email.com",
    plan: "Gold Annual",
    status: "INACTIVE",
    lastActivity: "3 weeks ago",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Sanya Malhotra",
    email: "sanya.m@email.com",
    plan: "Gold Monthly",
    status: "ACTIVE",
    lastActivity: "Yesterday",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Arjun Kapoor",
    email: "arjun.k@email.com",
    plan: "Basic Monthly",
    status: "ACTIVE",
    lastActivity: "4h ago",
    avatar: "https://i.pravatar.cc/100?img=6",
  },
  {
    name: "Ishita Roy",
    email: "ishita.r@email.com",
    plan: "Gold Quarterly",
    status: "PAUSED",
    lastActivity: "2 days ago",
    avatar: "https://i.pravatar.cc/100?img=7",
  },
  {
    name: "Kabir Bose",
    email: "kabir.b@email.com",
    plan: "Silver Monthly",
    status: "INACTIVE",
    lastActivity: "1 month ago",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
  {
    name: "Neha Patel",
    email: "neha.p@email.com",
    plan: "Personal Training",
    status: "ACTIVE",
    lastActivity: "Today",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
  {
    name: "Rahul Mehta",
    email: "rahul.m@email.com",
    plan: "Gold Monthly",
    status: "ACTIVE",
    lastActivity: "6h ago",
    avatar: "https://i.pravatar.cc/100?img=10",
  },
  {
    name: "Pooja Nair",
    email: "pooja.n@email.com",
    plan: "Silver Quarterly",
    status: "PAUSED",
    lastActivity: "5 days ago",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Kunal Arora",
    email: "kunal.a@email.com",
    plan: "Gold Annual",
    status: "ACTIVE",
    lastActivity: "Yesterday",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
];

export default function ClientsPage() {
  return (
    <div className="trainer-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
    <h2>
      FitTrack <span>Pro</span>
    </h2>
  </div>
        <div className="trainer-profile">
  <img
    src="https://previews.123rf.com/images/jalephoto/jalephoto1801/jalephoto180100358/93955675-handsome-personal-trainer-with-stopwatch-in-a-fitness-center-gym-standing-strong.jpg"
    alt="Trainer"
    className="trainer-img"
  />
  <p className="trainer-name">Vikram Malhotra</p>
</div>


        <nav>
          <a>Dashboard</a>
          <a className="active">Clients</a>
          <a>Workout Plans</a>
          <a>Nutrition</a>
          <a>Schedule</a>
        </nav>

        <div className="sidebar-bottom">
          <a>Settings</a>
          <a className="logout">Log Out</a>
        </div>
      </aside>
      {/* Main Content */}
      <main className="clients-main">
        <div className="header">
          <div>
            <h1>Clients Management</h1>
            <p>Manage and track your active workout trainees.</p>
          </div>

          <div className="search">
            <FaSearch />
            <input placeholder="Search clients..." />
          </div>
        </div>
        
          {/* ALL STATS IN ONE ROW */}
<div className="stats-row">

  <div className="radial-card"> 
    <svg viewBox="0 0 120 120" className="radial-chart"> 
      <circle className="bg" cx="60" cy="60" r="50" />
       <circle className="active" cx="60" cy="60" r="50" /> 
       <circle className="paused" cx="60" cy="60" r="50" /> 
       <circle className="inactive" cx="60" cy="60" r="50" />
        </svg> 
        
        <div className="radial-legend"> 
          <p><span className="dot green"></span> Active: 82</p>
           <p><span className="dot orange"></span> Paused: 18</p>
            <p><span className="dot red"></span> Inactive: 24</p> </div> </div>

        <div className="graph-card"> 
        <h3>Monthly Enrollment</h3>
         <svg viewBox="0 0 300 120" className="line-graph">
           <polyline points="10,90 60,70 110,75 160,55 210,65 260,30" fill="none" /> {[10, 60, 110, 160, 210, 260].map((x, i) => ( <circle key={i} cx={x} cy={[90,70,75,55,65,30][i]} r="4" /> ))} </svg>
            <div className="months"> 
              <span>Oct</span><span>Nov</span>
              <span>Dec</span> <span>Jan</span>
              <span>Feb</span><span>Mar</span> 
              </div> 
              </div> 
              

  {/* RETENTION CARD */}
  <div className="retention-card">
    <h3>Client Retention</h3>

    <div className="retention-value">
      <span className="percent">86%</span>
      <span className="label">Retention Rate</span>
    </div>

    <div className="retention-bar">
      <div className="retained"></div>
      <div className="churned"></div>
    </div>

    <div className="retention-info">
      <p><span className="dot green"></span> Retained: 107</p>
      <p><span className="dot red"></span> Churned: 17</p>
    </div>

    <p className="retention-note">
      👍 Retention improved compared to last month
    </p>
  </div>

</div>



        {/* Table */}
        <table className="clients-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Last Activity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clientsData.map((c, i) => (
              <tr key={i}>
                <td>
                  <div className="client-info">
                    <img src={c.avatar} alt={c.name} className="client-avatar" />
                    <div>
                      <p className="client-name">{c.name}</p>
                      <p className="client-email">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td>{c.plan}</td>
                <td>
                  <span className={`status ${c.status.toLowerCase()}`}>
                    {c.status}
                  </span>
                </td>
                <td>{c.lastActivity}</td>
                <td>
                  <button className="view-btn">View</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
