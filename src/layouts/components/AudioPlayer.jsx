import { usePlayStore } from "@/stores/usePlayStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const prevSongRef = useRef(null);

  const { currentSong, isPlaying, playNext } = usePlayStore();

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    const isSongChange = prevSongRef.current !== currentSong?.url;
    if (isSongChange) {
      audio.src = currentSong?.url;

      audio.currentTime = 0;

      prevSongRef.current = currentSong?.url;

      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};
export default AudioPlayer;
