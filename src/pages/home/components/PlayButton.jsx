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
      className=" bottom-3 right-2 bg-zinc-200 hover:bg-zinc-400 hover:scale-105 transition-all"
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-3 text-black" />
      ) : (
        <Play className="size-3 text-black" />
      )}
    </Button>
  );
};
export default PlayButton;
