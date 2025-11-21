import { motion } from 'framer-motion';
import { Zap, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onAuthClick: () => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function Header({ onAuthClick, isAuthenticated, onLogout }: HeaderProps) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserName(user.name);
        } catch (error) {
          console.error('Error parsing user:', error);
        }
      }
    }
  }, [isAuthenticated]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#00F0FF]/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <Zap className="w-8 h-8 text-[#00F0FF]" fill="#00F0FF" />
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 10px #00F0FF',
                  '0 0 20px #00F0FF',
                  '0 0 10px #00F0FF',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-2xl tracking-tight bg-gradient-to-r from-[#00F0FF] to-[#FF00FF] bg-clip-text text-transparent">
            XUPER
          </span>
        </motion.div>

        {/* User Info or Auth Button */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2 md:gap-3">
            {/* User Info */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-[#00F0FF] to-[#FF00FF] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="hidden sm:block text-white font-medium text-sm md:text-base">{userName}</span>
            </div>

            {/* Logout Button */}
            <motion.button
              onClick={onLogout}
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF00FF]/50 text-white rounded-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-xs md:text-sm">Cerrar</span>
            </motion.button>
          </div>
        ) : (
          /* CTA Button */
          <motion.button
            onClick={onAuthClick}
            className="relative group overflow-hidden rounded-full p-[1px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF] to-[#00F0FF] opacity-100 transition-opacity" />
            <div className="relative bg-black hover:bg-black/90 text-white px-6 py-2 rounded-full transition-all flex items-center gap-2">
              <span className="font-medium text-sm md:text-base whitespace-nowrap">
                Acceder / Registro
              </span>
            </div>
          </motion.button>
        )}
      </div>
    </motion.header>
  );
}
