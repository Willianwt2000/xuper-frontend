import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import { authApi } from "../api/auth";
import { toast } from "sonner";

export function LoginForm({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response));

      toast.success(`Bienvenido ${response.name}`);
      onAuthSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email */}
      <div className="relative mb-6">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full pl-12 pr-4 h-12 bg-[#111] border border-white/10 rounded-xl text-white"
        />
      </div>

      {/* Password */}
      <div className="relative mb-6">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full pl-12 pr-12 h-12 bg-[#111] border border-white/10 rounded-xl text-white"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#CCFF00]"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        ) : (
          <div className="flex justify-center items-center gap-2">
            <Sparkles className="w-4 h-4" /> Iniciar sesión
          </div>
        )}
      </button>
    </form>
  );
}
