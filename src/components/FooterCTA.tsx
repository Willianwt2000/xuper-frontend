import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FooterCTAProps {
  onAuthClick: () => void;
  isAuthenticated?: boolean;
}

export function FooterCTA({ onAuthClick, isAuthenticated }: FooterCTAProps) {
  // Don't show CTA if user is already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, #00F0FF 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, #FF00FF 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, #00F0FF 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ opacity: 0.1 }}
        />

        {/* Circuit pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNpcmN1aXQiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMiIgZmlsbD0iIzAwRjBGRiIvPjxsaW5lIHgxPSI0MCIgeTE9IjQwIiB4Mj0iODAiIHkyPSI0MCIgc3Ryb2tlPSIjMDBGMEZGIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4zIi8+PGxpbmUgeDE9IjQwIiB5MT0iNDAiIHgyPSI0MCIgeTI9IjgwIiBzdHJva2U9IiMwMEYwRkYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjY2lyY3VpdCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Title */}
          <motion.h2
            className="text-4xl md:text-6xl mb-6"
            animate={{
              textShadow: [
                '0 0 20px rgba(0, 240, 255, 0.3)',
                '0 0 40px rgba(255, 0, 255, 0.5)',
                '0 0 20px rgba(0, 240, 255, 0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#CCFF00] bg-clip-text text-transparent">
              Tu próxima evolución en el streaming
            </span>
            <br />
            <span className="text-white">te espera.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-12"
          >
            ¡Únete a Xuper hoy!
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-block"
          >
            <motion.button
              onClick={onAuthClick}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#CCFF00] rounded-2xl blur-xl"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative px-12 py-5 bg-gradient-to-r from-[#FF00FF] to-[#00F0FF] rounded-xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <span className="relative flex items-center gap-3 text-xl text-white tracking-wide">
                  Acceso Xuper / Registro
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </span>
              </div>
            </motion.button>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500 mt-8"
          >
            Regístrate en segundos. Sin tarjeta de crédito requerida.
          </motion.p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 border-2 border-[#00F0FF]/20 rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 border-2 border-[#FF00FF]/20 rounded-full" />
      </div>
    </section>
  );
}
