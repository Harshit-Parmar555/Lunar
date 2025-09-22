import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  // State
  isLoggedIn: false,
  user: null,
  isLoading: true,

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
}));

export default useAuthStore;
