import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  // State
  isAdmin: false,
  isLoading: false,
  error: null,

  checkAdmin: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response.data.admin });
    } catch (error) {
      set({ isAdmin: false, error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));

export default useAuthStore;
