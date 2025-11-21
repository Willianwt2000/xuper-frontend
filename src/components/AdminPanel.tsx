import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, CheckCircle, XCircle, Calendar, Download } from 'lucide-react';
import { adminApi } from '../api/admin';
import { toast } from 'sonner';
import type { User } from '../types/api.types';

// --- Sub-componentes ---

const StatusBadge = ({ verified }: { verified: boolean }) => (
  verified ? (
    <div className="flex items-center gap-2 text-[#CCFF00] bg-[#CCFF00]/10 px-3 py-1 rounded-full w-fit">
      <CheckCircle className="w-4 h-4" />
      <span className="text-sm font-medium">Verificado</span>
    </div>
  ) : (
    <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-3 py-1 rounded-full w-fit">
      <XCircle className="w-4 h-4" />
      <span className="text-sm">Pendiente</span>
    </div>
  )
);

const RoleBadge = ({ role }: { role: string }) => (
  <span
    className={`
      inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold 
      ${role === "admin"
        ? "!bg-[#ff00ff33] !text-[#ff66ff]"
        : "!bg-[#00f0ff33] !text-[#00f0ff]"
      }
      !opacity-100 !text-opacity-100 
      [filter:none] 
      [backdrop-filter:none]
      [mix-blend-mode:normal]
      !z-50
    `}
    style={{
      opacity: 1,
      filter: "none",
      mixBlendMode: "normal",
      color: role === "admin" ? "#ff66ff" : "#00f0ff",
    }}
  >
    {role === "admin" ? "Admin" : "Usuario"}
  </span>
);


// --- Componente Principal ---

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminApi.getUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error('Error al cargar usuarios');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Fecha inválida';
    }
  };

  const verifiedCount = users.filter((u) => u?.verified).length;
  const adminCount = users.filter((u) => u?.role === 'admin').length;

  return (
    <section className="relative py-10 sm:py-16 md:py-20 px-4 sm:px-6 min-h-screen">

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00F0FF] to-[#FF00FF] rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl">
              <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF00FF] bg-clip-text text-transparent">
                Panel de Administración
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Gestiona todos los usuarios de Xuper</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Total */}
          <motion.div className="bg-[#111] border border-[#00F0FF]/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-[#00F0FF]" />
              <span className="text-3xl font-bold text-white">{users.length}</span>
            </div>
            <p className="text-gray-400">Total Usuarios</p>
          </motion.div>

          {/* Verificados */}
          <motion.div
            className="bg-[#111] border border-[#CCFF00]/40 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-[#CCFF00]" />
              <span className="text-3xl font-bold text-white">{verifiedCount}</span>
            </div>
            <p className="text-gray-400">Usuarios Verificados</p>
          </motion.div>




          {/* Admins */}
          <motion.div className="bg-[#111] border border-[#FF00FF]/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-8 h-8 text-[#FF00FF]" />
              <span className="text-3xl font-bold text-white">{adminCount}</span>
            </div>
            <p className="text-gray-400">Administradores</p>
          </motion.div>
        </div>

        {/* Users List */}
        <motion.div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {!isMobile ? (
                // DESKTOP TABLE
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-6 text-gray-400">Usuario</th>
                        <th className="text-left p-6 text-gray-400">Email</th>
                        <th className="text-left p-6 text-gray-400">Estado</th>
                        <th className="text-left p-6 text-gray-400">Rol</th>
                        <th className="text-left p-6 text-gray-400">Descargas</th>
                        <th className="text-left p-6 text-gray-400">Registro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, i) => (
                        <motion.tr
                          key={user._id || i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5"
                        >
                          <td className="p-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#00F0FF] to-[#FF00FF] rounded-lg flex items-center justify-center text-white font-bold">
                                {user.name?.charAt(0).toUpperCase() || '?'}
                              </div>
                              <span className="text-white font-medium">{user.name || 'Sin nombre'}</span>
                            </div>
                          </td>

                          <td className="p-6 text-gray-300">{user.email || 'Sin email'}</td>

                          <td className="p-6"><StatusBadge verified={user.verified} /></td>

                          <td className="p-6"><RoleBadge role={user.role} /></td>

                          <td className="p-6">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Download className="w-4 h-4" />
                              <span>{user.downloads?.length || 0}</span>
                            </div>
                          </td>

                          <td className="p-6">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(user.createdAt)}</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                // MOBILE CARDS
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {users.map((user, i) => (
                    <motion.div
                      key={user._id || i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#111] border border-white/10 rounded-xl p-5"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00F0FF] to-[#FF00FF] rounded-xl text-white flex items-center justify-center font-bold">
                          {user.name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{user.name || 'Sin nombre'}</h3>
                          <p className="text-gray-400 text-sm">{user.email || 'Sin email'}</p>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                        <div>
                          <p className="text-gray-500 text-xs">Estado</p>
                          <StatusBadge verified={user.verified} />
                        </div>

                        <div>
                          <p className="text-gray-500 text-xs">Rol</p>
                          <RoleBadge role={user.role} />
                        </div>

                        <div>
                          <p className="text-gray-500 text-xs">Descargas</p>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Download className="w-4 h-4" />
                            <span>{user.downloads?.length || 0}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-500 text-xs">Registro</p>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(user.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
