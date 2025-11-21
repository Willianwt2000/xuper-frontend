import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export function SocialProof() {
  const testimonials = [
    {
      name: 'Alex Rivera',
      role: 'Early Adopter',
      text: 'XUPER ha revolucionado completamente mi flujo de trabajo. La velocidad y eficiencia son incomparables.',
      rating: 5,
    },
    {
      name: 'Morgan Chen',
      role: 'Tech Enthusiast',
      text: 'La interfaz futurista no es solo estética, es funcional. Cada detalle está pensado para el usuario avanzado.',
      rating: 5,
    },
    {
      name: 'Jordan Blake',
      role: 'Digital Nomad',
      text: 'Sincronización perfecta entre dispositivos. XUPER está siempre un paso adelante de la competencia.',
      rating: 5,
    },
  ];

  const partners = [
    'TECH VISION',
    'CYBER SPHERE',
    'NEURAL NET',
    'QUANTUM LABS',
    'DIGITAL FRONTIER',
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Partners section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-gray-400 mb-8 tracking-widest uppercase text-sm">
            Reconocidos por líderes de la industria
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="relative group"
              >
                <motion.div
                  className="text-xl tracking-widest bg-gradient-to-r from-[#00F0FF] to-[#FF00FF] bg-clip-text text-transparent opacity-60 group-hover:opacity-100 transition-opacity"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(0, 240, 255, 0)',
                      '0 0 20px rgba(0, 240, 255, 0.5)',
                      '0 0 10px rgba(0, 240, 255, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {partner}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#CCFF00] to-[#5D00FF] bg-clip-text text-transparent">
              Lo que dicen los usuarios avanzados
            </span>
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-xl border border-[#00F0FF]/20 rounded-2xl p-8">
                {/* Quote icon */}
                <motion.div
                  className="absolute top-6 right-6 opacity-10"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Quote className="w-16 h-16 text-[#00F0FF]" />
                </motion.div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-[#CCFF00] text-[#CCFF00]" />
                    </motion.div>
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 mb-6 relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="relative z-10">
                  <div className="text-white">{testimonial.name}</div>
                  <div className="text-sm text-[#00F0FF]">{testimonial.role}</div>
                </div>

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/0 via-[#FF00FF]/0 to-[#00F0FF]/0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
