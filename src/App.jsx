import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassSchedule from "./pages/member/ClassSchedule";
import MemberDashboard from "./pages/member/MemberDashboard";
import Nutrition from "./pages/member/Nutrition";
import Settings from "./pages/member/Settings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MemberDashboard />} />
        <Route path="/schedule" element={<ClassSchedule />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
