import { useState } from "react";
import { createOrder, verifyPayment } from "../../api/paymentApi";

export default function StorePayment() {

  /* ================= STATE ================= */

  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("All Products");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [itemToRemoveIndex, setItemToRemoveIndex] = useState(null);

  const [details, setDetails] = useState({
    name: "",
    address: "",
    phone: "",
    mode: "",
  });

  /* ================= CALCULATIONS ================= */

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const tax = Math.floor(subtotal * 0.18);
  const total = subtotal + tax;
  const quantity = cart.length;

  /* ================= CART LOGIC ================= */

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const confirmRemove = (index) => {
    setItemToRemoveIndex(index);
    setShowRemovePopup(true);
  };

  const removeItem = () => {
    setCart(cart.filter((_, i) => i !== itemToRemoveIndex));
    setItemToRemoveIndex(null);
    setShowRemovePopup(false);
  };

  /* ================= CHECKOUT ================= */

  const openCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    setShowPayment(true);
  };

  /* ================= CONFIRM PAYMENT ================= */

  const confirmPayment = async () => {
  if (!details.name || !details.address || !details.phone || !details.mode) {
    alert("Please fill all checkout details");
    return;
  }

  if (details.mode === "Cash") {
    alert("Cash selected. Order created without Razorpay.");
    await createOrder({
      userName: details.name,
      type: "Store Purchase",
      products: cart.map((c) => c.name),
      amount: total,
      paymentMode: details.mode
    });

    setCart([]);
    setShowPayment(false);
    setPaymentSuccess(true);
    return;
  }

  const requestData = {
    userName: details.name,
    type: "Store Purchase",
    products: cart.map((c) => c.name),
    amount: total,
    paymentMode: details.mode
  };

  try {
    const response = await createOrder(requestData);

    const { orderId, key, amount } = response.data;

    const options = {
      key: key,
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      name: "FitTrack Gym",
      description: "Payment Transaction",
      order_id: orderId,
      handler: async function (res) {
        await verifyPayment({
          orderId: orderId,
          paymentId: res.razorpay_payment_id
        });

        setCart([]);
        setShowPayment(false);
        setPaymentSuccess(true);
        setDetails({ name: "", address: "", phone: "", mode: "" });

        setTimeout(() => setPaymentSuccess(false), 3000);
      },
      prefill: {
        name: details.name,
        contact: details.phone
      },
      theme: {
        color: "#39ff14"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error("Payment failed:", error);
    alert("Payment failed. Try again.");
  }
};


  return (
    <div
      className="min-h-screen text-white flex"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url('https://t3.ftcdn.net/jpg/02/96/19/10/360_F_296191090_PGQXIC2Y8CCsrJ7fgCsDd8OuVN8uJtNY.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-1">Store & Payments</h1>
        <p className="text-gray-400 mb-6">
          Buy supplements, merchandise & manage membership
        </p>

        {/* CATEGORY TABS */}
        <div className="flex gap-4 mb-8">
          {["All Products", "Supplements", "Merchandise"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm ${
                activeTab === tab
                  ? "bg-white text-black font-semibold"
                  : "border border-white/20 text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* MEMBERSHIP */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 flex justify-between items-center mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
              Action Required
            </p>
            <h2 className="text-xl font-semibold mb-1">
              Annual Membership Renewal
            </h2>
            <p className="text-sm text-gray-400">
              Pro Athlete Plan expires in 5 days
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold">₹12,000</p>
            <button
              onClick={() => {
                setCart([membershipItem]);
                setShowPayment(true);
              }}
              className="bg-white text-black px-6 py-2 rounded-xl font-semibold"
            >
              Pay Now →
            </button>
          </div>
        </div>

        {/* PRODUCTS */}
        <h2 className="text-xl font-semibold mb-4">{activeTab}</h2>

        <div className="grid md:grid-cols-4 gap-6 mb-14">
          {products
            .filter(
              (p) =>
                activeTab === "All Products" ||
                p.category === activeTab
            )
            .map((p) => (
              <div
                key={p.name}
                className="bg-[#121212] border border-white/10 rounded-2xl p-4"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-40 w-full object-contain mb-4 rounded-xl bg-black"
                />
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{p.desc}</p>
                <p className="font-semibold mb-3">₹{p.price}</p>
                <button
                  onClick={() => addToCart(p)}
                  className="w-full border border-white/20 rounded-lg py-1 text-sm"
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </main>

      {/* ================= CART ================= */}
      <aside className="w-96 border-l border-white/10 p-6 hidden lg:block bg-black/80">
        <h2 className="text-xl font-semibold mb-6">Your Cart</h2>

        {cart.map((item, i) => (
          <div key={i} className="flex items-center gap-4 mb-5">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-contain bg-black rounded-lg"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm">{item.name}</p>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">₹{item.price}</p>
              <button
                onClick={() => confirmRemove(i)}
                className="text-xs text-red-400 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="border-t border-white/10 mt-6 pt-4 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Tax (18%)</span>
            <span>₹{tax}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={openCheckout}
            className="w-full bg-[#39ff14] text-black py-3 rounded-xl font-semibold"
          >
            🔒 Secure Checkout
          </button>
        </div>
      </aside>

      {/* ================= PAYMENT POPUP ================= */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#121212] p-6 rounded-xl w-96">
            <h3 className="text-lg font-semibold mb-4">Secure Checkout</h3>

            <input
              placeholder="Full Name"
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              value={details.name}
              onChange={(e) =>
                setDetails({ ...details, name: e.target.value })
              }
            />

            <input
              placeholder="Address"
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              value={details.address}
              onChange={(e) =>
                setDetails({ ...details, address: e.target.value })
              }
            />

            <input
              placeholder="Phone Number"
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              value={details.phone}
              onChange={(e) =>
                setDetails({ ...details, phone: e.target.value })
              }
            />

            <select
              className="w-full mb-3 px-3 py-2 bg-black border border-white/10 rounded"
              value={details.mode}
              onChange={(e) =>
                setDetails({ ...details, mode: e.target.value })
              }
            >
              <option value="">Select Transaction Mode</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
            </select>

            <div className="text-sm text-gray-400 mb-4">
              Quantity: <b>{quantity}</b> <br />
              Amount: <b>₹{total}</b>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmPayment}
                className="bg-[#39ff14] text-black px-4 py-2 rounded-lg font-semibold"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= REMOVE POPUP ================= */}
      {showRemovePopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#121212] p-6 rounded-xl w-80">
            <h3 className="text-lg font-semibold mb-3">Remove Item</h3>
            <p className="text-sm text-gray-400 mb-5">
              Remove <b>{cart[itemToRemoveIndex]?.name}</b> from cart?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowRemovePopup(false)}>
                Cancel
              </button>
              <button
                onClick={removeItem}
                className="bg-red-500 px-4 py-2 rounded-lg font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUCCESS ================= */}
      {paymentSuccess && (
        <div className="fixed bottom-6 right-6 bg-[#39ff14] text-black px-6 py-3 rounded-xl font-semibold">
          ✅ Order Created Successfully
        </div>
      )}
    </div>
  );
}

/* ================= DATA ================= */

const membershipItem = {
  name: "Annual Membership",
  desc: "Renewal – Ends Oct 2024",
  price: "12000",
  image: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
};

const products = [
  {
    name: "Whey Protein Isolate",
    desc: "High-protein muscle recovery supplement",
    price: "5200",
    category: "Supplements",
    image:
      "https://i.pinimg.com/1200x/90/7a/bc/907abc010a7b13bac2d18521a22af946.jpg",
  },
  {
    name: "Creatine Monohydrate",
    desc: "Improves strength & performance",
    price: "1500",
    category: "Supplements",
    image:
      "https://i.pinimg.com/736x/0a/65/68/0a65684f6adaa0dedbf16e8e237d170e.jpg",
  },
  {
    name: "Performance Gym Tee",
    desc: "Breathable workout t-shirt",
    price: "800",
    category: "Merchandise",
    image:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
  },
  {
    name: "Training Gym Bag",
    desc: "Spacious gym bag",
    price: "2200",
    category: "Merchandise",
    image:
      "https://i.pinimg.com/1200x/2a/f3/bc/2af3bcce624ecde6a0cb4a7329b03f35.jpg",
  },
];
