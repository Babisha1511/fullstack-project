import React from "react";
import "./MemberDashboard.css";
import {
  FaFire,
  FaClock,
  FaWalking,
  FaDumbbell,
  FaTint,
  FaHeart,
} from "react-icons/fa";

const MemberDashboard = () => {
  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">
          FitTrack <span>Pro</span>
        </h2>

        <nav>
          <a className="active">Dashboard</a>
          <a>Schedule</a>
          <a>Nutrition</a>
          <a>Progress</a>
          <a>Settings</a>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* HEADER */}
        <header className="header">
          <div>
            <h1>Welcome back, Alex</h1>
            <p>Today’s Focus: Upper Body Strength</p>
          </div>
          <button className="btn-primary">Edit Focus</button>
        </header>

        {/* STATS */}
        <section className="stats">
          <div className="card">
            <FaFire className="icon green" />
            <h3>Calories Burned</h3>
            <p className="value">450 kcal</p>
            <span className="positive">+12% vs last week</span>
          </div>

          <div className="card">
            <FaClock className="icon blue" />
            <h3>Workout Duration</h3>
            <p className="value">45 min</p>
            <span className="positive">+5% vs yesterday</span>
          </div>

          <div className="card">
            <FaWalking className="icon yellow" />
            <h3>Steps Taken</h3>
            <p className="value">5,200</p>
            <span className="positive">+8% to goal</span>
          </div>

          <div className="card">
            <FaHeart className="icon red" />
            <h3>Heart Rate</h3>
            <p className="value">78 bpm</p>
            <span className="positive">Resting</span>
          </div>
        </section>

        {/* WORKOUT + SUMMARY */}
        <section className="workout">
          <div className="workout-card">
            <span className="tag">NEXT UP</span>
            <h2>Chest & Triceps</h2>
            <p>Focus on compound movements and hypertrophy.</p>

            <div className="workout-info">
              <div>
                <FaDumbbell /> 4 Sets
              </div>
              <div>
                <FaClock /> 45 Min
              </div>
            </div>

            <button className="btn-primary large">Start Workout</button>
          </div>

          <div className="card summary">
            <h3>Today Summary</h3>

            <div className="summary-item">
              <span>Workout Completed</span>
              <strong>1 / 2</strong>
            </div>

            <div className="summary-item">
              <span>Calories Remaining</span>
              <strong>650 kcal</strong>
            </div>

            <div className="summary-item">
              <span>Water Remaining</span>
              <strong>1.25 L</strong>
            </div>

            <button className="btn-outline">View Full Report</button>
          </div>
        </section>

        {/* NUTRITION + HYDRATION */}
        <section className="bottom">
          <div className="card nutrition">
            <h3>Nutrition Intake</h3>
            <p className="value">1,850 / 2,500 kcal</p>

            <div className="progress">
              <label>Protein</label>
              <div className="progress-bar protein"></div>

              <label>Carbs</label>
              <div className="progress-bar carbs"></div>

              <label>Fats</label>
              <div className="progress-bar fats"></div>
            </div>
          </div>

          <div className="card hydration">
            <FaTint className="icon green" />
            <h3>Hydration</h3>
            <p className="value">1,250 ml</p>
            <span>Daily Goal: 2500ml</span>
          </div>
        </section>

        {/* RECENT ACTIVITIES */}
        <section className="activities">
          <h2>Recent Activities</h2>

          <div className="activity-list">
            <div className="activity">
              <span>🏋️ Chest Workout</span>
              <span>45 min</span>
              <span>🔥 420 kcal</span>
            </div>

            <div className="activity">
              <span>🚶 Evening Walk</span>
              <span>30 min</span>
              <span>👣 3,200 steps</span>
            </div>

            <div className="activity">
              <span>🧘 Stretching</span>
              <span>15 min</span>
              <span>💆 Recovery</span>
            </div>
          </div>
        </section>
      </main>
    </div>
    
  );
};

export default MemberDashboard;
