import { useState, useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayStore } from "@/stores/usePlayStore";
import useAuthStore from "@/stores/useAuthStore";

import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Search = () => {
  const [query, setquery] = useState("");
  const { searchResults, searchSong, isLoading, error } = useMusicStore();
  const { initializeQueue, playAlbum } = usePlayStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        searchSong(query);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchSong, query]);

  useEffect(() => {
    if (searchResults?.length > 0) {
      initializeQueue(searchResults);
    }
  }, [searchResults, initializeQueue]);

  const handleSongClick = (song, index) => {
    if (searchResults?.length === 0) return;
    playAlbum(searchResults, index);
  };

  const handleInputChange = (e) => {
    setquery(e.target.value);
  };
  return (
    <div className="mb-8 px-4 bg-black h-[100vh] overflow-y-auto">
      <div className="sticky top-0 pb-4 z-20">
        <div className="p-8" />
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Looking for songs{user?.firstName ? `, ${user.firstName}` : ""}?
        </h2>
        <div className="flex items-center gap-2 mb-4 relative max-w-md mx-auto">
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="What do you want to play?"
            className="pl-10 pr-4 py-2 w-full text-white rounded-full"
          />
          <SearchIcon className="absolute left-3 text-white" />
        </div>
      </div>
      {error && (
        <div className="text-red-500 mb-4 text-lg text-center">{error}</div>
      )}
      <div className="w-full max-w-lg mx-auto">
        <ScrollArea className="w-full relative">
          {query && searchResults?.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div
                key={searchResults[0]._id}
                onClick={() => handleSongClick(searchResults[0], 0)}
                className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
                  hover:bg-blue-800/20 transition-colors cursor-pointer relative p-4 mt-4"
                style={{ height: "200px" }}
              >
                <img
                  src={searchResults[0].coverImage}
                  alt={searchResults[0].title}
                  className="w-40 h-40 object-cover flex-shrink-0"
                />
                <div className="flex-1 pl-6">
                  <p className="font-bold text-xl truncate">
                    {searchResults[0].title}
                  </p>
                  <p className="text-sm text-zinc-400 truncate">
                    {searchResults[0].artist}
                  </p>
                </div>
              </div>

              {searchResults?.slice(1).map((song, index) => (
                <div
                  key={song._id}
                  onClick={() => handleSongClick(song, index + 1)}
                  className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
                  hover:bg-zinc-700/50 transition-colors cursor-pointer relative p-2"
                >
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 p-4">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      {song.artist}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : !query && !isLoading ? (
            <div className="flex flex-col gap-4 mt-10">
              <div
                className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden relative p-4 mt-4 animate-pulse"
                style={{ height: "200px" }}
              >
                <div className="w-40 h-40 bg-zinc-800 flex-shrink-0" />
                <div className="flex-1 pl-6 space-y-2">
                  <div className="h-6 bg-zinc-800 rounded w-3/4" />
                  <div className="h-4 bg-zinc-800 rounded w-1/2" />
                </div>
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden relative p-2 animate-pulse"
                >
                  <div className="w-16 h-16 bg-zinc-800 flex-shrink-0" />
                  <div className="flex-1 p-4 space-y-2">
                    <div className="h-4 bg-zinc-800 rounded w-3/4" />
                    <div className="h-3 bg-zinc-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            query &&
            !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <h2 className="text-2xl font-semibold text-white">
                  Song not found
                </h2>
                <p className="text-neutral-400 max-w-md">
                  Looks like this track got lost in the shuffle. Search for
                  something else.
                </p>
              </div>
            )
          )}
          <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-16  pointer-events-none z-10"></div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default Search;
