import { Outlet, Navigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import {
  TerminalSquare,
  LayoutDashboard,
  Users,
  BrainCircuit,
  Bot,
  LogOut,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { user, loading, signOut } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-sm">Iniciando sistemas...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const navigation = [
    { name: 'Cockpit', href: '/', icon: LayoutDashboard },
    { name: 'Clientes', href: '#', icon: Users },
    { name: 'Memória', href: '#', icon: BrainCircuit },
    { name: 'Jarvis AI', href: '#', icon: Bot },
  ]

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/30 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <TerminalSquare className="w-6 h-6 text-zinc-100 mr-3" />
          <span className="font-bold text-lg tracking-tight">Torq OS</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group',
                  isActive
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200',
                )}
              >
                <item.icon
                  className={cn(
                    'w-5 h-5 mr-3 flex-shrink-0',
                    isActive ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-300',
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center px-3 py-2 mb-2 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-100 truncate">{user.email}</p>
              <p className="text-xs text-zinc-500 truncate">Operador Torq</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-zinc-400 rounded-lg hover:bg-zinc-800/50 hover:text-zinc-200 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3 text-zinc-500" />
            Desconectar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
        <header className="h-16 md:hidden flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900/30">
          <div className="flex items-center">
            <TerminalSquare className="w-6 h-6 text-zinc-100 mr-2" />
            <span className="font-bold tracking-tight">Torq OS</span>
          </div>
          <button onClick={signOut} className="text-zinc-400 p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
