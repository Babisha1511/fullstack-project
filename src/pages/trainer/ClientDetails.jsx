import "./ClientDetails.css";
import { Link } from "react-router-dom";

export default function ClientDetails() {
  return (
    <div className="client-page">
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
          
          <a className="logout">Log Out</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="client-content">
        <Link className="back-link">← Back to Dashboard</Link>

        {/* Header */}
        <div className="client-header">
          <div className="client-profile">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Client"
            />
            <div>
              <h1>Aisha Sharma</h1>
              <p>Weight Loss Program · Joined Jan 2024</p>
            </div>
          </div>

          <div className="status">
            <span className="active">● Active Member</span>
            <p>Last visit: Yesterday</p>
          </div>
        </div>

        {/* Cards */}
        <div className="card-grid">
          <div className="card">
            <h3>Personal Information</h3>
            <p><b>Full Name:</b> Aisha Sharma</p>
            <p><b>DOB:</b> 14 Aug 1995 (28 yrs)</p>
            <p><b>Gender:</b> Female</p>
            <p><b>Emergency:</b> Raj Sharma</p>
          </div>

          <div className="card">
            <h3>Contact Details</h3>
            <p>📞 +91 99887 76655</p>
            <p>✉ aisha.sharma@email.com</p>
            <p>📍 New Delhi, India</p>
          </div>

          <div className="card highlight">
            <h3>Membership</h3>
            <p><b>Package:</b> Gold Premium</p>
            <p><b>Trainer:</b> Vikram</p>
            <p className="expiry">290 days left</p>
          </div>
        </div>

        {/* Workout */}
        <div className="workout-card">
          <h3>Today’s Workout</h3>

          <div className="progress">
            <span>60% Completed</span>
            <div className="bar">
              <div className="fill"></div>
            </div>
          </div>

          <ul>
            <li>✔ Warm-up: Treadmill Run</li>
            <li>✔ Barbell Squats</li>
            <li>✔ Push-ups</li>
            <li>⏳ Plank</li>
          </ul>
        </div>
        {/* Workout Items */}
<div className="workout-item done">
  <div className="workout-left">
    <span className="check">✓</span>
    <div>
      <h4>Warm-up: Treadmill Run</h4>
      <p>10 mins • Low Intensity</p>
    </div>
  </div>
  <span className="status done">Done</span>
</div>

<div className="workout-item done">
  <div className="workout-left">
    <span className="check">✓</span>
    <div>
      <h4>Barbell Squats</h4>
      <p>3 Sets • 12 Reps • 40kg</p>
    </div>
  </div>
  <span className="status done">Done</span>
</div>

<div className="workout-item done">
  <div className="workout-left">
    <span className="check">✓</span>
    <div>
      <h4>Push-ups</h4>
      <p>3 Sets • 15 Reps</p>
    </div>
  </div>
  <span className="status done">Done</span>
</div>

<div className="workout-item pending">
  <div className="workout-left">
    <span className="circle"></span>
    <div>
      <h4>Plank Hold</h4>
      <p>3 Rounds • 45 sec</p>
    </div>
  </div>
  <span className="status pending">Pending</span>
</div>

<div className="workout-item pending">
  <div className="workout-left">
    <span className="circle"></span>
    <div>
      <h4>Dumbbell Shoulder Press</h4>
      <p>3 Sets • 10 Reps • 12kg</p>
    </div>
  </div>
  <span className="status pending">Pending</span>
</div>

<div className="workout-item pending">
  <div className="workout-left">
    <span className="circle"></span>
    <div>
      <h4>Stationary Cycling</h4>
      <p>15 mins • Moderate Intensity</p>
    </div>
  </div>
  <span className="status pending">Pending</span>
</div>

<div className="workout-item pending">
  <div className="workout-left">
    <span className="circle"></span>
    <div>
      <h4>Cooldown Stretching</h4>
      <p>8 mins • Full Body</p>
    </div>
  </div>
  <span className="status pending">Pending</span>
</div>

        {/* Attendance Log */}
<div className="attendance-card">
  <div className="attendance-header">
    <h3>Attendance Log</h3>

    <div className="month-selector">
      <button>‹</button>
      <span>March 2024</span>
      <button>›</button>
    </div>
  </div>

  <div className="calendar">
    <div className="weekdays">
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
    </div>

    <div className="days">
      <span></span>
      <span></span>
      <span className="present">4</span>
      <span className="present">5</span>
      <span className="absent">6</span>
      <span className="present">7</span>
      <span className="present">8</span>

      <span>9</span>
      <span className="present">10</span>
      <span className="present">11</span>
      <span className="present">12</span>
      <span className="absent">13</span>
      <span className="present active">15</span>
      <span>16</span>
    </div>
  </div>

  <div className="legend">
    <span><i className="dot present"></i> Present</span>
    <span><i className="dot absent"></i> Absent</span>
    <span><i className="dot active"></i> Today</span>
  </div>
</div>


      </main>
    </div>
  );
}
