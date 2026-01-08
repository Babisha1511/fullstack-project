import "./MemberDashboard.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MemberDashboard() {
  const weightData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [70, 68, 66, 65, 63],
        borderColor: "#fc6e20",
        backgroundColor: "rgba(252,110,32,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: false },
    },
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <h2>FitPortal</h2>
          <span>Member Dashboard</span>
        </div>

        <ul className="nav">
          <li className="active">Dashboard</li>
          <li>Schedule</li>
          <li>Workout Plans</li>
          <li>Diet Chart</li>
          <li>Stores & Payments</li>
          <li>Community</li>
        </ul>

        <div className="sidebar-bottom">
          <p>Settings</p>
          <p>Logout</p>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* HEADER */}
        <div className="top">
          <div className="user">
            <img src="https://i.pravatar.cc/100" alt="user" />
            <div>
              <h1>Welcome back, Arjun Sharma</h1>
              <p>Ready to crush your goals today?</p>
            </div>
          </div>

          <div className="info-cards">
            <div className="info">
              <p className="label">CURRENT BMI</p>
              <h3>24.5</h3>
              <span className="status normal">Normal</span>
            </div>

            <div className="info">
              <p className="label">MEMBERSHIP</p>
              <h3>Expires</h3>
              <span className="status expired">Dec 31, 2024</span>
            </div>
          </div>
        </div>

        {/* METRICS */}
        <div className="metrics">
          <div className="metric">
            <h2>450</h2>
            <p>Calories Burned</p>
            <div className="progress" style={{ width: "75%" }}></div>
          </div>

          <div className="metric">
            <h2>1.5 L</h2>
            <p>Water Intake</p>
            <div className="progress" style={{ width: "50%" }}></div>
          </div>

          <div className="metric">
            <h2>45 mins</h2>
            <p>Active Minutes</p>
            <div className="progress" style={{ width: "90%" }}></div>
          </div>
        </div>

        {/* WORKOUT + DIET */}
        <div className="grid-2">
          <div className="card workout-card">
            <div className="card-head">
              <h3>Daily Workout Routine</h3>
              <button>Start Workout</button>
            </div>

            <ul className="list workout-grid">
              <li>
                <span>Bench Press</span>
                <span>3 × 12</span>
              </li>
              <li>
                <span>Tricep Dips</span>
                <span>3 × 10</span>
              </li>
              <li>
                <span>Pushups</span>
                <span>Failure</span>
              </li>
              <li>
                <span>Squats</span>
                <span>3 × 15</span>
              </li>
            </ul>
          </div>

          <div className="card diet-card">
            <h3>Diet Chart</h3>
            <p className="sub">High Protein Day · 2400 kcal</p>

            <ul className="list">
              <li>
                <span>Breakfast</span>
                <span>450 kcal</span>
              </li>
              <li>
                <span>Lunch</span>
                <span>650 kcal</span>
              </li>
              <li>
                <span>Dinner</span>
                <span>550 kcal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="grid-2">
          <div className="card journey-card">
            <h3>Weight Loss Journey</h3>
            <Line data={weightData} options={chartOptions} />
          </div>

          <div className="card consistency-card">
            <h3>Consistency</h3>
            <p className="sub">Last 30 days workout attendance</p>
            <div className="chart"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
