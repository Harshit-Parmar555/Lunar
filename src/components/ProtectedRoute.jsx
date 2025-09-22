import { Navigate } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <Loader className="text-emerald-600 animate-spin size-8" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
