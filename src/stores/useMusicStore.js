import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-hot-toast";

export const useMusicStore = create((set) => ({
  songs: [],
  albums: [],
  currentAlbum: null,
  featuredSongs: [],
  featuredAlbums: [],
  trendingSongs: [],
  madeForYouSongs: [],
  stats: {},
  isLoadingAlbums: false,
  isLoadingCurrentAlbum: false,
  isLoading: false,

  error: null,

  // fetching
  fetchAlbums: async () => {
    set({ isLoadingAlbums: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data.albums });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch albums",
      });
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
      set({ error: error?.response?.data?.message || "Failed to fetch album" });
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
      set({
        error:
          error?.response?.data?.message || "Failed to fetch featured songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums/featured");
      set({ featuredAlbums: response.data.albums });
    } catch (error) {
      set({
        error:
          error?.response?.data?.message || "Failed to fetch featured albums",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchGetMadeForYouSongs: async () => {
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data.songs });
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          "Failed to fetch made for you songs",
      });
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
      set({
        error:
          error?.response?.data?.message || "Failed to fetch trending songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async () => {
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to fetch stats" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSongs: async () => {
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data.songs });
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to fetch songs" });
    } finally {
      set({ isLoading: false });
    }
  },

  // uploading
  uploadSong: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/admin/add-song", formData);
      toast.success("Song uploaded successfully!");
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to upload song" });
    } finally {
      set({ isLoading: false });
    }
  },

  addAlbum: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/admin/add-album", formData);
      toast.success("Album uploaded successfully!");
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to add album" });
    } finally {
      set({ isLoading: false });
    }
  },

  // delete
  deleteSong: async (songId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(
        `/admin/delete-song/${songId}`
      );
      toast.success("Song deleted successfully!");
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to delete song" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAlbum: async (albumId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(
        `/admin/delete-album/${albumId}`
      );
      toast.success("Album deleted successfully!");
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to delete album",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
