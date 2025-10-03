import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Library } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton ";

const Playlists = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  return (
    <div className="flex-1 rounded-lg p-4 sm:px-32 pt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-white text-2xl px-2">
          <Library className="size-7 mr-2" />
          <span className=" md:inline">Playlist's</span>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
          {isLoading ? (
            <PlaylistSkeleton />
          ) : (
            albums?.map((album) => (
              <Link
                to={`/albums/${album._id}`}
                key={album._id}
                className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
              >
                <img
                  src={album.coverImage}
                  alt="Playlist img"
                  className="size-12 rounded-md flex-shrink-0 object-cover"
                />

                <div className="flex-1 min-w-0 md:block">
                  <p className="font-medium truncate">{album.title}</p>
                  <p className="text-sm text-zinc-400 truncate">
                    Album • {album.artist}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
export default Playlists;
