import { create } from "zustand";

export const usePlayStore = create((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  initializeQueue: (songs) => {
    set({
      queue: songs,
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
      currentSong: get().currentSong || songs[0],
    });
  },

  playAlbum: (songs, startIndex = 0) => {
    if (songs.length === 0) return;
    set({
      queue: songs,
      currentIndex: startIndex,
      currentSong: songs[startIndex],
      isPlaying: true,
    });
  },

  shuffleAlbum: (songs, startIndex = 0) => {
    if (songs.length === 0) return;
    const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
    set({
      queue: shuffledSongs,
      currentIndex: startIndex,
      currentSong: shuffledSongs[startIndex],
      isPlaying: true,
    });
  },

  setCurrentSong: (song) => {
    if (!song) return;
    const index = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: index !== -1 ? index : get().currentIndex,
    });
  },

  toggle: () => {
    const willStart = !get().isPlaying;
    set({ isPlaying: willStart });
  },

  playNext: () => {
    const { currentIndex, queue } = get();
    if (queue.length === 0) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      set({
        currentIndex: nextIndex,
        currentSong: queue[nextIndex],
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },

  playPrevious: () => {
    const { currentIndex, queue } = get();
    if (queue.length === 0) return;
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      set({
        currentIndex: prevIndex,
        currentSong: queue[prevIndex],
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },
}));
