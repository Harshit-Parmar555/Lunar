import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import lunar from "@/assets/lunar.png";

const Navbar = () => {
  const { signup, signingIn } = useAuthStore();

  const handleSignup = async () => {
    try {
      await signup();
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <nav className="w-full h-20 flex items-center justify-between px-8 sm:px-16">
      <div className="flex items-center gap-2">
        <img src={lunar} alt="Lunar Logo" className="h-6 w-6 invert" />
        <h1 className="text-xl michroma font-medium mb-1">Lunar</h1>
      </div>
      <div>
        <Button
          onClick={handleSignup}
          disabled={signingIn}
          className="flex items-center text-white bg-transparent rounded-full border border-zinc-600 hover:bg-transparent py-3 gap-2"
        >
          <FaGoogle className="h-6 w-6" />
          <span>{signingIn ? "Signing In..." : "Sign In"}</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
