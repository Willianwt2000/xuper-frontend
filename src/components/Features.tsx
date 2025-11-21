import { motion } from 'framer-motion';
import { Zap, Globe, Lock } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Conexión Instantánea',
      description: 'Sincronización de datos en tiempo real, siempre.',
      gradient: 'from-[#00F0FF] to-[#5D00FF]',
    },
    {
      icon: Globe,
      title: 'Acceso Global',
      description: 'Tu información disponible donde estés, cuando la necesites.',
      gradient: 'from-[#FF00FF] to-[#CCFF00]',
    },
    {
      icon: Lock,
      title: 'Seguridad Avanzada',
      description: 'Encriptación de última generación para tu tranquilidad.',
      gradient: 'from-[#CCFF00] to-[#00F0FF]',
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF00FF] bg-clip-text text-transparent">
              Características Clave
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Tecnología de vanguardia para una experiencia sin precedentes
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative h-full"
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500 rounded-2xl`}
              />

              {/* Card */}
              <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden flex flex-col">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]" />
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg shadow-black/50`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
