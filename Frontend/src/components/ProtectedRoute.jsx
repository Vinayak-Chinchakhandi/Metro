import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const isAuthenticated = localStorage.getItem("adminAuth");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;

}

export default ProtectedRoute;