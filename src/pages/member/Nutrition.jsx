import "./NutritionPage.css";
import { Link } from "react-router-dom";

export default function NutritionPage() {
  return (
    <div className="trainer-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="brand">FitTrack <span>Pro</span></h2>

        <div className="trainer-profile">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Trainer"
          />
          <p>Vikram Malhotra</p>
        </div>

        <nav>
          <Link>Dashboard</Link>
          <Link>Clients</Link>
          <Link>Workout Plans</Link>
          <Link className="active">Nutrition</Link>
          <Link>Schedule</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="nutrition-content">
        {/* Header */}
        <div className="nutrition-header">
          <Link className="back-link">← Back to Dashboard</Link>

          <div className="header-row">
            <div className="client-info">
              <img src="https://i.pravatar.cc/100?img=32" alt="Client" />
              <div>
                <h1>Nutrition Management</h1>
                <p>Client: Aisha Sharma</p>
              </div>
            </div>

            <div className="header-actions">
              <div className="daily-target">
                DAILY TARGET
                <strong>1,850 kcal</strong>
              </div>
              <button className="save-btn">Save Plan</button>
            </div>
          </div>
        </div>

        <div className="nutrition-layout">
          {/* Meal Plan */}
          <section className="meal-plan">
            {/* Breakfast */}
            <div className="meal-card">
              <div className="meal-header">
                <h3>Breakfast</h3>
                <span>08:00 AM · 420 kcal</span>
              </div>

              <div className="meal-item">
                <img src="https://img.icons8.com/color/48/oatmeal.png" />
                <div>
                  <h4>Oatmeal with Blueberries</h4>
                  <p>1 bowl (250g)</p>
                </div>
              </div>

              <button className="add-item">+ Add Item</button>
            </div>

            {/* Lunch */}
            <div className="meal-card">
              <div className="meal-header">
                <h3>Lunch</h3>
                <span>01:30 PM · 650 kcal</span>
              </div>

              <div className="meal-item">
                <img src="https://img.icons8.com/color/48/chicken.png" />
                <div>
                  <h4>Grilled Chicken Breast</h4>
                  <p>200g</p>
                </div>
              </div>

              <div className="meal-item">
                <img src="https://img.icons8.com/color/48/rice-bowl.png" />
                <div>
                  <h4>Brown Rice</h4>
                  <p>150g</p>
                </div>
              </div>

              <button className="add-item">+ Add Item</button>
            </div>

            {/* Snacks */}
            <div className="meal-card">
              <div className="meal-header">
                <h3>Snacks</h3>
                <span>05:00 PM · 210 kcal</span>
              </div>

              <div className="meal-item">
                <img src="https://img.icons8.com/color/48/apple.png" />
                <div>
                  <h4>Apple Slices</h4>
                  <p>1 medium</p>
                </div>
              </div>

              <button className="add-item">+ Add Item</button>
            </div>

            {/* Dinner */}
            <div className="meal-card">
              <div className="meal-header">
                <h3>Dinner</h3>
                <span>08:30 PM · 510 kcal</span>
              </div>

              <div className="meal-item">
                <img src="https://img.icons8.com/color/48/salmon.png" />
                <div>
                  <h4>Salmon Fillet</h4>
                  <p>100g</p>
                </div>
              </div>

              <button className="add-item">+ Add Item</button>
            </div>
          </section>

          {/* Food Database */}
          <aside className="food-db">
            <h3>Food Database</h3>

            <div className="food-item">
              <img src="https://img.icons8.com/color/48/yogurt.png" />
              <div>
                <h4>Greek Yogurt (Non-fat)</h4>
                <p>59 CAL · 10G PROT · 4G CARB · 0G FAT</p>
              </div>
            </div>

            <div className="food-item">
              <img src="https://img.icons8.com/color/48/avocado.png" />
              <div>
                <h4>Avocado</h4>
                <p>160 CAL · 2G PROT · 9G CARB · 15G FAT</p>
              </div>
            </div>

            <div className="food-item">
              <img src="https://img.icons8.com/color/48/quinoa.png" />
              <div>
                <h4>Quinoa (Cooked)</h4>
                <p>120 CAL · 4G PROT · 21G CARB · 2G FAT</p>
              </div>
            </div>

            <button className="load-more">Load More Items</button>
          </aside>
        </div>
      </main>
    </div>
  );
}
