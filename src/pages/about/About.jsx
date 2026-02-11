import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ================= BACK TO HOME ================= */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          ← Back to Home
        </button>
      </div>

      {/* ================= HERO ================= */}
      <section
        className="relative bg-cover bg-center mt-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f')",
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <span className="inline-block mb-6 px-4 py-1 text-sm rounded-full bg-[#39F144]/20 text-[#39F144]">
            ⚡ Empowering Your Fitness Journey
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            More Than Just <br />
            <span className="text-[#39F144]">Management Software</span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-400">
            FitTrack is built to simplify gym management so owners, trainers,
            and members can focus on performance, progress, and results.
          </p>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-3">Our Core Values</h2>
        <p className="text-gray-400 mb-12">
          The principles that guide everything we build.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard
            title="Community First"
            desc="Creating strong bonds between members and trainers."
          />
          <ValueCard
            title="Data Driven"
            desc="Smart analytics to track performance and growth."
          />
          <ValueCard
            title="Health Focused"
            desc="Encouraging safe, sustainable, long-term fitness."
          />
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <div className="bg-[#151515] rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

          <div className="space-y-4 text-gray-400 text-sm">
            <p>
              <strong className="text-white">Address:</strong><br />
              FitTrack HQ, Mumbai, India
            </p>
            <p>
              <strong className="text-white">Email:</strong><br />
              support@fittrack.com
            </p>
            <p>
              <strong className="text-white">Phone:</strong><br />
              +91 12345 67890
            </p>
          </div>

          <div className="mt-6 h-48 bg-black/40 rounded-xl flex items-center justify-center text-gray-500">
            Map Preview
          </div>
        </div>

        <div className="bg-[#151515] rounded-2xl p-8">
          <form className="space-y-4">
            <input placeholder="First Name" className="input" />
            <input placeholder="Last Name" className="input" />
            <input placeholder="Email" className="input" />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="input"
            />

            <button className="w-full bg-[#39F144] text-black py-3 rounded-lg font-semibold hover:opacity-90">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          What People Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Testimonial
            name="Priya R."
            role="Member"
            text="FitTrack keeps my workouts and diet perfectly organized."
          />
          <Testimonial
            name="Rahul K."
            role="Trainer"
            text="Managing clients and schedules is effortless."
          />
          <Testimonial
            name="Sarah L."
            role="Athlete"
            text="The analytics keep me motivated every day."
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-[#151515] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">
              Ready to transform your gym?
            </h3>
            <p className="text-gray-400 text-sm">
              Join thousands already using FitTrack.
            </p>
          </div>

          <button className="bg-[#39F144] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90">
            Get Started
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 mt-16 text-center text-sm text-gray-500 py-6">
        © 2024 FitTrack. All rights reserved.
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ValueCard({ title, desc }) {
  return (
    <div className="bg-[#151515] p-6 rounded-xl">
      <h3 className="font-semibold mb-2 text-[#39F144]">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function Testimonial({ name, role, text }) {
  return (
    <div className="bg-[#151515] p-6 rounded-xl">
      <div className="text-[#39F144] mb-3">★★★★★</div>
      <p className="text-gray-300 text-sm mb-4">“{text}”</p>
      <p className="font-semibold">{name}</p>
      <p className="text-gray-400 text-xs">{role}</p>
    </div>
  );
}
