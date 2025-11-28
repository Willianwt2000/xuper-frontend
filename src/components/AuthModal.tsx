import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
  initialMode: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode }: AuthModalProps) {
  const navigate = useNavigate();

  // El modal arranca dependiendo de la ruta
  const [isLogin, setIsLogin] = useState(initialMode === "login");

  // Cambiar cuando cambie la ruta
  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="relative w-full max-w-md pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              {/* Glow */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#00F0FF]/50 via-[#FF00FF]/50 to-[#CCFF00]/50 rounded-2xl blur-md opacity-75"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Content */}
              <div className="relative bg-[#0a0a0a] rounded-xl border border-white/10 shadow-xl p-6 sm:p-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Titles */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {isLogin ? "Bienvenido" : "Crear Cuenta"}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {isLogin ? "Inicia sesión para continuar" : "Únete a la experiencia Xuper"}
                  </p>
                </div>

                {/* Switch Tabs */}
                <div className="flex p-1 bg-[#111] border border-white/10 rounded-xl mb-8">
                  <button
                    onClick={() => navigate("/login")}
                    className={`flex-1 py-2.5 text-sm rounded-lg transition-all ${isLogin ? "bg-white/10 text-white" : "text-gray-500"
                      }`}
                  >
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    className={`flex-1 py-2.5 text-sm rounded-lg transition-all ${!isLogin ? "bg-white/10 text-white" : "text-gray-500"
                      }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Forms */}
                {isLogin ? (
                  <LoginForm onAuthSuccess={onAuthSuccess} />
                ) : (
                  <SignupForm onAuthSuccess={onAuthSuccess} />
                )}

                {/* Link abajo */}
                <p className="text-white mt-4 text-center">
                  {isLogin ? (
                    <>
                      ¿No tienes cuenta?{" "}
                      <button className="text-blue-400 underline" onClick={() => navigate("/signup")}>
                        Regístrate aquí
                      </button>
                    </>
                  ) : (
                    <>
                      ¿Ya tienes cuenta?{" "}
                      <button className="text-blue-400 underline" onClick={() => navigate("/login")}>
                        Inicia sesión aquí
                      </button>
                    </>
                  )}
                </p>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
