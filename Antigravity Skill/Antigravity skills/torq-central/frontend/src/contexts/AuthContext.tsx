import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { JARVIS_API_URL } from '../lib/jarvisApi'
import { USE_BACKEND_AUTH } from '../lib/appConfig'

export interface AuthUser {
  id: string
  email: string
  full_name?: string | null
  role?: string | null
  workspace_id?: string | null
  workspace_name?: string | null
}

export interface AuthSession {
  provider: 'supabase' | 'backend'
  user: AuthUser
}

interface AuthCtx {
  session: AuthSession | null
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx)
const STORAGE_KEY = 'torq_auth_session_v1'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (USE_BACKEND_AUTH) {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          setSession(JSON.parse(stored))
        } catch {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(
        session
          ? {
              provider: 'supabase',
              user: {
                id: session.user.id,
                email: session.user.email || '',
              },
            }
          : null,
      )
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(
        nextSession
          ? {
              provider: 'supabase',
              user: {
                id: nextSession.user.id,
                email: nextSession.user.email || '',
              },
            }
          : null,
      )
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (USE_BACKEND_AUTH) {
      try {
        const response = await fetch(`${JARVIS_API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        const payload = await response.json()
        if (!response.ok || payload.ok === false) {
          return { error: new Error(payload.error || 'Login failed') }
        }

        const nextSession: AuthSession = {
          provider: 'backend',
          user: payload.user,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
        setSession(nextSession)
        return { error: null }
      } catch (error) {
        return { error: error instanceof Error ? error : new Error('Login failed') }
      }
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signOut = async () => {
    if (USE_BACKEND_AUTH) {
      localStorage.removeItem(STORAGE_KEY)
      setSession(null)
      return
    }

    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
