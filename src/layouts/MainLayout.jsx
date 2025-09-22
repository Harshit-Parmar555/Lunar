import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";

const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="h-screen bg-black text-white flex flex-col gap-2">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 h-full overflow-hidden p-2"
      >
        <ResizablePanel
          defaultSize={isMobile ? 0 : 20}
          minSize={isMobile ? 0 : 15}
          maxSize={isMobile ? 0 : 30}
          className="border-r border-zinc-800 pr-2"
        >
          <LeftSidebar/>
        </ResizablePanel>

        <ResizableHandle />
        <ResizablePanel defaultSize={80} className="overflow-auto">
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
