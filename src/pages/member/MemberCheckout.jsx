export default function MemberCheckout() {

  const handlePayment = () => {
    // GET EXISTING PAYMENTS
    const payments =
      JSON.parse(localStorage.getItem("payments")) || [];

    // CREATE NEW PAYMENT
    const newPayment = {
      id: "#TXN" + Math.floor(Math.random() * 100000),
      user: "Arjun Patel",
      type: "Membership",
      status: "Completed",
      amount: 12000,
      date: new Date().toISOString().split("T")[0],
    };

    // SAVE TO LOCAL STORAGE
    payments.push(newPayment);
    localStorage.setItem("payments", JSON.stringify(payments));

    alert("Payment Successful!");
  };

  return (
    <div
      className="min-h-screen text-white flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85)), url('https://t3.ftcdn.net/jpg/02/96/19/10/360_F_296191090_PGQXIC2Y8CCsrJ7fgCsDd8OuVN8uJtNY.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-black/70 border border-white/10 rounded-2xl p-10 w-[400px] text-center">
        <h1 className="text-2xl font-bold mb-4">
          Membership Checkout
        </h1>

        <p className="text-gray-400 mb-6">
          Get full gym access for 1 year
        </p>

        <div className="text-4xl font-bold text-[#39ff14] mb-8">
          ₹12,000
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3 rounded-lg font-semibold"
          style={{
            backgroundColor: "#39ff14",
            color: "black",
            boxShadow: "0 0 20px rgba(57,255,20,0.4)",
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
