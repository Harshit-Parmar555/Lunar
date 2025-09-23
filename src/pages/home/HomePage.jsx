import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useUser } from "@clerk/clerk-react";
import SectionGrid from "./components/SectionGrid";
import FeaturedSection from "./components/FeaturedSection";

const HomePage = () => {
  const { trendingSongs, fetchTrendingSongs, fetchFeaturedSongs, isLoading } =
    useMusicStore();

  const [greeting, setgreeting] = useState("Good Morning");
  const { user } = useUser();

  const updateGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setgreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setgreeting("Good Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setgreeting("Good Evening");
    } else {
      setgreeting("Good Night");
    }
  };

  useEffect(() => {
    updateGreeting();
  }, []);

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchTrendingSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            {greeting}
            {user?.firstName ? `, ${user.firstName}` : ""}!
          </h1>
          <FeaturedSection />
          <div className="space-y-8">
            <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
export default HomePage;
