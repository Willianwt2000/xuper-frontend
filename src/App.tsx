import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import axios from 'axios'
import type { User } from './interface/type.user'
function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('login')

  useEffect(() => {

    const path = window.location.pathname
    if (path === '/signup') {
      setCurrentPage('signup')
    } else {
      setCurrentPage('login')
    }

    // Escuchar cambios en el historial del navegador
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/signup') {
        setCurrentPage('signup')
      } else {
        setCurrentPage('login')
      }
    }

    window.addEventListener('popstate', handlePopState)

    // Interceptar clicks en links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.getAttribute('href')) {
        const href = target.getAttribute('href')
        if (href === '/login' || href === '/signup') {
          e.preventDefault()
          window.history.pushState({}, '', href)
          setCurrentPage(href === '/signup' ? 'signup' : 'login')
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleClick)
    }
  }, [])


  //post to the url to login user
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';



  async function loginUser(email: string, password: string): Promise<User | void> {
    try {
      const response = await axios.post(`${baseUrl}/xuper/login`, {
        email: email,
        password: password
      });

      // Si la promesa se resuelve (código 2xx), la respuesta está aquí
      console.log('Login exitoso:', response.data);
      return response.data.data.map((user: User) => ({
        email: user.email,
        password: user.password
      }));

      

    } catch (error) {
      // Si la promesa falla (código 4xx, 5xx o error de red)
      if (axios.isAxiosError(error)) {
        // Error viene de Axios y puede tener response/request/message
        if (error.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          console.error('Error de Servidor (Status:', error.response.status, '):', error.response.data);
          // Muestra al usuario un mensaje específico del backend (ej: 'Contraseña incorrecta')
          alert(`Error de Login: ${((error.response.data as any)?.message) || 'Credenciales inválidas'}`);
        } else if (error.request) {
          // La solicitud fue enviada, pero no se recibió respuesta (ej: servidor caído o CORS)
          console.error('Error de Conexión:', 'No se recibió respuesta del servidor.');
          alert('Error de conexión. Inténtalo de nuevo.');
        } else {
          console.error('Error de Configuración:', error.message);
        }
      } else {
        // Error no relacionado con Axios
        console.error('Error inesperado:', error);
      }
    }
  }

  // loginUser('willianmetelien@gmail.com', 'Enigma2323');


  //Gel all users
  const authToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTY2YWM4OTk2YjdkNzAzYmY1YTE1YyIsImlhdCI6MTc2MzM0NDM1NSwiZXhwIjoxNzY1OTM2MzU1fQ.0n7aw9FuGbt4hyaD97lwbvD4UXw77sWZoVQEUHFqqDU'; // Tu token JWT

  // La función asume que User[] es el tipo de datos devuelto
  async function getAllUsers(): Promise<User[] | void> {
    try {
      const response = await axios.get(`${baseUrl}/xuper/users`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log('✅ Usuarios obtenidos:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('❌ Error de Servidor (Status:', error.response.status, '):', error.response.data);
        } else if (error.request) {
          console.error('❌ Error de Conexión:', 'No se recibió respuesta del servidor.');
        } else {
          console.error('❌ Error de Configuración:', error.message);
        }
      } else {
        console.error('❌ Error inesperado:', error);
      }
    }
  }


  // getAllUsers();


  return (
    <>
      {currentPage === 'login' ? <Login /> : <Signup />}
    </>
  )


}

export default App
