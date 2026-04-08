import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/Login'
import DashboardLayout from './pages/DashboardLayout'
import HomePage from './pages/HomePage'
import CategoryView from './pages/CategoryView'
import DocViewer from './pages/DocViewer'
import JarvisConsole from './pages/JarvisConsole'
import GlobalSearch from './components/GlobalSearch'
import { IS_JARVIS_MODE } from './lib/appConfig'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font)',
        }}
      >
        Carregando...
      </div>
    )
  return session ? <>{children}</> : <Navigate to="/login" replace />
}

// Componente que decide se exibe HomePage, CategoryView ou nada
function DashboardIndex() {
  const [searchParams] = useSearchParams()
  const catSlug = searchParams.get('cat')

  if (IS_JARVIS_MODE) return <Navigate to="/jarvis" replace />
  if (catSlug) return <CategoryView />
  return <HomePage />
}

function AppRoutes() {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    if (IS_JARVIS_MODE) {
      return
    }

    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout onOpenSearch={() => setSearchOpen(true)} />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardIndex />} />
          <Route path="jarvis" element={<JarvisConsole />} />
          <Route path="doc/:id" element={<DocViewer />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!IS_JARVIS_MODE && searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
