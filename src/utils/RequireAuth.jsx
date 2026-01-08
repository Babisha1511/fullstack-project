import { Navigate } from "react-router-dom";
import { getToken, getRoleFromToken } from "./jwtUtils";

const RequireAuth = ({ children, allowedRoles }) => {
  const token = getToken();
  const role = getRoleFromToken();

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Logged in but role not allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
