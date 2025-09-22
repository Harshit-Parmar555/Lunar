import { Navigate } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore";
import { Loader } from "lucide-react";

const PublicRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <Loader className="text-emerald-600 animate-spin size-8" />
      </div>
    );
  }

  // If user is logged in, redirect to home page
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If user is not logged in, show the public route (signup page)
  return children;
};

export default PublicRoute;
