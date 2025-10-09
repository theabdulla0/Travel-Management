import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    toast.error("Please login to continue");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
