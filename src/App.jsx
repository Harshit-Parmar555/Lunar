import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// pages
import Land from "./pages/auth/Land";
import HomePage from "./pages/home/HomePage";
import AlbumPage from "./pages/albums/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import Search from "./pages/search/Search";
import Playlists from "./pages/playlists/Playlists";
// layouts
import MainLayout from "./layouts/MainLayout";
// stores
import useAuthStore from "./stores/useAuthStore";
// guards
import { ProtectedRoute, PublicRoute } from "./guards/Guards";
// icons
import { Loader } from "lucide-react";

const App = () => {
  const { checkAuth, checkingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="text-white animate-spin" />
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
          <Route path="/search" element={<Search />} />
          <Route path="/playlist" element={<Playlists/>}/>
        </Route>
      </Routes>
    </>
  );
};
export default App;
