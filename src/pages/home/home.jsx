import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-black text-white">

      
      <nav className="flex items-center justify-between px-10 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-[#39ff14] text-2xl">⬢</span>
          FitTrack
        </div>

        <ul className="hidden md:flex gap-8 text-sm text-gray-300">
          <li className="hover:text-white cursor-pointer">Home</li>
          <li className="hover:text-white cursor-pointer">Workouts</li>
          <li>
      <Link
        to="/about"
        className="hover:text-white cursor-pointer"
      >
        About
      </Link>
    </li>
          <li className="hover:text-white cursor-pointer">Community</li>
        </ul>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-gray-300 hover:text-white">
            Log In
          </Link>
          <Link
            to="/login"
            className="bg-[#39ff14] text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438')",
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-32 text-center">
          <div className="text-[#39ff14] text-5xl mb-6">❝</div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            The only bad workout <br />
            is the one that{" "}
            <span className="text-[#39ff14] italic">didn't happen</span>.
          </h1>

          <p className="mt-4 text-gray-400 text-sm tracking-widest">
            — UNKNOWN
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <Link
              to="/login"
              className="bg-[#39ff14] text-black px-8 py-3 rounded-full font-semibold hover:opacity-90"
            >
              Start Training →
            </Link>
            <Link
              to="/login"
              className="border border-white/30 px-8 py-3 rounded-full hover:bg-white/10"
            >
              Explore Plans
            </Link>
          </div>
        </div>
      </section>

      
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">
            More Than Just A Gym. <br /> We Are A Community.
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            At FitTrack, we believe fitness is not a destination, but a way of
            life. Our state-of-the-art facilities and world-class trainers are
            dedicated to helping you unlock your full potential.
          </p>

          <div className="flex gap-12 mt-10">
            <div>
              <h3 className="text-xl font-bold">24/7</h3>
              <p className="text-gray-400 text-xs">ACCESS</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">50+</h3>
              <p className="text-gray-400 text-xs">TRAINERS</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">100%</h3>
              <p className="text-gray-400 text-xs">DEDICATION</p>
            </div>
          </div>
        </div>

        <div className="bg-[#151515] rounded-2xl overflow-hidden">
          <img
            src="https://i.pinimg.com/1200x/88/d1/1a/88d11a3428462b2e143d8c4a28af7a60.jpg"
            alt="Trainer"
            className="w-full h-96 object-cover"
          />
          <div className="p-5">
            <h3 className="font-semibold text-lg">Find Your Strength</h3>
            <p className="text-[#39ff14] text-sm">Join the movement</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0d0d0d] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[#39ff14] text-sm tracking-widest mb-2">
            WHY CHOOSE US
          </p>
          <h2 className="text-3xl font-bold mb-14">
            Everything You Need to Succeed
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Equipment",
                desc: "Top-tier machines and free weights ensuring you have the best tools for every muscle group.",
              },
              {
                title: "Flexible Schedules",
                desc: "Classes that fit your busy life, from early morning yoga to late-night HIIT.",
              },
              {
                title: "Expert Coaching",
                desc: "Certified trainers ready to guide you, correct your form, and push your limits.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#151515] p-6 rounded-xl text-left border border-transparent hover:border-[#39ff14] transition"
              >
                <h3 className="font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 text-center px-6">
        <div className="text-[#39ff14] text-3xl mb-3">⬢</div>

        <h2 className="text-3xl font-bold mb-4">
          Visualize Your Success
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
          Our advanced tracking tools help you monitor your workouts, nutrition,
          and hydration. See your progress in real-time and stay motivated with
          detailed analytics.
        </p>

        <div className="flex justify-center gap-6 mt-10 flex-wrap">
          {["Weekly Reports", "Smart Goals", "Community"].map((item, i) => (
            <div
              key={i}
              className="bg-[#151515] px-8 py-4 rounded-xl text-sm"
            >
              {item}
            </div>
          ))}
        </div>

        <Link
          to="/login"
          className="inline-block mt-10 bg-[#39ff14] text-black px-10 py-3 rounded-full font-semibold hover:opacity-90"
        >
          View Dashboard Demo
        </Link>
      </section>
      <footer className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © 2024 FitTrack. All rights reserved.
      </footer>
    </div>
  );
}