import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";

const AuthCallbackPage = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const addUser = async () => {
      if (!isLoaded || !user) return;
      try {
        const response = await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstname: user.firstName,
          lastname: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log("Error adding user:", error);
      } finally {
        navigate("/");
      }
    };
    addUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold">Logging you in</h3>
          <p className="text-zinc-400 text-sm">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default AuthCallbackPage;
