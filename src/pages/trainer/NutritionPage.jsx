import React from "react";
import { Link } from "react-router-dom";
import "./NutritionPage.css";

export default function NutritionPage() {
  const meals = [
    {
      name: "Breakfast",
      time: "08:00 AM",
      calories: "420 kcal",
      item: "Oatmeal with Blueberries",
      qty: "1 bowl (250g)",
      icon: "🍳",
    },
    {
      name: "Lunch",
      time: "01:30 PM",
      calories: "650 kcal",
      item: "Grilled Chicken Breast",
      qty: "200g",
      icon: "🍗",
    },
    {
      name: "Snacks",
      time: "05:00 PM",
      calories: "210 kcal",
      item: "Apple Slices",
      qty: "1 medium",
      icon: "🍎",
    },
    {
      name: "Dinner",
      time: "08:30 PM",
      calories: "510 kcal",
      item: "Salmon Fillet",
      qty: "100g",
      icon: "🐟",
    },
  ];

  const foodDatabase = [
    { name: "Greek Yogurt", cal: 59, prot: 10, carb: 4, fat: 0 },
    { name: "Avocado", cal: 160, prot: 2, carb: 9, fat: 15 },
    { name: "Quinoa (Cooked)", cal: 120, prot: 4, carb: 21, fat: 2 },
    { name: "Salmon Fillet", cal: 208, prot: 20, carb: 0, fat: 13 },
  ];

  return (
    <div className="trainer-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="brand">
          FitTrack <span>Pro</span>
        </h2>

        <div className="trainer-profile">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Trainer"
          />
          <p>Vikram Malhotra</p>
        </div>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/clients">Clients</Link>
          <Link to="/workout">Workout Plans</Link>
          <Link to="/nutrition" className="active">
            Nutrition
          </Link>
          <Link to="/schedule">Schedule</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="nutrition-page">
        {/* Header */}
        <div className="nutrition-header">
          <div>
            <h1>Nutrition Management</h1>
            <p>Client: Aisha Sharma</p>
          </div>

          <div className="header-actions">
            <div className="target">
              Daily Target <strong>1,850 kcal</strong>
            </div>
            <button className="save-btn">Save Plan</button>
          </div>
        </div>

        <div className="nutrition-body">
          {/* Meal Plan */}
          <section className="meal-plan">
            {meals.map((meal, i) => (
              <div className="meal-card" key={i}>
                <div className="meal-top">
                  <span className="meal-name">{meal.name}</span>
                  <span className="meal-time">{meal.time}</span>
                  <span className="meal-cal">{meal.calories}</span>
                </div>

                <div className="meal-item">
                  <span className="meal-icon">{meal.icon}</span>
                  <div>
                    <h4>{meal.item}</h4>
                    <p>{meal.qty}</p>
                  </div>
                </div>

                <button className="add-item">+ Add Item</button>
              </div>
            ))}
          </section>

          {/* Food Database */}
          <aside className="food-db">
            <h3>Food Database</h3>

            {foodDatabase.map((food, i) => (
              <div className="food-row" key={i}>
                <div>
                  <h4>{food.name}</h4>
                  <p>
                    {food.cal} CAL • {food.prot}g PRO • {food.carb}g CARB •{" "}
                    {food.fat}g FAT
                  </p>
                </div>
                <button className="add-food">Add</button>
              </div>
            ))}

            <button className="load-more">Load More</button>
          </aside>
        </div>
      </main>
    </div>
  );
}

