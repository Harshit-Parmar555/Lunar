import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

const updateAuthToken = async (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const { getToken, userId } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = await getToken();
        updateAuthToken(token);
      } catch (error) {
        console.log("Error in AuthProvider", error);
      } finally {
        setloading(false);
      }
    };
    authenticate();
  }, [getToken, userId]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="text-emerald-600 animate-spin" />
      </div>
    );
  }
  return <>{children}</>
};
export default AuthProvider;
