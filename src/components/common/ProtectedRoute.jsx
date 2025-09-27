import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
