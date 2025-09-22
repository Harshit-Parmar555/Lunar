import { useState, useEffect, use } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";

const updateAuthToken = async (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const { getToken, userId, isLoaded: authLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const { initializeAuth, resetAuth } = useAuthStore();
  const { isAdmin, checkAdmin } = useAuthStore();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = await getToken();
        updateAuthToken(token);
        if(token){
          await checkAdmin();
        }
      } catch (error) {
        console.log("Error in AuthProvider", error);
      } finally {
        setloading(false);
      }
    };

    if (authLoaded) {
      authenticate();
    }
  }, [getToken, userId, authLoaded]);

  useEffect(() => {
    if (authLoaded && userLoaded) {
      if (isSignedIn && user) {
        initializeAuth(user, true);
      } else {
        resetAuth();
      }
    }
  }, [user, authLoaded, userLoaded, isSignedIn, initializeAuth, resetAuth]);

  if (loading || !authLoaded || !userLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="text-emerald-600 animate-spin" />
      </div>
    );
  }
  return <>{children}</>;
};
export default AuthProvider;
