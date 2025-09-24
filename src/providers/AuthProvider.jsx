import { axiosInstance } from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";



const updateAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const {checkAdmin} = useAuthStore();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = await getToken();
        updateAuthToken(token);
        if(token){
          await checkAdmin();
        }
      } catch (error) {
        updateAuthToken(null);
        console.error("Error during authentication:", error);
      }finally{
        setLoading(false);
      }
    };

    authenticate();
  }, [getToken,userId,checkAdmin]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="text-emerald-600 animate-spin" />
      </div>
    );
  }
  return <>{children}</>;
};
export default AuthProvider;
