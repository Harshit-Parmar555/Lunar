import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Land from "./pages/auth/Land";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layouts/MainLayout";
import AlbumPage from "./pages/albums/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";

import useAuthStore from "./stores/useAuthStore";
import { Loader } from "lucide-react";
import { ProtectedRoute, PublicRoute } from "./guards/Guards";

const App = () => {
  const { checkAuth, checkingAuth, user, isAuthenticated } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Land />
            </PublicRoute>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/albums/:id" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
