import { useEffect } from "react";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";

import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { Music, Album } from "lucide-react";
import { useMusicStore } from "@/stores/useMusicStore";
import useAuthStore from "@/stores/useAuthStore";

const AdminPage = () => {
  const { fetchSongs, fetchAlbums, fetchStats } = useMusicStore();
  const { isAdmin, isLoading } = useAuthStore();

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
    fetchStats();
  }, [fetchSongs, fetchAlbums, fetchStats]);

  if (!isAdmin) return <div className="text-white">Unauthorized</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8">
      <Header />
      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="size-4 mr-2" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700"
          >
            <Album className="size-4 mr-2" />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>

        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AdminPage;
