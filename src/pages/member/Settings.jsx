import "./Settings.css";

export default function Settings() {
  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          Fit<span>Track</span>
        </div>

        <nav>
          <a>Dashboard</a>
          <a>Class Schedule</a>
          <a>Nutrition</a>
          <a>Progress</a>
          <a className="active">Settings</a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <header className="header">
          <div>
            <h1>Settings</h1>
            <p>Manage your account preferences</p>
          </div>
        </header>

        {/* PROFILE CARD */}
        <div className="card profile-card">
          <div className="profile">
            <img src="https://i.pravatar.cc/100?img=12" alt="profile" />
            <div>
              <h3>Alex Fit</h3>
              <p>alex.fit@example.com</p>
            </div>
          </div>

          <button className="btn-primary">Upload Photo</button>
        </div>

        {/* PERSONAL INFO */}
        <div className="card">
          <h3>Personal Information</h3>

          <div className="form-grid">
            <input placeholder="First Name" defaultValue="Alex" />
            <input placeholder="Last Name" defaultValue="Fit" />
            <input
              className="full"
              placeholder="Email"
              defaultValue="alex.fit@example.com"
            />
            <textarea
              className="full"
              placeholder="Bio"
              rows="3"
              defaultValue="HIIT & Strength trainer. Helping clients since 2018."
            />
          </div>
        </div>

        {/* PREFERENCES */}
        <div className="card">
          <h3>Preferences</h3>

          <div className="toggle">
            <span>Email Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>

          <div className="toggle">
            <span>Public Profile</span>
            <input type="checkbox" defaultChecked />
          </div>

          <div className="toggle">
            <span>Metric Units</span>
            <input type="checkbox" />
          </div>
        </div>

        <div className="actions">
          <button className="btn-outline">Cancel</button>
          <button className="btn-primary">Save Changes</button>
        </div>
      </main>
    </div>
  );
}
