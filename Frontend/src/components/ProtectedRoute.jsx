import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {

  const location = useLocation();

  const isAuthenticated = localStorage.getItem("adminAuth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;

}

export default ProtectedRoute;
