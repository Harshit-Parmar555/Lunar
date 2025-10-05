import { useState, useEffect } from "react";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";
import useMobile from "./hooks/isMobile";
import {
  Home,
  Search,
  MessageCircle,
  Menu,
  X,
  User,
  Library,
  Laptop,
  Loader,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const MainLayout = () => {
  const { isMobile } = useMobile(768);
  const [menuOpen, setMenuOpen] = useState(false);

  if (isMobile === null) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-black">
        <Loader className="text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-dvh bg-black text-white flex flex-col overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 min-h-0 overflow-hidden"
      >
        {!isMobile && (
          <>
            <ResizablePanel
              defaultSize={20}
              minSize={15}
              maxSize={30}
              className="border-r border-zinc-800"
            >
              <LeftSidebar />
            </ResizablePanel>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
          </>
        )}

        <ResizablePanel
          defaultSize={isMobile ? 100 : 80}
          className="overflow-auto"
        >
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="flex-shrink-0">
        <PlaybackControls />
      </div>

      {isMobile && (
        <>
          <button
            className="fixed bottom-40 right-4 z-50 p-4 bg-white text-black rounded-full shadow-lg focus:outline-none cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <X size={20} className="text-black" />
            ) : (
              <Menu size={20} className="text-black" />
            )}
          </button>

          <motion.div
            className="fixed bottom-56 right-4 z-40 flex flex-col items-center space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: menuOpen ? 1 : 0,
              y: menuOpen ? 0 : 50,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {menuOpen && (
              <>
                {[
                  { to: "/", icon: <Home size={20} /> },
                  { to: "/search", icon: <Search size={20} /> },
                  { to: "/playlist", icon: <Library size={20} /> },
                ].map((item, index) => (
                  <motion.div
                    key={item.to}
                    className="p-3 bg-zinc-800 rounded-full hover:bg-emerald-900"
                    initial={{ opacity: 0, y: 50 * (index + 1) }}
                    animate={{
                      opacity: menuOpen ? 1 : 0,
                      y: menuOpen ? 0 : 50 * (index + 1),
                    }}
                    transition={{ delay: 0.1 * index, duration: 0.2 }}
                  >
                    <Link to={item.to} onClick={() => setMenuOpen(false)}>
                      {item.icon}
                    </Link>
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </>
      )}

      <AudioPlayer />
    </div>
  );
};

export default MainLayout;
