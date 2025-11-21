import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, User as UserIcon, Sparkles } from 'lucide-react';
import { authApi } from '../api/auth';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false); // New state for verification step
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    verificationCode: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await authApi.login({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        toast.success(`Bienvenido ${response.name}`);
        onAuthSuccess();
        // Reset form
        setFormData({ email: '', password: '', name: '', verificationCode: '' });
      } else {
        // Registration flow - two steps
        if (!verificationStep) {
          // Step 1: Send verification code
          await authApi.verifyEmail({ email: formData.email });
          toast.success('Código de verificación enviado a tu email');
          setVerificationStep(true);
        } else {
          // Step 2: Register with verification code
          await authApi.register({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            verificationCode: formData.verificationCode,
          });

          // After registration, login to get the token
          const loginResponse = await authApi.login({
            email: formData.email,
            password: formData.password,
          });

          localStorage.setItem('token', loginResponse.token);
          localStorage.setItem('user', JSON.stringify(loginResponse));
          toast.success('Cuenta creada exitosamente');
          onAuthSuccess();
          // Reset form
          setFormData({ email: '', password: '', name: '', verificationCode: '' });
          setVerificationStep(false);
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error en la autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md mx-auto pointer-events-auto"
              style={{ maxWidth: '400px' }}
            >
              {/* Glow effect - Subtle */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#00F0FF]/50 via-[#FF00FF]/50 to-[#CCFF00]/50 rounded-2xl blur-md opacity-75"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Modal content */}
              <div className="relative bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-6 sm:p-8">
                  {/* Title */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {isLogin ? 'Bienvenido de nuevo' : 'Crear cuenta'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {isLogin ? 'Ingresa a tu panel de control' : 'Únete a la experiencia Xuper'}
                    </p>
                  </div>

                  {/* Tab switcher */}
                  <div className="flex p-1 bg-[#111] border border-white/10 rounded-xl mb-8">
                    <button
                      onClick={() => { setIsLogin(true); setVerificationStep(false); }}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${isLogin
                        ? 'bg-white/10 text-white shadow-sm border border-white/5'
                        : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      Iniciar Sesión
                    </button>
                    <button
                      onClick={() => { setIsLogin(false); setVerificationStep(false); }}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${!isLogin
                        ? 'bg-white/10 text-white shadow-sm border border-white/5'
                        : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      Registrarse
                    </button>
                  </div>

                  {/* Custom styles for autofill */}
                  <style>{`
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover, 
                    input:-webkit-autofill:focus, 
                    input:-webkit-autofill:active{
                        -webkit-box-shadow: 0 0 0 30px #111 inset !important;
                        -webkit-text-fill-color: white !important;
                        transition: background-color 5000s ease-in-out 0s;
                    }
                  `}</style>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto pt-2">
                    <AnimatePresence mode='popLayout'>
                      {!isLogin && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="relative group mb-6">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors duration-300 z-10" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Nombre completo"
                              className="w-full pl-12 pr-4 h-12 bg-[#111] border border-white/10 rounded-xl text-white text-base placeholder-gray-500 focus:border-[#00F0FF]/50 focus:bg-[#161616] focus:outline-none transition-all duration-300 relative z-0"
                              required={!isLogin}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="relative group mb-6">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors duration-300 z-10" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        className="w-full pl-12 pr-4 h-12 bg-[#111] border border-white/10 rounded-xl text-white text-base placeholder-gray-500 focus:border-[#00F0FF]/50 focus:bg-[#161616] focus:outline-none transition-all duration-300 relative z-0"
                        required
                      />
                    </div>

                    <div className="relative group mb-6">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors duration-300 z-10" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        className="w-full pl-12 pr-12 h-12 bg-[#111] border border-white/10 rounded-xl text-white text-base placeholder-gray-500 focus:border-[#00F0FF]/50 focus:bg-[#161616] focus:outline-none transition-all duration-300 relative z-0"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors z-10"
                      >
                        {showPassword ?
                          <EyeOff className="w-4 h-4" /> :
                          <Eye className="w-4 h-4" />
                        }
                      </button>
                    </div>

                    <AnimatePresence mode='popLayout'>
                      {!isLogin && verificationStep && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <div className="relative group mt-6">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors duration-300" />
                            <input
                              type="text"
                              name="verificationCode"
                              value={formData.verificationCode}
                              onChange={handleChange}
                              placeholder="Código de verificación"
                              className="w-full pl-12 pr-4 h-12 bg-[#111] border border-white/10 rounded-xl text-white text-base placeholder-gray-500 focus:border-[#00F0FF]/50 focus:bg-[#161616] focus:outline-none transition-all duration-300"
                              required={!isLogin && verificationStep}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isLogin && (
                      <div className="flex justify-end -mt-1 mb-4">
                        <a href="#" className="text-sm font-medium text-[#00F0FF] hover:text-[#00c5d4] transition-colors duration-200">
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full relative group overflow-hidden rounded-xl p-[1px]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#CCFF00] opacity-100 transition-opacity" />
                        <div className="relative bg-black hover:bg-black/90 text-white py-4 rounded-[11px] transition-all flex items-center justify-center gap-2 font-medium text-base">
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              <span>
                                {isLogin ? 'Iniciar Sesión' : verificationStep ? 'Completar Registro' : 'Continuar'}
                              </span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
