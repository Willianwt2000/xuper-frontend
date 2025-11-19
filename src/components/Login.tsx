import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import type { User } from '../interface/type.user'; // Asegúrate de que esta interfaz esté correctamente definida

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Nuevo estado para el mensaje de error
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * @description Realiza la solicitud de login al backend y maneja la respuesta (JSON o HTML).
   * @returns El objeto de usuario logueado o void en caso de éxito/error.
   */
  const loginUser = async (email: string, password: string): Promise<User | void> => {
    // Limpiamos cualquier error anterior antes de intentar el login
    setErrorMessage(null);

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await axios.post(`${baseUrl}/xuper/login`, {
        email: email,
        password: password
      });

      if (typeof response.data === 'string' && response.data.trim().startsWith('<!DOCTYPE html>')) {

        console.log('Login exitoso. El servidor devolvió una página HTML con redirección.');

        // En un caso real, podrías querer que el frontend maneje la redirección si el backend envía una respuesta que no es JSON.
        alert('Login exitoso. El servidor está gestionando la redirección.');

        return;

      }

      else if (response.data && response.data.data) {
        console.log('Login exitoso. Respuesta JSON estándar recibida.');
        const loggedInUser: User = response.data.data;
        alert(`Login exitoso para: ${loggedInUser.email}. Redirigiendo con frontend...`);

        return loggedInUser;
      }

    } catch (error) {

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error de Servidor (Status:', error.response.status, '):', error.response.data);

          // Extrae el mensaje de error y lo establece en el estado
          const message: string = ((error.response.data as any)?.message) || 'Credenciales inválidas';
          setErrorMessage(message); // <-- Establece el mensaje de error aquí

        } else if (error.request) {
          console.error('Error de Conexión:', 'No se recibió respuesta del servidor.');
          setErrorMessage('Error de conexión. Inténtalo de nuevo.');
        } else {
          console.error('Error de Configuración:', error.message);
          setErrorMessage('Error inesperado de la aplicación.');
        }
      } else {
        console.error('Error inesperado:', error);
        setErrorMessage('Ocurrió un error inesperado.');
      }
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(null); // Limpiar el error al enviar

    console.log('Intentando login con:', { email, password });

    try {
      await loginUser(email, password);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Bienvenido de vuelta</h1>
          <p className="auth-subtitle">Inicia sesión en tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Muestra el mensaje de error condicionalmente */}
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span>Recordarme</span>
            </label>
            <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿No tienes una cuenta?{' '}
            <a href="/signup" className="auth-link">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login