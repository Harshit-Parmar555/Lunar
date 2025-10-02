import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#111",
          color: "#fff",
          border: "1px solid #333",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.875rem",
          padding: "12px 16px",
        },
        success: {
          iconTheme: {
            primary: "#4ade80",
            secondary: "#000",
          },
        },
        error: {
          iconTheme: {
            primary: "#f87171",
            secondary: "#000",
          },
        },
      }}
    />
  </StrictMode>
);
