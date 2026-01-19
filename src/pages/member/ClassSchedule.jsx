import { Link } from "react-router-dom";
import "./ClassSchedule.css";

export default function ClassSchedule() {
  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">
          FitTrack <span>Pro</span>
        </h2>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/schedule" className="active">
            Class Schedule
          </Link>
          <Link to="/nutrition">Nutrition</Link>
          <Link to="/progress">Progress</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="schedule-page">
        <main className="schedule-main">
          <h2>Weekly Schedule</h2>
          <p className="subtitle">
            Select a class to view details and book your spot.
          </p>

          <div className="days">
            {/* MONDAY */}
            <div className="day">
              <h4>MON 02</h4>

              <div className="class-card">
                <span className="time">07:00 AM · 60m</span>
                <h3>Yoga & Mindfulness</h3>
                <p>with Dr. Meera Singh</p>
                <div className="meta">Seats 10/20</div>
                <button>BOOK NOW</button>
              </div>

              <div className="class-card disabled">
                <span className="time">06:00 PM · 45m</span>
                <h3>High-Intensity Circuit</h3>
                <p>with Rajesh Patel</p>
                <div className="meta">Capacity FULL</div>
                <button disabled>JOIN WAITLIST</button>
              </div>
            </div>

            {/* TUESDAY */}
            <div className="day">
              <h4>TUE 03</h4>

              <div className="class-card active">
                <span className="time">08:00 AM</span>
                <h3>Dynamic Strength</h3>
                <p>with Anil Kumar</p>
                <div className="meta booked">Status BOOKED</div>
                <button className="outline">CANCEL</button>
              </div>
            </div>

            {/* WEDNESDAY */}
            <div className="day selected">
              <h4>WED 04</h4>

              <div className="class-card highlight">
                <span className="time">10:00 AM</span>
                <span className="badge">FILLING FAST</span>
                <h3>Zumba Bhangra Fusion</h3>
                <p>with Neha Sharma</p>
                <div className="meta">Seats 22/25</div>
                <button>BOOK NOW</button>
              </div>

              <div className="class-card muted">
                <span className="time">06:00 AM</span>
                <h3>Mind-Body Balance</h3>
                <p>with Vikram</p>
                <div className="meta passed">PASSED</div>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT DETAILS PANEL */}
        <aside className="details-panel">
          <div className="details-header">
            <span className="today">TODAY · 10:00 AM</span>
            <h2>Zumba Bhangra Fusion</h2>
          </div>

          <div className="instructor">
            <div className="avatar"></div>
            <div>
              <span>INSTRUCTOR</span>
              <h4>Neha Sharma</h4>
            </div>
          </div>

          <div className="stats">
            <div>
              <strong>60 min</strong>
              <span>Duration</span>
            </div>
            <div>
              <strong>High</strong>
              <span>Intensity</span>
            </div>
            <div>
              <strong>22/25</strong>
              <span>Seats</span>
            </div>
          </div>

          <div className="about">
            <h5>About this class</h5>
            <p>
              A high-energy dance workout that fuses traditional Bhangra moves
              with international beats. Designed to tone your entire body while
              boosting cardio endurance. Suitable for all fitness levels.
            </p>
          </div>

          <button className="confirm">Confirm Booking →</button>
          <small>Free cancellation up to 2 hours before class.</small>
        </aside>
      </div>
    </div>
  );
}
