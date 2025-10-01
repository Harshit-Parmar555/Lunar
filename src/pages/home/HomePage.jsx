import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAuthStore from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayStore } from "@/stores/usePlayStore";
import SectionGrid from "./components/SectionGrid";
import FeaturedSection from "./components/FeaturedSection";

const HomePage = () => {
  const {
    trendingSongs,
    fetchTrendingSongs,
    fetchFeaturedSongs,
    isLoading,
    featuredSongs,
    fetchGetMadeForYouSongs,
    madeForYouSongs,
  } = useMusicStore();
  const { initializeQueue } = usePlayStore();
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("Good Morning");

  const updateGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  };

  useEffect(() => {
    updateGreeting();
  }, []);

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchGetMadeForYouSongs();
  }, [fetchFeaturedSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (trendingSongs.length > 0 && featuredSongs.length > 0) {
      const allSongs = [...featuredSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, featuredSongs, trendingSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-black">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-6">
            {greeting}
            {"  " + user?.username}
          </h1>
          <FeaturedSection />
          <div className="space-y-8">
            <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Made for you "
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
export default HomePage;
