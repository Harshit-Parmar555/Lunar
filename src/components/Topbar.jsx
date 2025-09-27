import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useAuthStore from "@/stores/useAuthStore";

const Topbar = () => {
  const { isAdmin, logout } = useAuthStore();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    "
    >
      <div className="flex gap-2 items-center">
        {/* <img src="/spotify.png" className="size-8" alt="Spotify logo" /> */}
        Spotify
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <Button
          onClick={handleLogout}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
export default Topbar;
