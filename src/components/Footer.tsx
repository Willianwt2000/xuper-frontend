import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail, Zap } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:magictv243@gmail.com', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Producto',
      links: ['Características', 'Precios', 'Actualizaciones', 'Beta'],
    },
    {
      title: 'Empresa',
      links: ['Sobre Nosotros', 'Blog', 'Carreras', 'Prensa'],
    },
    {
      title: 'Legal',
      links: ['Privacidad', 'Términos', 'Cookies', 'Licencias'],
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0a]">
      {/* Star field background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-8 h-8 text-[#00F0FF]" fill="#00F0FF" />
              <span className="text-2xl tracking-tight bg-gradient-to-r from-[#00F0FF] to-[#FF00FF] bg-clip-text text-transparent">
                XUPER
              </span>
            </motion.div>
            <p className="text-gray-400 text-sm mb-6">
              Transformando la interacción digital con tecnología de vanguardia.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white mb-4 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#00F0FF] transition-colors text-sm inline-block"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 XUPER. Todos los derechos reservados.
          </p>

          <div className="flex gap-6 text-sm">
            <motion.a
              href="#"
              className="text-gray-500 hover:text-[#00F0FF] transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Política de Privacidad
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-500 hover:text-[#00F0FF] transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Términos de Servicio
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-500 hover:text-[#00F0FF] transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Contacto
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
