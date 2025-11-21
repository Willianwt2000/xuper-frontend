import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onAuthClick: () => void;
  isAuthenticated?: boolean;
}

export function Hero({ onAuthClick, isAuthenticated }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00F0FF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          {/* Title with glitch effect */}
          <motion.h1
            className="relative mb-6"
            animate={{
              textShadow: [
                '0 0 20px #00F0FF',
                '0 0 40px #FF00FF',
                '0 0 20px #00F0FF',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="block text-5xl md:text-7xl tracking-tight mb-2">
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#CCFF00] bg-clip-text text-transparent">
                XUPER:
              </span>
            </span>
            <span className="block text-4xl md:text-6xl tracking-tight text-white">
              Tu Futuro Digital,{' '}
              <span className="bg-gradient-to-r from-[#CCFF00] to-[#5D00FF] bg-clip-text text-transparent">
                Ahora.
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Regístrate y accede al universo Xuper de películas y series ilimitadas.{' '}
            <span className="text-[#00F0FF]">Streaming instantáneo</span>, sin interrupciones, con la calidad de otro mundo.
          </motion.p>

          {/* CTA - Only show if not authenticated */}
          {!isAuthenticated && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  onClick={onAuthClick}
                  className="relative px-8 py-4 bg-gradient-to-r from-[#FF00FF] to-[#CCFF00] text-black overflow-hidden group"
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative z-10 flex items-center gap-2 tracking-wide">
                    <Sparkles className="w-5 h-5" />
                    Regístrate y Descarga el APK
                  </span>
                </motion.button>
              </motion.div>

              <motion.p
                className="text-sm text-gray-400 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Descarga inmediata después del registro.
              </motion.p>
            </>
          )}
        </motion.div>

        {/* Right content - Phone mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="relative">
            {/* Glowing ring */}
            <motion.div
              className="absolute inset-0 blur-3xl"
              animate={{
                background: [
                  'radial-gradient(circle, #00F0FF 0%, transparent 70%)',
                  'radial-gradient(circle, #FF00FF 0%, transparent 70%)',
                  'radial-gradient(circle, #CCFF00 0%, transparent 70%)',
                  'radial-gradient(circle, #00F0FF 0%, transparent 70%)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Phone container with holographic effect */}
            <motion.div
              className="relative z-10 w-[300px] h-[600px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[3rem] p-3 border-2 border-[#00F0FF]/30"
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              {/* Screen */}
              <div className="w-full h-full bg-gradient-to-br from-[#00F0FF]/10 to-[#FF00FF]/10 rounded-[2.5rem] overflow-hidden relative">
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQyIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEYwRkYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQyKSIvPjwvc3ZnPg==')] opacity-20" />

                {/* App UI mockup */}
                <div className="relative p-8 h-full flex flex-col justify-center items-center">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-[#00F0FF] to-[#FF00FF] rounded-2xl mb-6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="space-y-3 w-full">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="h-12 bg-white/10 rounded-lg backdrop-blur-sm border border-[#00F0FF]/30"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Wireframe corners */}
            <div className="absolute -inset-4 pointer-events-none">
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#CCFF00]" />
              <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#FF00FF]" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#00F0FF]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#5D00FF]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
