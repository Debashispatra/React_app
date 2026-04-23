import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role-based restriction
  if (allowedRoles && !allowedRoles.includes(user.roleName)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}