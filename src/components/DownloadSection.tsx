import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, CheckCircle2, Tv } from 'lucide-react';
import { contentApi } from '../api/content';
import { toast } from 'sonner';
import type { DownloadResponse } from '../types/api.types';

export function DownloadSection() {
  const [downloadLinks, setDownloadLinks] = useState<DownloadResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        setIsLoading(true);
        const data = await contentApi.getDownloads();
        setDownloadLinks(data);
      } catch (error) {
        console.error('Error fetching download links:', error);
        toast.error('Error al cargar los enlaces de descarga');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  const handleDownload = (type: 'mobile' | 'tv') => {
    if (!downloadLinks) {
      toast.error('Los enlaces de descarga no están disponibles');
      return;
    }

    // Corregido: xptv para mobile, xprtv para TV
    const url = type === 'mobile' ? downloadLinks.xptv : downloadLinks.xprtv;
    
    if (!url || url === '') {
      toast.error('URL de descarga no disponible');
      return;
    }

    const filename = type === 'mobile' ? 'xuper-mobile.apk' : 'xuper-tv.apk';

    // Método más compatible para descargas
    try {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      link.setAttribute('target', '_blank');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Descargando Xuper ${type === 'mobile' ? 'Mobile' : 'TV'}`);
    } catch (error) {
      console.error('Error downloading:', error);
      // Fallback: abrir en nueva pestaña
      window.open(url, '_blank');
      toast.info('Abriendo descarga en nueva pestaña');
    }
  };

  return (
    <section
      id="download-section"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 overflow-hidden scroll-mt-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, #00F0FF 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, #FF00FF 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, #CCFF00 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, #00F0FF 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-12"
        >
          {/* Success badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-[#CCFF00]/20 border border-[#CCFF00] rounded-full mb-4 md:mb-6"
            animate={{
              boxShadow: [
                '0 0 20px #CCFF00',
                '0 0 40px #CCFF00',
                '0 0 20px #CCFF00',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#CCFF00]" />
            <span className="text-sm md:text-base text-[#CCFF00] tracking-wide">Registro Exitoso</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-6xl mb-3 md:mb-4 px-4">
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#CCFF00] bg-clip-text text-transparent">
              ¡Felicidades, Usuario Xuper!
            </span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-white mb-2">
            Descarga Tu App Ahora
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">
            Tu acceso al futuro digital está listo. Descarga la aplicación XUPER y comienza tu experiencia transformadora.
          </p>
        </motion.div>

        {/* Download cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
        >
          {/* Mobile Download */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border-2 border-[#00F0FF]/30 overflow-hidden">
            <div className="relative z-10 text-center">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#00F0FF] to-[#FF00FF] rounded-2xl mb-4 md:mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </motion.div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Xuper Mobile</h3>
              <p className="text-gray-400 mb-4 md:mb-6 text-xs md:text-sm">Para tu dispositivo Android</p>

              <motion.button
                onClick={() => handleDownload('mobile')}
                className="relative group w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading || !downloadLinks}
              >
                <div className="relative px-5 md:px-6 py-3 md:py-4 bg-gradient-to-r from-[#00F0FF] to-[#FF00FF] rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="relative flex items-center justify-center gap-2 text-white font-bold tracking-wide text-sm md:text-base">
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                    {isLoading ? 'Cargando...' : 'Descargar APK'}
                  </span>
                </div>
              </motion.button>
            </div>
          </div>

          {/* TV Download */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border-2 border-[#FF00FF]/30 overflow-hidden">
            <div className="relative z-10 text-center">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#FF00FF] to-[#CCFF00] rounded-2xl mb-4 md:mb-6"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Tv className="w-8 h-8 md:w-10 md:h-10 text-black" />
              </motion.div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Xuper TV</h3>
              <p className="text-gray-400 mb-4 md:mb-6 text-xs md:text-sm">Para tu Android TV / Fire Stick</p>

              <motion.button
                onClick={() => handleDownload('tv')}
                className="relative group w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading || !downloadLinks}
              >
                <div className="relative px-5 md:px-6 py-3 md:py-4 bg-gradient-to-r from-[#FF00FF] to-[#CCFF00] rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="relative flex items-center justify-center gap-2 text-black font-bold tracking-wide text-sm md:text-base">
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                    {isLoading ? 'Cargando...' : 'Descargar APK'}
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Installation steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
        >
          {[
            { step: '1', text: 'Descarga el archivo APK', icon: Download },
            { step: '2', text: 'Permite instalación de fuentes desconocidas', icon: CheckCircle2 },
            { step: '3', text: 'Abre e instala XUPER', icon: Smartphone },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#00F0FF] to-[#FF00FF] rounded-lg mb-3 md:mb-4">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="text-xl md:text-2xl text-[#00F0FF] mb-2">Paso {item.step}</div>
              <p className="text-gray-300 text-xs md:text-sm">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}