import "./TrainerDashboard.css";

export default function TrainerDashboard() {
  return (
    
    <div className="trainer-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
    <h2>
      FitTrack <span>Pro</span>
    </h2>
  </div>
        <div className="profile">
          <img src="https://i.pravatar.cc/100?img=12" alt="trainer" />
          <h3>Vikram Malhotra</h3>
          <span>Senior Trainer</span>
        </div>

        <nav>
          <a className="active">Dashboard</a>
          <a>Clients</a>
          <a>Workout Plans</a>
          <a>Nutrition</a>
          <a>Schedule</a>
        </nav>

        <div className="sidebar-bottom">
          <a>Settings</a>
          <a className="logout">Log Out</a>
        </div>
      </aside>
      
      {/* Main */}
      <main className="main-content">
        {/* Header */}
        <div className="header">
          <div>
            <h1>Hello, Vikram</h1>
            <p>You have <b>5 sessions</b> scheduled for today.</p>
          </div>
          <button className="calendar-btn">📅 View Calendar</button>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="card">
            <p>Active Clients</p>
            <h2>24</h2>
            <span>+2 this week</span>
          </div>
          <div className="card">
            <p>Sessions Today</p>
            <h2>5 / 8</h2>
          </div>
          <div className="card">
            <p>Plans Pending</p>
            <h2>3</h2>
          </div>
          <div className="card">
            <p>Avg Rating</p>
            <h2>4.9 ⭐</h2>
          </div>
        </div>

        {/* Training Categories */}
        <h3 className="section-title">Training Categories</h3>

<div className="categories">
  <div className="cat-card">
    <span className="cat-title">🧘 Yoga & Pranayama</span>
    <p className="cat-desc">
      Improve flexibility, breathing control, and mental relaxation.
    </p>
  </div>

  <div className="cat-card">
    <span className="cat-title">🏋 Strength & Conditioning</span>
    <p className="cat-desc">
      Build strength, endurance, and overall physical performance.
    </p>
  </div>

  <div className="cat-card">
    <span className="cat-title">🤸 Functional Training</span>
    <p className="cat-desc">
      Enhance mobility, balance, and real-life movement efficiency.
    </p>
  </div>

  <div className="cat-card">
    <span className="cat-title">🔥 Weight Loss</span>
    <p className="cat-desc">
      Burn calories effectively with cardio and fat-loss workouts.
    </p>
  </div>

  <div className="cat-card">
    <span className="cat-title">💪 Muscle Building</span>
    <p className="cat-desc">
      Increase muscle mass with structured strength training plans.
    </p>
  </div>
</div>


        <h3 className="section-title">Quick Actions</h3>

<div className="actions">
  <div className="action-card workout">
    <div className="overlay">
      <h4>Create / Edit Workout Plans</h4>
      <p>Assign routines to clients</p>
    </div>
  </div>

  <div className="action-card nutrition">
    <div className="overlay">
      <h4>Create / Edit Nutrition Plans</h4>
      <p>Update diet charts</p>
    </div>
  </div>

  <div className="action-card availability">
    <div className="overlay">
      <h4>Manage Availability</h4>
      <p>Set your training hours</p>
    </div>
  </div>

  <div className="action-card progress">
    <div className="overlay">
      <h4>Log Client Progress</h4>
      <p>Track transformation</p>
    </div>
  </div>
</div>
        <h3 className="section-title">Assigned Clients</h3>

<div className="clients-table">
  <div className="clients-header">
    <span>Client</span>
    <span>Goal</span>
    <span>Progress</span>
    <span>Status</span>
    <span>Action</span>
  </div>

  {/* Client 1 */}
  <div className="client-row">
    <div className="client-info">
      <img src="https://randomuser.me/api/portraits/women/44.jpg" className="client-avatar" />
      <div>
        <p className="client-name">Aisha Sharma</p>
        <span className="client-sub">Last session: Yesterday</span>
      </div>
    </div>
    <span className="tag">Weight Loss</span>
    <div className="progress-box">
      <div className="progress-bar"><span style={{ width: "85%" }} /></div>
      <small>85%</small>
    </div>
    <span className="status active">Active</span>
    <button className="view-btn">View</button>
  </div>

  {/* Client 2 */}
  <div className="client-row">
    <div className="client-info">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" className="client-avatar" />
      <div>
        <p className="client-name">Kabir Khan</p>
        <span className="client-sub">Today 10:00 AM</span>
      </div>
    </div>
    <span className="tag">Muscle Building</span>
    <div className="progress-box">
      <div className="progress-bar"><span style={{ width: "60%" }} /></div>
      <small>60%</small>
    </div>
    <span className="status active">Active</span>
    <button className="view-btn">View</button>
  </div>

  {/* Client 3 */}
  <div className="client-row">
    <div className="client-info">
      <img src="https://randomuser.me/api/portraits/women/68.jpg" className="client-avatar" />
      <div>
        <p className="client-name">Diya Verma</p>
        <span className="client-sub">2 days ago</span>
      </div>
    </div>
    <span className="tag">Yoga & Pranayama</span>
    <div className="progress-box">
      <div className="progress-bar"><span style={{ width: "75%" }} /></div>
      <small>75%</small>
    </div>
    <span className="status active">Active</span>
    <button className="view-btn">View</button>
  </div>

  {/* Client 4 */}
  <div className="client-row">
    <div className="client-info">
      <img src="https://randomuser.me/api/portraits/men/45.jpg" className="client-avatar" />
      <div>
        <p className="client-name">Rohit Mehta</p>
        <span className="client-sub">Last session: Today</span>
      </div>
    </div>
    <span className="tag">Strength & Conditioning</span>
    <div className="progress-box">
      <div className="progress-bar"><span style={{ width: "70%" }} /></div>
      <small>70%</small>
    </div>
    <span className="status active">Active</span>
    <button className="view-btn">View</button>
  </div>

  {/* Client 5 */}
  <div className="client-row">
    <div className="client-info">
      <img src="https://randomuser.me/api/portraits/women/52.jpg" className="client-avatar" />
      <div>
        <p className="client-name">Sneha Iyer</p>
        <span className="client-sub">Last session: 3 days ago</span>
      </div>
    </div>
    <span className="tag">Functional Training</span>
    <div className="progress-box">
      <div className="progress-bar"><span style={{ width: "45%" }} /></div>
      <small>45%</small>
    </div>
    <span className="status paused">Paused</span>
    <button className="view-btn">View</button>
  </div>
</div>

 
      </main>
    </div>
  );
}
