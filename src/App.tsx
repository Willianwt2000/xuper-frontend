import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'

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

  return (
    <>
      {currentPage === 'login' ? <Login /> : <Signup />}
    </>
  )
}

export default App
