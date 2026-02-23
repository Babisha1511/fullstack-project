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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      alert("Client email is required");
      return;
    }

    const normalizedEmail = formData.email.trim().toLowerCase();

    try {
      const response = await fetch(
        "http://localhost:1013/api/diets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberId: normalizedEmail,
            title: formData.goal,
            breakfast: formData.breakfast,
            lunch: formData.lunch,
            snacks: formData.snacks,
            dinner: formData.dinner,
            notes: formData.notes,
            foodItemIds: []
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save");
      }

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

    } catch (error) {
      console.error("Error saving nutrition plan:", error);
      alert("Error saving nutrition plan");
    }
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
        <Input
          label="Client Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="client@email.com"
          required
        />

        <Input
          label="Fitness Goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          placeholder="Weight loss / Muscle gain"
        />

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

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#39ff14] text-black font-semibold hover:opacity-90 transition"
        >
          Save Nutrition Plan
        </button>

        {success && (
          <p className="text-center text-green-400 text-sm">
            Nutrition plan saved successfully ✅
          </p>
        )}
      </form>
    </div>
  );
}

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
