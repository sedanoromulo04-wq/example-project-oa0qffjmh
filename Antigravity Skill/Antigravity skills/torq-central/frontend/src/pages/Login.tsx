import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { HexagonIcon } from '../components/Icons'
import './Login.css'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        const { error } = await signIn(email, password)
        if (error) {
            setError('Email ou senha incorretos.')
        } else {
            navigate('/')
        }
        setLoading(false)
    }

    return (
        <div className="login-bg">
            <div className="login-ambient login-ambient-left" />
            <div className="login-ambient login-ambient-right" />

            <div className="login-card">
                <div className="login-brand">
                    <p className="login-kicker">Authorized Access</p>
                    <HexagonIcon size={32} className="login-logo-svg" />
                    <h1>Torq Jarvis Console</h1>
                    <p>Camada operacional do Torq OS para orquestrar agentes, contexto e governanca.</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="socio@grupotorq.com"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button type="submit" className="btn-primary login-btn" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="login-footnote">
                    <span>Supabase Auth</span>
                    <span>Jarvis API</span>
                    <span>OpenClaude Runtime</span>
                </div>
            </div>
        </div>
    )
}
