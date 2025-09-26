import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/useAuthStore";

const Signup = () => {
  const { signup, signingIn } = useAuthStore();
  const handleSignup = async () => {
    try {
      await signup();
    } catch (error) {
      console.log("Signup error:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Sign Up
        </h2>
        <Button
          onClick={handleSignup}
          disabled={signingIn}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          {signingIn ? "Signing Up..." : "Sign Up with Google"}
        </Button>
      </div>
    </div>
  );
};
export default Signup;
