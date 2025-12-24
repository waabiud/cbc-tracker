import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

export default function ProtectedRoute({ children }) {
  const { user } = useUserContext();

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
