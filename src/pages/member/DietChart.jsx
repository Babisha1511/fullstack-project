import { useState, useEffect } from "react";

export default function DietChart() {
  /* ========= NEW STATE (ONLY ADDITION) ========= */
  const [showNutritionPlan, setShowNutritionPlan] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);

  const userEmail = localStorage.getItem("userEmail");

  /* ========= LOAD TRAINER PLAN (ONLY ADDITION) ========= */
  useEffect(() => {
    const plans =
      JSON.parse(localStorage.getItem("nutritionPlans")) || [];

    const matched = plans.find(
      (p) =>
        p.email &&
        p.email.trim().toLowerCase() ===
          userEmail?.trim().toLowerCase()
    );

    setDietPlan(matched || null);
  }, [userEmail]);

  return (
    <div
      className="min-h-screen text-white p-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85)), url('https://t3.ftcdn.net/jpg/02/96/19/10/360_F_296191090_PGQXIC2Y8CCsrJ7fgCsDd8OuVN8uJtNY.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ================= HEADER ================= */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Diet Chart</h1>
          <p className="text-gray-400">
            Personalized nutrition plan to support your fitness goals.
          </p>
        </div>

        {/* ========= NEW BUTTON (ONLY ADDITION) ========= */}
        <button
          onClick={() => setShowNutritionPlan(true)}
          className="px-5 py-2 rounded-lg bg-[#39ff14] text-black font-semibold"
        >
          View Nutrition Plan
        </button>
      </div>

      {/* ================= SUMMARY CARDS (UNCHANGED) ================= */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Calories / Day", value: "2,200 kcal" },
          { label: "Protein", value: "140 g" },
          { label: "Carbs", value: "260 g" },
          { label: "Fats", value: "70 g" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#121212] border border-white/10 rounded-xl p-5"
          >
            <p className="text-xs text-gray-400 mb-1">{item.label}</p>
            <p className="text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* ================= DAILY MEALS (UNCHANGED) ================= */}
      <div className="grid lg:grid-cols-3 gap-8">
        <MealCard
          title="Breakfast"
          time="7:00 – 9:00 AM"
          items={[
            "Oats with skim milk",
            "Boiled eggs (2)",
            "Banana",
            "Green tea",
          ]}
        />

        <MealCard
          title="Lunch"
          time="1:00 – 2:30 PM"
          items={[
            "Grilled chicken breast",
            "Brown rice / chapati",
            "Mixed vegetable curry",
            "Curd",
          ]}
        />

        <MealCard
          title="Dinner"
          time="7:00 – 9:00 PM"
          items={[
            "Paneer / fish curry",
            "Steamed vegetables",
            "Small portion of rice",
            "Herbal tea",
          ]}
        />
      </div>

      {/* ================= NOTES (UNCHANGED) ================= */}
      <div className="mt-12 bg-[#0f0f0f] border border-white/10 rounded-xl p-6">
        <h3 className="font-semibold mb-2">Diet Tips</h3>
        <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
          <li>Drink at least 3 liters of water daily</li>
          <li>Avoid processed sugar and fried foods</li>
          <li>Eat every 3–4 hours for better metabolism</li>
          <li>Consult your trainer before making major changes</li>
        </ul>
      </div>

      {/* ================= SMALL NEW SCREEN (ONLY ADDITION) ================= */}
      {showNutritionPlan && (
        <div className="fixed inset-0 bg-black/60 z-40">
          <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0f0f0f] border-l border-white/10 p-6 z-50 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Nutrition Plan
              </h2>
              <button
                onClick={() => setShowNutritionPlan(false)}
                className="text-gray-400 hover:text-white"
              >
                ✖
              </button>
            </div>

            {!dietPlan && (
              <p className="text-gray-400 text-sm">
                No nutrition plan assigned yet.
              </p>
            )}

            {dietPlan && (
              <div className="space-y-3 text-sm">
                <PlanRow title="Breakfast" value={dietPlan.breakfast} />
                <PlanRow title="Lunch" value={dietPlan.lunch} />
                <PlanRow title="Snacks" value={dietPlan.snacks} />
                <PlanRow title="Dinner" value={dietPlan.dinner} />

                {dietPlan.notes && (
                  <p className="text-gray-300 mt-3">
                    <b>Trainer Notes:</b> {dietPlan.notes}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= REUSABLE COMPONENTS (UNCHANGED) ================= */

function MealCard({ title, time, items }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-xs text-gray-400">{time}</p>
      </div>

      <ul className="space-y-3 text-sm">
        {items.map((item, i) => {
          const checked = checkedItems[item];

          return (
            <li
              key={i}
              onClick={() => toggleItem(item)}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition
                ${
                  checked
                    ? "bg-[#39ff14]/20 text-[#39ff14]"
                    : "text-gray-300 hover:bg-white/5"
                }`}
            >
              <span
                className={`w-5 h-5 flex items-center justify-center rounded-full border
                  ${
                    checked
                      ? "bg-[#39ff14] border-[#39ff14] text-black"
                      : "border-gray-500"
                  }`}
              >
                {checked && "✓"}
              </span>
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PlanRow({ title, value }) {
  return (
    <div className="flex justify-between border-b border-white/10 py-2">
      <span className="text-gray-300">{title}</span>
      <span className="font-medium">
        {value || "Not specified"}
      </span>
    </div>
  );
}


