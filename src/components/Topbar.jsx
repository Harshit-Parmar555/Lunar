import { Link } from "react-router-dom";
import {
  SignedOut,
  SignedIn,
  UserButton,
  SignOutButton,
} from "@clerk/clerk-react";
import useAuthStore from "@/stores/useAuthStore";
import { Button } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
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
        {isAdmin && <Link to={"/admin"}>Admin Dashboard</Link>}

        <SignedIn>
          <SignOutButton>
            <Button variant={"secondary"} className="text-sm">
              Sign Out
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};
export default Topbar;
