import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionGridSkeleton from "../../../components/skeletons/SectionGridSkeleton";
import PlayButton from "./PlayButton";

const SectionGrid = ({ title, songs, isLoading }) => {
  if (isLoading) {
    return <SectionGridSkeleton />;
  }
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white"
        >
          <Link to="/playlist">Show all</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="p-4 rounded-md hover:bg-zinc-950 transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg">
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* <PlayButton song={song} /> */}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-2">
                <h3 className="font-medium truncate">{song.title}</h3>
                <p className="test-sm text-zinc-400 truncate">{song.artist}</p>
              </div>
              <PlayButton song={song} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SectionGrid;
