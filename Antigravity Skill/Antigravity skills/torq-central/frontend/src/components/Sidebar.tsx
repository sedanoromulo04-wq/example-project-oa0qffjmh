import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Category } from '../pages/DashboardLayout'
import type { AuthUser } from '../contexts/AuthContext'
import { CategoryIcon, DocumentIcon, LogOutIcon, HexagonIcon, SearchIcon, ChevronRightIcon } from './Icons'
import './Sidebar.css'
import { IS_JARVIS_MODE } from '../lib/appConfig'

interface Props {
    categories: Category[]
    user: AuthUser | null
    onSignOut: () => void
    onOpenSearch: () => void
}

interface DocItem { id: string; title: string }

export default function Sidebar({ categories, user, onSignOut, onOpenSearch }: Props) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const currentCat = searchParams.get('cat')

    const [expandedCat, setExpandedCat] = useState<string | null>(currentCat)
    const [catDocs, setCatDocs] = useState<Record<string, DocItem[]>>({})
    const [loadingCat, setLoadingCat] = useState<string | null>(null)

    const roots = IS_JARVIS_MODE ? [] : categories.filter(c => !c.parent_id)

    const toggleCategory = async (cat: Category) => {
        const isExpanded = expandedCat === cat.slug
        if (isExpanded) {
            setExpandedCat(null)
            return
        }
        setExpandedCat(cat.slug)
        navigate(`/?cat=${cat.slug}`)

        if (!catDocs[cat.slug]) {
            setLoadingCat(cat.slug)
            const { data } = await supabase
                .from('torq_docs')
                .select('id, title')
                .eq('category_id', cat.id)
                .order('updated_at', { ascending: false })
            setCatDocs(prev => ({ ...prev, [cat.slug]: data || [] }))
            setLoadingCat(null)
        }
    }

    useEffect(() => {
        if (currentCat && !expandedCat) {
            setExpandedCat(currentCat)
            const cat = categories.find(c => c.slug === currentCat)
            if (cat && !catDocs[currentCat]) {
                supabase.from('torq_docs').select('id, title').eq('category_id', cat.id).order('updated_at', { ascending: false })
                    .then(({ data }) => setCatDocs(prev => ({ ...prev, [currentCat]: data || [] })))
            }
        }
    }, [currentCat, categories])

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <HexagonIcon size={20} className="sidebar-logo-icon" />
                <span className="sidebar-title">Torq Central</span>
            </div>

            {!IS_JARVIS_MODE && (
                <div className="sidebar-search" onClick={onOpenSearch} title="Ctrl+K">
                    <SearchIcon size={14} />
                    <span>Buscar...</span>
                    <kbd>Ctrl K</kbd>
                </div>
            )}

            <nav className="sidebar-nav">
                <div className="sidebar-section sidebar-jarvis">
                    <NavLink to="/jarvis" className={({ isActive }) => `sidebar-item sidebar-link${isActive ? ' active' : ''}`}>
                        <HexagonIcon size={16} />
                        <span className="sidebar-item-name">Jarvis</span>
                    </NavLink>
                </div>

                {IS_JARVIS_MODE && (
                    <div className="sidebar-mode-note">
                        <p>Modo Jarvis-first ativo.</p>
                        <span>O cockpit prioriza orquestracao, bloqueios, approvals e contexto operacional.</span>
                    </div>
                )}

                {roots.map(cat => {
                    const isOpen = expandedCat === cat.slug
                    const docs = catDocs[cat.slug] || []
                    const isLoading = loadingCat === cat.slug

                    return (
                        <div key={cat.id} className="sidebar-section">
                            <button
                                className={`sidebar-item${isOpen ? ' active' : ''}`}
                                onClick={() => toggleCategory(cat)}
                            >
                                <CategoryIcon name={cat.icon} size={16} />
                                <span className="sidebar-item-name">{cat.name}</span>
                                <ChevronRightIcon size={14} className={`sidebar-chevron-icon${isOpen ? ' open' : ''}`} />
                            </button>

                            {isOpen && (
                                <div className="sidebar-doc-list">
                                    {isLoading && <span className="sidebar-doc-loading">Carregando...</span>}
                                    {!isLoading && docs.length === 0 && (
                                        <span className="sidebar-doc-empty">Nenhum documento</span>
                                    )}
                                    {docs.map(doc => (
                                        <NavLink
                                            key={doc.id}
                                            to={`/doc/${doc.id}`}
                                            className={({ isActive }) => `sidebar-doc-item${isActive ? ' active-doc' : ''}`}
                                        >
                                            <DocumentIcon size={14} />
                                            <span className="sidebar-doc-name">{doc.title}</span>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="sidebar-avatar">{user?.email?.[0].toUpperCase() ?? 'U'}</div>
                    <span className="sidebar-email">{user?.email}</span>
                </div>
                <button className="btn-ghost sidebar-signout" onClick={onSignOut} title="Sair">
                    <LogOutIcon size={16} />
                </button>
            </div>
        </aside>
    )
}
