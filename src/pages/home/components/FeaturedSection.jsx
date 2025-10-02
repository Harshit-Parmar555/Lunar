import { useMusicStore } from "@/stores/useMusicStore";

import PlayButton from "./PlayButton";
const FeaturedSection = () => {
  const { featuredSongs } = useMusicStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center rounded-md overflow-hidden
         transition-colors group cursor-pointer relative pr-2"
        >
          <img
            src={song.coverImage}
            alt={song.title}
            className="w-16 sm:w-14 h-16 sm:h-14 object-cover flex-shrink-0"
          />
          <div className="flex-1 p-4 min-w-0">
            <p className="font-medium  truncate">{song.title}</p>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
          <PlayButton song={song} />
        </div>
      ))}
    </div>
  );
};
export default FeaturedSection;
