# 🚀 XUPER - Frontend

Plataforma de streaming de películas y series con diseño futurista y tecnología de vanguardia.

## ✨ Características

- 🎨 **Diseño Futurista**: Interfaz moderna con gradientes vibrantes y animaciones fluidas
- 🔐 **Autenticación Completa**: Login, registro con verificación de email
- 📱 **Descargas APK**: Sistema de descarga para Android Mobile y TV
- 👑 **Panel de Administración**: Dashboard completo para gestionar usuarios
- 🎯 **Responsive**: Optimizado para todos los dispositivos
- ⚡ **Performance**: Construido con Vite para máxima velocidad

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **Vite** - Build tool ultra rápido
- **Framer Motion** - Animaciones fluidas
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos modernos
- **Sonner** - Notificaciones toast
- **TailwindCSS** - Estilos utility-first

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/xuper-frontend.git

# Entrar al directorio
cd xuper-frontend

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env con tu URL de backend
# VITE_API_URL=http://localhost:5000
```

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:5173
```

## 🏗️ Build para Producción

```bash
# Crear build de producción
npm run build

# Preview del build
npm run preview
```

## 🌐 Deployment

### Vercel (Recomendado)

1. **Desde GitHub:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio
   - Configura `VITE_API_URL` en Environment Variables
   - Deploy automático

2. **Desde CLI:**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para más detalles.

## ⚙️ Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend API | `https://api.xuper.com` |

## 📁 Estructura del Proyecto

```
xuper-frontend/
├── src/
│   ├── api/              # Servicios API
│   │   ├── api.ts        # Configuración Axios
│   │   ├── auth.ts       # Autenticación
│   │   ├── content.ts    # Contenido/Descargas
│   │   └── admin.ts      # Admin endpoints
│   ├── components/       # Componentes React
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── AuthModal.tsx
│   │   ├── DownloadSection.tsx
│   │   ├── AdminPanel.tsx
│   │   └── ...
│   ├── types/           # TypeScript types
│   │   └── api.types.ts
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Entry point
├── public/              # Archivos estáticos
├── .env.example         # Template de variables
├── vercel.json          # Configuración Vercel
└── package.json
```

## 🎯 Flujos de Usuario

### Usuario Normal
1. Registro con verificación de email
2. Login
3. Acceso a sección de descargas (APK Mobile y TV)
4. Logout

### Administrador
1. Login con cuenta admin
2. Acceso al panel de administración
3. Visualización de todos los usuarios
4. Estadísticas y métricas

## 🔐 Endpoints API

```typescript
// Autenticación
POST /xuper/login
POST /xuper/register
POST /xuper/verify-email

// Contenido
GET /xuper/download

// Admin
GET /xuper/users
```

## 🎨 Paleta de Colores

- **Cyan**: `#00F0FF`
- **Magenta**: `#FF00FF`
- **Lime**: `#CCFF00`
- **Purple**: `#5D00FF`

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linter
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial.

## 📧 Contacto

Email: magictv243@gmail.com

---

Hecho con ❤️ por el equipo Xuper
