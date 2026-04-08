import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { CategoryIcon, HexagonIcon } from '../components/Icons'
import './HomePage.css'

interface Category {
  id: string
  name: string
  slug: string
  icon: string
  parent_id: string | null
  doc_count?: number
}

interface Activity {
  id: string
  action: string
  entity_title: string
  category_name: string
  created_at: string
  profiles: { full_name: string; email: string } | null
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 2) return 'agora'
  if (mins < 60) return `${mins}m atrás`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h atrás`
  return `${Math.floor(hours / 24)}d atrás`
}

function actionLabel(action: string): string {
  const labels: Record<string, string> = {
    created_doc: 'criou',
    edited_doc: 'editou',
    uploaded_file: 'enviou arquivo em',
    created_category: 'criou pasta',
  }
  return labels[action] || '—'
}

export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [categories, setCategories] = useState<Category[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) setUserName(data.full_name || data.email.split('@')[0])
      })
  }, [user])

  useEffect(() => {
    Promise.all([
      supabase.from('categories').select('*').is('parent_id', null).order('display_order'),
      supabase
        .from('activity_log')
        .select('*, profiles(full_name, email)')
        .order('created_at', { ascending: false })
        .limit(15),
    ]).then(([catRes, actRes]) => {
      setCategories(catRes.data || [])
      setActivities((actRes.data as Activity[]) || [])
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('activity-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'activity_log' },
        (payload) => {
          setActivities((prev) => [payload.new as Activity, ...prev].slice(0, 15))
        },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (loading) return <div className="doc-loading">Carregando...</div>

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Bom dia'
    if (h < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-logo-area">
          <div className="home-logo-placeholder">
            <HexagonIcon size={24} className="home-logo-svg" />
            <span className="home-logo-text">GRUPO TORQ</span>
          </div>
        </div>
        <div className="home-greeting">
          <h1>
            {greeting()}, {userName}
          </h1>
          <p>O que você quer encontrar hoje?</p>
        </div>
      </header>

      <div className="home-body">
        <section className="home-categories">
          <div className="home-section-title">Categorias</div>
          <div className="home-cat-grid">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="home-cat-card"
                onClick={() => navigate(`/?cat=${cat.slug}`)}
              >
                <span className="home-cat-icon">
                  <CategoryIcon name={cat.icon} size={20} />
                </span>
                <div className="home-cat-info">
                  <span className="home-cat-name">{cat.name}</span>
                </div>
                <span className="home-cat-arrow">&rsaquo;</span>
              </button>
            ))}
          </div>
        </section>

        <aside className="home-feed">
          <div className="home-section-title">Atividade Recente</div>
          <div className="feed-list">
            {activities.length === 0 && <p className="feed-empty">Nenhuma atividade ainda.</p>}
            {activities.map((act) => (
              <div key={act.id} className="feed-item">
                <div className="feed-item-avatar">
                  {(act.profiles?.full_name || act.profiles?.email || 'U')[0].toUpperCase()}
                </div>
                <div className="feed-item-content">
                  <span className="feed-item-actor">
                    {act.profiles?.full_name || act.profiles?.email?.split('@')[0] || 'Alguém'}
                  </span>{' '}
                  {actionLabel(act.action)}{' '}
                  <span className="feed-item-entity">{act.entity_title}</span>
                  {act.category_name && (
                    <span className="feed-item-cat"> · {act.category_name}</span>
                  )}
                </div>
                <span className="feed-item-time">{timeAgo(act.created_at)}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
