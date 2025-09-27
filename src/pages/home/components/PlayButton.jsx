import { Button } from "@/components/ui/button";
import { usePlayStore } from "@/stores/usePlayStore";
import { Play, Pause } from "lucide-react";
const PlayButton = ({ song }) => {
  const { currentSong, isPlaying, setCurrentSong, toggle } = usePlayStore();
  const isCurrentSong = currentSong?._id === song._id;
  const handlePlay = () => {
    if (isCurrentSong) {
      toggle();
    } else {
      setCurrentSong(song);
    }
  };
  return (
    <Button
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
				opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};
export default PlayButton;
