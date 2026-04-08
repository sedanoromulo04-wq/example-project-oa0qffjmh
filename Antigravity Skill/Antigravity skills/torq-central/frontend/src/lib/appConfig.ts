export const AUTH_MODE = (import.meta.env.VITE_AUTH_MODE as string | undefined) || 'supabase'
export const APP_MODE = (import.meta.env.VITE_APP_MODE as string | undefined) || 'default'

export const USE_BACKEND_AUTH = AUTH_MODE === 'backend'
export const IS_JARVIS_MODE = APP_MODE === 'jarvis'
