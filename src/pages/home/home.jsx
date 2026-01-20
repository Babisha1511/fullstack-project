import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <h2 className="logo">FitTrack</h2>

        <ul className="nav-links">
          <li>Home</li>
          <li>Programs</li>
          <li>Trainers</li>
          <li>Membership</li>
          <li>Contact</li>
        </ul>

        <div className="nav-actions">
          <button className="login">Login</button>
          <button className="button-green">Sign Up</button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero">
        <h1>
          The Only Bad Workout <br />
          Is The One That <span>Didn’t Happen</span>
        </h1>

        <p className="hero-text">
          Manage workouts, track progress, and achieve your fitness goals using
          our smart gym management system.
        </p>

        <div className="hero-buttons">
          <button className="button-green">Start Training</button>
          <button className="button-outline">Explore Plans</button>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats-section">
        <div className="stat-box">
          <h3>500+</h3>
          <p>Active Members</p>
        </div>
        <div className="stat-box">
          <h3>30+</h3>
          <p>Certified Trainers</p>
        </div>
        <div className="stat-box">
          <h3>1200+</h3>
          <p>Workout Sessions</p>
        </div>
        <div className="stat-box">
          <h3>10+</h3>
          <p>Years Experience</p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <h2>Why Choose FitTrack?</h2>

        <div className="feature-cards">
          <div className="card">
            <h3>Workout Management</h3>
            <p>
              Create, assign, and track personalized workout routines for every
              member.
            </p>
          </div>

          <div className="card">
            <h3>Progress Tracking</h3>
            <p>
              Monitor body weight, strength levels, and fitness goals using
              smart analytics.
            </p>
          </div>

          <div className="card">
            <h3>Trainer Management</h3>
            <p>
              Connect members with certified trainers for expert guidance and
              supervision.
            </p>
          </div>

          <div className="card">
            <h3>Membership Plans</h3>
            <p>
              Manage monthly, quarterly, and yearly memberships easily.
            </p>
          </div>
        </div>
      </section>


      {/* ================= OUR TRAINERS ================= */}
      <section className="trainers">
        <div className="trainers-header">
          <h2>
            OUR <span>TRAINERS</span>
          </h2>
          <p>
            Our professional trainers are dedicated to guiding and motivating
            you throughout your fitness journey.
          </p>
        </div>

        <div className="trainers-grid">
          <div className="trainer-card">
            <img
              src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
              alt="Trainer"
            />
            <h3>John Doe</h3>
            <p>Strength & Conditioning Specialist</p>
          </div>

          <div className="trainer-card">
            <img
              src="https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg"
              alt="Trainer"
            />
            <h3>Sarah Lee</h3>
            <p>Weight Loss & Cardio Expert</p>
          </div>

          <div className="trainer-card">
            <img
              src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg"
              alt="Trainer"
            />
            <h3>Michael Smith</h3>
            <p>Personal Fitness Trainer</p>
          </div>
        </div>
      </section>
      {/* ================= OUR PROGRAMS ================= */}
<section className="programs">
  <div className="programs-header">
    <h2>
      OUR <span>PROGRAMS</span>
    </h2>
    <p>
      A variety of training programs designed for all fitness goals — from
      weight loss to strength building and flexibility enhancement.
    </p>
  </div>

  <div className="programs-grid">
    <div className="program-card">
      <h3>Personal Training</h3>
      <p>
        One‑on‑one coaching with certified trainers for customized workout
        plans and faster results.
      </p>
    </div>

    <div className="program-card">
      <h3>Strength Training</h3>
      <p>
        Focused sessions to build muscle mass and boost overall strength
        using weights and resistance machines.
      </p>
    </div>

    <div className="program-card">
      <h3>Group Fitness Classes</h3>
      <p>
        Energetic group workouts such as Zumba, HIIT, Functional & Core
        training to burn calories and stay motivated.
      </p>
    </div>

    <div className="program-card">
      <h3>Yoga & Flexibility</h3>
      <p>
        Yoga and Pilates classes to improve flexibility, balance, and
        mental well‑being.
      </p>
    </div>

    <div className="program-card">
      <h3>Cardio & Endurance</h3>
      <p>
        Dedicated cardio sessions including treadmills, cycling, and
        interval training to boost stamina and heart health.
      </p>
    </div>

    <div className="program-card">
      <h3>HIIT & Functional</h3>
      <p>
        High‑Intensity Interval Training and functional circuits for maximum
        calorie burn and full‑body conditioning.
      </p>
    </div>
  </div>
</section>


      {/* ================= MEMBERSHIP CTA ================= */}
      <section className="cta">
        <h2>Start Your Fitness Journey Today</h2>
        <p>
          Join FitTrack and experience a smarter way to manage your fitness and
          health.
        </p>
        <button className="button-green">Join Now</button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p>© 2026 FitTrack – Gym Management System</p>
      </footer>

    </div>
  );
}

