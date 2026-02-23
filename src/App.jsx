import { Routes, Route, Navigate } from "react-router-dom";

/* ========= PUBLIC ========= */
import Home from "./pages/home/Home";
import Login from "./auth/Login";
import About from "./pages/about/About";

/* ========= PROTECTED ========= */
import ProtectedRoute from "./components/ProtectedRoute";

/* ========= MEMBER ========= */
import MemberLayout from "./pages/member/MemberLayout";
import MemberDashboard from "./pages/member/Dashboard";
import Schedule from "./pages/member/Schedule";
import WorkoutPlans from "./pages/member/WorkoutPlans";
import DietChart from "./pages/member/DietChart";
import StorePayment from "./pages/member/StorePayment";
import MemberCheckout from "./pages/member/MemberCheckout";
import MemberSettings from "./pages/member/Settings";

/* ========= TRAINER ========= */
import TrainerLayout from "./pages/trainer/TrainerLayout";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerClients from "./pages/trainer/Clients";
import Workout from "./pages/trainer/Workout";
import Nutrition from "./pages/trainer/Nutrition";
import ClassSchedule from "./pages/trainer/ClassSchedule";
import TrainerSettings from "./pages/trainer/TrainerSettings";

/* ========= ADMIN ========= */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TrainerManagement from "./pages/admin/TrainerManagement";
import ClientManagement from "./pages/admin/ClientManagement";
import Membership from "./pages/admin/Membership";
import Reports from "./pages/admin/Reports";
import StorePaymentAdmin from "./pages/admin/StorePaymentAdmin";
import Equipments from "./pages/admin/Equipments";
import AdminSettings from "./pages/admin/AdminSettings";

export default function App() {
  const role = localStorage.getItem("role"); // admin | trainer | member

  return (
    <Routes>

      {/* ===== PUBLIC ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />

      {/* ===== MEMBER ===== */}
      <Route
        path="/member"
        element={
          <ProtectedRoute allowedRole="member">
            <MemberLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<MemberDashboard />} />
        <Route path="schedule" element={<Schedule />} />

        {/* 🔥 IMPORTANT FIX */}
        <Route path="workouts" element={<WorkoutPlans />} />


        <Route path="diet" element={<DietChart />} />
        <Route path="store" element={<StorePayment />} />
        <Route path="checkout" element={<MemberCheckout />} />
        <Route path="settings" element={<MemberSettings />} />
      </Route>

      {/* ===== TRAINER ===== */}
      <Route
        path="/trainer"
        element={
          <ProtectedRoute allowedRole="trainer">
            <TrainerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<TrainerDashboard />} />
        <Route path="clients" element={<TrainerClients />} />
        <Route path="workout" element={<Workout />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="schedule" element={<ClassSchedule />} />
        <Route path="settings" element={<TrainerSettings />} />
      </Route>

      {/* ===== ADMIN ===== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="trainers" element={<TrainerManagement />} />
        <Route path="clients" element={<ClientManagement />} />
        <Route path="membership" element={<Membership />} />
        <Route path="reports" element={<Reports />} />
        <Route path="store" element={<StorePaymentAdmin />} />
        <Route path="equipments" element={<Equipments />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* ===== FALLBACK ===== */}
      <Route
        path="*"
        element={
          role ? (
            <Navigate to={`/${role}/dashboard`} replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

    </Routes>
  );
}
