import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Library, HomeIcon, Search } from "lucide-react";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton ";
import { useMusicStore } from "@/stores/useMusicStore";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const { isLoadingAlbums, fetchAlbums, albums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="h-full flex flex-col gap-2 pt-2">
      <div className="p-4 border-b border-zinc-800">
        <div className="space-y-2">
          <Link
            to={"/"}
            className="w-full flex items-center justify-start hover:bg-zinc-900 p-2 rounded-md gap-4 py-3"
          >
            <HomeIcon className="size-5 ml-2" />
            <span className="hidden md:inline ">Home</span>
          </Link>
          <Link
            to={"/playlist"}
            className="w-full flex items-center justify-start hover:bg-zinc-900 p-2 rounded-md gap-4 py-3"
          >
            <Library className="size-5 ml-2" />
            <span className="hidden md:inline ">PlayLists</span>
          </Link>
          <Link
            to={"/search"}
            className="w-full flex items-center justify-start hover:bg-zinc-900 p-2 rounded-md gap-4 py-3"
          >
            <Search className="size-5 ml-2" />
            <span className="hidden md:inline ">Search</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 rounded-lg">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2 p-2">
            {isLoadingAlbums ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album?._id}
                  className="p-2 hover:bg-zinc-900 rounded-md flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={album?.coverImage}
                    alt="Playlist img"
                    className="size-12 rounded-md flex-shrink-0 object-cover"
                  />

                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album?.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      Album • {album?.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default LeftSidebar;
