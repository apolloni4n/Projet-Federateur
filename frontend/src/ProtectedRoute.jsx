import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  let storedRole = localStorage.getItem("role");
  if (storedRole !== role) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;