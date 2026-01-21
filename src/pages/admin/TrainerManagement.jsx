import "./TrainerManagement.css";

export default function TrainerManagement() {
  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">F</div>
          <div>
            <h3>FitAdmin</h3>
            <span>Management Console</span>
          </div>
        </div>

        <nav className="menu">
          <a>Dashboard</a>
          <a className="active">Trainers</a>
          <a>Clients</a>
          <a>Workouts</a>
          <a>Nutrition</a>
          <a>Settings</a>
        </nav>

        <div className="sidebar-footer">
          <strong>Admin User</strong>
          <span>admin@fitadmin.com</span>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Trainer Management</h1>
            <p>Manage your team, view schedules, and track performance.</p>
          </div>
          <button className="primary-btn">+ Add New Trainer</button>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="stat-card">
            <span>Total Trainers</span>
            <h2>12</h2>
          </div>
          <div className="stat-card">
            <span>Upcoming Sessions</span>
            <h2>45</h2>
          </div>
          <div className="stat-card">
            <span>Avg Rating</span>
            <h2>4.8 ⭐</h2>
          </div>
        </div>

        {/* SEARCH */}
        <div className="filters">
          <input placeholder="Search trainers by name or specialty..." />
          <button className="chip active">All</button>
          <button className="chip">Strength</button>
          <button className="chip">Yoga</button>
          <button className="chip">HIIT</button>
          <button className="chip">Nutrition</button>
        </div>

        {/* TRAINER GRID */}
        <div className="grid">
          <TrainerCard
            name="Alex Rivera"
            role="Senior Coach"
            tags={["HIIT", "Strength", "Nutrition"]}
            clients="24"
            rating="4.9"
          />

          <TrainerCard
            name="Sarah Chen"
            role="Yoga Specialist"
            tags={["Yoga", "Pilates", "Mindfulness"]}
            clients="18"
            rating="5.0"
          />

          <div className="add-card">
            <div>
              <span>+</span>
              <h4>Add New Trainer</h4>
              <p>Expand your team</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function TrainerCard({ name, role, tags, clients, rating }) {
  return (
    <div className="trainer-card">
      <div className="trainer-header">
        <div className="avatar" />
        <div>
          <h3>{name}</h3>
          <span>{role}</span>
        </div>
      </div>

      <div className="tags">
        {tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <div className="trainer-stats">
        <p>Clients: {clients}</p>
        <p>⭐ {rating}</p>
      </div>

      <div className="actions">
        <button className="outline-btn">View Profile</button>
        <button className="primary-btn">Manage Schedule</button>
      </div>
    </div>
  );
}
