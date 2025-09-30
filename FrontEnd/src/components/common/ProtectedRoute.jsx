import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    toast.error("Please login first");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
