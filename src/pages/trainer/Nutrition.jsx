import React, { useState } from "react";

export default function Nutrition() {
  const [formData, setFormData] = useState({
    email: "",
    goal: "",
    breakfast: "",
    lunch: "",
    snacks: "",
    dinner: "",
    notes: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      alert("Client email is required");
      return;
    }

    // normalize email (IMPORTANT)
    const normalizedEmail = formData.email.trim().toLowerCase();

    const existingPlans =
      JSON.parse(localStorage.getItem("nutritionPlans")) || [];

    // replace plan if same email already exists
    const updatedPlans = existingPlans.filter(
      (plan) => plan.email !== normalizedEmail
    );

    updatedPlans.push({
      ...formData,
      email: normalizedEmail,
    });

    localStorage.setItem("nutritionPlans", JSON.stringify(updatedPlans));

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);

    setFormData({
      email: "",
      goal: "",
      breakfast: "",
      lunch: "",
      snacks: "",
      dinner: "",
      notes: "",
    });
  };

  return (
    <div
      className="min-h-screen text-white p-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.9)), url('https://t3.ftcdn.net/jpg/02/96/19/10/360_F_296191090_PGQXIC2Y8CCsrJ7fgCsDd8OuVN8uJtNY.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">
        🧑‍🏫 Trainer – Nutrition Plan
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg space-y-5"
      >
        {/* CLIENT EMAIL */}
        <Input
          label="Client Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="client@email.com"
          required
        />

        {/* GOAL */}
        <Input
          label="Fitness Goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          placeholder="Weight loss / Muscle gain"
        />

        {/* MEALS */}
        <Input
          label="Breakfast"
          name="breakfast"
          value={formData.breakfast}
          onChange={handleChange}
          placeholder="Oats, eggs, fruits"
        />

        <Input
          label="Lunch"
          name="lunch"
          value={formData.lunch}
          onChange={handleChange}
          placeholder="Rice, dal, vegetables"
        />

        <Input
          label="Snacks"
          name="snacks"
          value={formData.snacks}
          onChange={handleChange}
          placeholder="Nuts, fruits"
        />

        <Input
          label="Dinner"
          name="dinner"
          value={formData.dinner}
          onChange={handleChange}
          placeholder="Grilled chicken, salad"
        />

        {/* NOTES */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Trainer Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 rounded-lg bg-[#121212] border border-white/10 focus:outline-none"
            placeholder="Drink 3L water, avoid sugar..."
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#39ff14] text-black font-semibold hover:opacity-90 transition"
        >
          Save Nutrition Plan
        </button>

        {/* SUCCESS MESSAGE */}
        {success && (
          <p className="text-center text-green-400 text-sm">
            Nutrition plan saved successfully ✅
          </p>
        )}
      </form>
    </div>
  );
}

/* Reusable Input Component */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-300">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-3 rounded-lg bg-[#121212] border border-white/10 focus:outline-none"
      />
    </div>
  );
}
