import { Link } from "react-router-dom";
import "./Nutrition.css";

export default function Nutrition() {
  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">
          FitTrack <span>Pro</span>
        </h2>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/schedule">Class Schedule</Link>
          <Link to="/nutrition" className="active">
            Nutrition
          </Link>
          <Link to="/progress">Progress</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="nutrition-main">
        {/* HEADER */}
        <header className="nutrition-header">
          <div className="user-info">
            <img
              src="https://i.pravatar.cc/120?img=12"
              alt="user"
            />
            <div>
              <h1>Marcus Aurelius</h1>
              <div className="tags">
                <span>Goal: Hypertrophy</span>
                <span>Status: Cutting Phase</span>
                <span>Member since 2022</span>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="btn-primary">+ Add Meal</button>
            <button className="btn-outline">Targets</button>
          </div>
        </header>

        {/* MACROS */}
        <section className="macro-grid">
          <div className="macro-card">
            <p>Daily Calories</p>
            <h2>2,100 / 2,400</h2>
            <small>300 kcal remaining</small>
          </div>

          <div className="macro-card">
            <p>Protein</p>
            <h2>180g / 200g</h2>
            <div className="bar">
              <span style={{ width: "90%" }} />
            </div>
          </div>

          <div className="macro-card">
            <p>Carbs</p>
            <h2>200g / 250g</h2>
            <div className="bar">
              <span style={{ width: "80%" }} />
            </div>
          </div>

          <div className="macro-card">
            <p>Fats</p>
            <h2>65g / 70g</h2>
            <div className="bar">
              <span style={{ width: "92%" }} />
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="nutrition-content">
          <div className="weekly card">
            <h3>Weekly Adherence</h3>
            <div className="days">
              <span>M</span><span>T</span><span>W</span>
              <span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
          </div>

          <div className="notes card">
            <h3>Trainer Notes</h3>

            <div className="note">
              💧
              <div>
                <strong>Hydration</strong>
                <p>Increase water intake to 4L daily.</p>
              </div>
            </div>

            <div className="note">
              💊
              <div>
                <strong>Supplements</strong>
                <p>Creatine post-workout with carbs.</p>
              </div>
            </div>

            <div className="note">
              🥦
              <div>
                <strong>Veggies</strong>
                <p>High fiber veggies at dinner.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MEAL LOG */}
        <section className="meal-log card">
          <h3>Today's Meal Log</h3>

          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Meal</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>08:00 AM</td>
                <td>Oatmeal & Whey</td>
                <td>450 kcal</td>
                <td>35g</td>
                <td>55g</td>
                <td>8g</td>
              </tr>
              <tr>
                <td>01:30 PM</td>
                <td>Chicken & Rice</td>
                <td>600 kcal</td>
                <td>55g</td>
                <td>65g</td>
                <td>12g</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
