import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layouts/MainLayout";
import AlbumPage from "./pages/albums/AlbumPage";

const App = () => {
  return (
    <Routes>
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback
            signUpForceRedirectUrl={"/auth-callback"}
          />
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums/:id" element={<AlbumPage />} />
      </Route>
    </Routes>
  );
};
export default App;
