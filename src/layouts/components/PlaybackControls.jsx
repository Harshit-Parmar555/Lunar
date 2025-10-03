import { useRef, useEffect, useState } from "react";
import { usePlayStore } from "@/stores/usePlayStore";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Mic2,
  Volume1,
  Laptop2,
  ListMusic,
} from "lucide-react";
import useMobile from "../hooks/isMobile";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaybackControls = () => {
  const { toggle, isPlaying, playNext, playPrevious, currentSong } =
    usePlayStore();

  const { isMobile } = useMobile(768);

  const [volume, setvolume] = useState(75);
  const [duration, setduration] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setcurrentTime(audio.currentTime);
    const updateDuration = () => setduration(audio.duration);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    const handleEnded = () => {
      usePlayStore.setState({ isPlaying: false });
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time[0];
    }
  };

  return (
    <>
      {!isMobile && (
        <>
          <footer className="h-20 sm:h-24 bg-zinc-950 border-t border-zinc-900 px-4">
            <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
              <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
                {currentSong && (
                  <>
                    <img
                      src={currentSong?.coverImage}
                      alt={currentSong?.title}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate hover:underline cursor-pointer">
                        {currentSong?.title}
                      </div>
                      <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                        {currentSong?.artist}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
                <div className="flex items-center gap-4 sm:gap-6">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hidden sm:inline-flex hover:text-white text-zinc-400"
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:text-white text-zinc-400"
                    onClick={playPrevious}
                    disabled={!currentSong}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8"
                    onClick={toggle}
                    disabled={!currentSong}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:text-white text-zinc-400"
                    onClick={playNext}
                    disabled={!currentSong}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hidden sm:inline-flex hover:text-white text-zinc-400"
                  >
                    <Repeat className="h-4 w-4" />
                  </Button>
                </div>

                <div className="hidden sm:flex items-center gap-2 w-full">
                  <div className="text-xs text-zinc-400">
                    {formatTime(currentTime)}
                  </div>
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    className="w-full hover:cursor-grab active:cursor-grabbing"
                    onValueChange={handleSeek}
                  />
                  <div className="text-xs text-zinc-400">
                    {formatTime(duration)}
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:text-white text-zinc-400"
                >
                  <Mic2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:text-white text-zinc-400"
                >
                  <ListMusic className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:text-white text-zinc-400"
                >
                  <Laptop2 className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:text-white text-zinc-400"
                  >
                    <Volume1 className="h-4 w-4" />
                  </Button>

                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    className="w-24 hover:cursor-grab active:cursor-grabbing"
                    onValueChange={(value) => {
                      setvolume(value[0]);
                      if (audioRef.current) {
                        audioRef.current.volume = value[0] / 100;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
      {isMobile && (
        <>
          <footer className="h-24 bg-zinc-900 border-t border-zinc-800 px-4 flex flex-col justify-center items-center">
            <div className="flex items-center gap-2 w-full">
              <div className="text-xs text-zinc-400">
                {formatTime(currentTime)}
              </div>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="flex-1 hover:cursor-grab active:cursor-grabbing"
                onValueChange={handleSeek}
              />
              <div className="text-xs text-zinc-400">
                {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center justify-between w-full px-2 mt-4">
              <div className="flex items-center gap-4">
                {currentSong && (
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-white overflow-hidden text-ellipsis whitespace-nowrap max-w-[12rem]">
                      {currentSong.title}
                    </div>
                    <div className="text-xs text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-[12rem]">
                      {currentSong.artist}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:text-white text-zinc-400"
                  onClick={playPrevious}
                  disabled={!currentSong}
                >
                  <SkipBack className="h-5 w-5" />
                </Button>

                <Button
                  size="icon"
                  className="bg-white hover:bg-white/80 text-black rounded-full h-10 w-10"
                  onClick={toggle}
                  disabled={!currentSong}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:text-white text-zinc-400"
                  onClick={playNext}
                  disabled={!currentSong}
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
};
export default PlaybackControls;
