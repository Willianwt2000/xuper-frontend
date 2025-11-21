import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SocialProof } from './components/SocialProof';
import { FooterCTA } from './components/FooterCTA';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { DownloadSection } from './components/DownloadSection';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in and if they're admin
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsAuthenticated(true);
        setIsAdmin(user.role === 'admin');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setIsAuthenticated(true);

    // Check if user is admin
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsAdmin(user.role === 'admin');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Scroll to download section
    setTimeout(() => {
      document.getElementById('download-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAdmin(false);
    window.location.reload(); // Reload to reset state
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0A]">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwRjBGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <Header
        onAuthClick={() => setIsAuthModalOpen(true)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <main className="relative z-10">
        {isAdmin ? (
          // Show admin panel for admin users
          <AdminPanel />
        ) : (
          // Show regular landing page for non-admin users
          <>
            <Hero onAuthClick={() => setIsAuthModalOpen(true)} isAuthenticated={isAuthenticated} />
            {isAuthenticated && <DownloadSection />}
            <Features />
            <SocialProof />
            <FooterCTA onAuthClick={() => setIsAuthModalOpen(true)} isAuthenticated={isAuthenticated} />
          </>
        )}
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      <Toaster position="top-center" richColors />
    </div>
  );
}
