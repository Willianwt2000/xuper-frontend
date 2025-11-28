import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Sparkles } from "lucide-react";
import { authApi } from "../api/auth";
import { toast } from "sonner";

export function SignupForm({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verificationCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!verificationStep) {
        await authApi.verifyEmail({ email: formData.email });
        toast.success("Código enviado a tu correo");
        setVerificationStep(true);
      } else {
        await authApi.register(formData);

        const loginResponse = await authApi.login({
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", loginResponse.token);
        localStorage.setItem("user", JSON.stringify(loginResponse));

        toast.success("Cuenta creada");
        onAuthSuccess();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div className="relative mb-6">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          name="name"
          type="text"
          placeholder="Nombre completo"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full pl-12 pr-4 h-12 bg-[#111] border border-white/10 rounded-xl text-white"
        />
      </div>

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

      {/* Verification Code (Step 2) */}
      {verificationStep && (
        <div className="relative mb-6">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            name="verificationCode"
            type="text"
            placeholder="Código de verificación"
            required
            value={formData.verificationCode}
            onChange={handleChange}
            className="w-full pl-12 pr-4 h-12 bg-[#111] border border-white/10 rounded-xl text-white"
          />
        </div>
      )}

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
            <Sparkles className="w-4 h-4" />
            {verificationStep ? "Completar Registro" : "Continuar"}
          </div>
        )}
      </button>
    </form>
  );
}
