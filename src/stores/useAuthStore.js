import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  // State
  isLoggedIn: false,
  user: null,
  isAdmin: false,
  isLoading: true,
  isAdminLoading: false,

  // Actions
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),

  // Initialize auth state
  initializeAuth: (user, isLoaded) => {
    if (isLoaded) {
      set({
        isLoggedIn: !!user,
        user: user || null,
        isLoading: false,
      });
    }
  },

  // Reset auth state
  resetAuth: () =>
    set({
      isLoggedIn: false,
      user: null,
      isLoading: false,
    }),

  checkAdmin: async () => {
    set({ isAdminLoading: true });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response.data.admin });
    } catch (error) {
      set({ isAdmin: false, error: error.response.data.message });
    } finally {
      set({ isAdminLoading: false });
    }
  },
}));

export default useAuthStore;
