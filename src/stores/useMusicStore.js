import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

export const useMusicStore = create((set) => ({
  songs: [],
  albums: [],
  currentAlbum: null,
  featuredSongs: [],
  trendingSongs : [],
  isLoadingAlbums: false,
  isLoadingCurrentAlbum: false,

  error: null,

  fetchAlbums: async () => {
    set({ isLoadingAlbums: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data.albums });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoadingAlbums: false });
    }
  },

  fetchAlbumById: async (albumId) => {
    set({ isLoadingCurrentAlbum: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${albumId}`);
      set({ currentAlbum: response.data.album });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoadingCurrentAlbum: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: response.data.songs });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: response.data.songs });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
