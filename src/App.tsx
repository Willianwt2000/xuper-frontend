import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { SocialProof } from "./components/SocialProof";
import { FooterCTA } from "./components/FooterCTA";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";
import { DownloadSection } from "./components/DownloadSection";
import { AdminPanel } from "./components/AdminPanel";

export default function App() {
  const navigate = useNavigate();

  const [,setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Detect auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsAuthenticated(true);
        setIsAdmin(user.role === "admin");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    navigate("/"); // regresar al home

    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setIsAdmin(user.role === "admin");
    }

    setTimeout(() => {
      document
        .getElementById("download-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0A]">
      <Header
        onAuthClick={() => navigate("/login")} // ABRE Login por ruta
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <main className="relative z-10">
        {isAdmin ? (
          <AdminPanel />
        ) : (
          <>
            <Hero
              onAuthClick={() => navigate("/login")}
              isAuthenticated={isAuthenticated}
            />

            {isAuthenticated && <DownloadSection />}

            <Features />
            <SocialProof />
            <FooterCTA
              onAuthClick={() => navigate("/signup")}
              isAuthenticated={isAuthenticated}
            />
          </>
        )}
      </main>

      <Footer />

      {/* RUTAS DEL MODAL */}
      <Routes>
        <Route
          path="/login"
          element={
            <AuthModal
              isOpen={true}
              onClose={() => navigate("/")}
              onAuthSuccess={handleAuthSuccess}
              initialMode="login"
            />
          }
        />

        <Route
          path="/signup"
          element={
            <AuthModal
              isOpen={true}
              onClose={() => navigate("/")}
              onAuthSuccess={handleAuthSuccess}
              initialMode="signup"
            />
          }
        />
      </Routes>

      <Toaster position="top-center" richColors />
    </div>
  );
}
