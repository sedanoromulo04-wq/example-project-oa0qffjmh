import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import NewItemModal from '../components/NewItemModal'
import { CategoryIcon, DocumentIcon, FolderPlusIcon, PlusIcon } from '../components/Icons'
import './CategoryView.css'

interface Category {
    id: string
    name: string
    slug: string
    icon: string
    parent_id: string | null
}

interface Doc {
    id: string
    title: string
    tags: string[]
    updated_at: string
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `há ${mins}m`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `há ${hours}h`
    const days = Math.floor(hours / 24)
    return `há ${days}d`
}

export default function CategoryView() {
    const [searchParams] = useSearchParams()
    const catSlug = searchParams.get('cat')
    const navigate = useNavigate()
    const { user } = useAuth()

    const [category, setCategory] = useState<Category | null>(null)
    const [subFolders, setSubFolders] = useState<Category[]>([])
    const [docs, setDocs] = useState<Doc[]>([])
    const [loading, setLoading] = useState(true)
    const [userRole, setUserRole] = useState('collaborator')
    const [showModal, setShowModal] = useState<'doc' | 'folder' | null>(null)

    // Drag-and-drop state
    const [draggingDocId, setDraggingDocId] = useState<string | null>(null)
    const [dropTargetId, setDropTargetId] = useState<string | null>(null)
    const [movingMessage, setMovingMessage] = useState<string | null>(null)

    useEffect(() => {
        if (!user) return
        supabase.from('profiles').select('role').eq('id', user.id).single()
            .then(({ data }) => { if (data) setUserRole(data.role) })
    }, [user])

    useEffect(() => {
        if (!catSlug) return
        setLoading(true)

        supabase.from('categories').select('*').eq('slug', catSlug).single()
            .then(async ({ data: cat }) => {
                if (!cat) { setLoading(false); return }
                setCategory(cat)

                const [foldersRes, docsRes] = await Promise.all([
                    supabase.from('categories').select('*').eq('parent_id', cat.id).order('display_order'),
                    supabase.from('torq_docs').select('id, title, tags, updated_at').eq('category_id', cat.id).order('updated_at', { ascending: false })
                ])

                setSubFolders(foldersRes.data || [])
                setDocs(docsRes.data || [])
                setLoading(false)
            })
    }, [catSlug])

    const isAdmin = userRole === 'admin'

    const handleCreateDoc = async (title: string) => {
        if (!category || !user) return
        const { data } = await supabase
            .from('torq_docs')
            .insert({ title, content_markdown: `# ${title}\n\n`, category_id: category.id, created_by: user.id, updated_by: user.id })
            .select().single()
        if (data) navigate(`/doc/${data.id}?editing=true`)
        setShowModal(null)
    }

    const handleCreateFolder = async (name: string) => {
        if (!category) return
        const slug = `${category.slug}-${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${Date.now()}`
        const { data } = await supabase
            .from('categories')
            .insert({ name, icon: 'folder', slug, display_order: 99, parent_id: category.id })
            .select().single()
        if (data) setSubFolders(prev => [...prev, data])
        setShowModal(null)
    }

    // --- Drag-and-drop handlers ---

    const handleDragStart = useCallback((e: React.DragEvent, docId: string, docTitle: string) => {
        setDraggingDocId(docId)
        e.dataTransfer.setData('application/torq-doc-id', docId)
        e.dataTransfer.setData('text/plain', docTitle)
        e.dataTransfer.effectAllowed = 'move'
    }, [])

    const handleDragEnd = useCallback(() => {
        setDraggingDocId(null)
        setDropTargetId(null)
    }, [])

    const handleFolderDragOver = useCallback((e: React.DragEvent, folderId: string) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        setDropTargetId(folderId)
    }, [])

    const handleFolderDragLeave = useCallback(() => {
        setDropTargetId(null)
    }, [])

    const handleFolderDrop = useCallback(async (e: React.DragEvent, targetFolder: Category) => {
        e.preventDefault()
        setDropTargetId(null)
        const docId = e.dataTransfer.getData('application/torq-doc-id')
        if (!docId) return

        const movedDoc = docs.find(d => d.id === docId)
        if (!movedDoc) return

        // Atualizar category_id no banco
        const { error } = await supabase
            .from('torq_docs')
            .update({ category_id: targetFolder.id })
            .eq('id', docId)

        if (!error) {
            // Remover o doc da lista local
            setDocs(prev => prev.filter(d => d.id !== docId))
            setMovingMessage(`"${movedDoc.title}" movido para ${targetFolder.name}`)
            setTimeout(() => setMovingMessage(null), 3000)
        }
        setDraggingDocId(null)
    }, [docs])

    if (loading) return <div className="doc-loading">Carregando...</div>
    if (!category) return <div className="doc-loading">Categoria não encontrada.</div>

    return (
        <div className="category-view">
            <header className="category-view-header">
                <div className="category-view-breadcrumb">Torq Central &rsaquo; {category.name}</div>
                <h1 className="category-view-title">
                    <CategoryIcon name={category.icon} size={24} className="category-view-icon" />
                    {category.name}
                </h1>
                <p className="category-view-meta">
                    {subFolders.length > 0 && `${subFolders.length} pasta${subFolders.length > 1 ? 's' : ''} · `}
                    {docs.length} documento{docs.length !== 1 ? 's' : ''}
                </p>
                {isAdmin && (
                    <div className="category-view-actions">
                        <button className="btn-ghost btn-with-icon" onClick={() => setShowModal('folder')}>
                            <FolderPlusIcon size={16} />
                            Nova Pasta
                        </button>
                        <button className="btn-primary btn-with-icon" onClick={() => setShowModal('doc')}>
                            <PlusIcon size={16} />
                            Novo Documento
                        </button>
                    </div>
                )}
            </header>

            {/* Toast de feedback para mover documentos */}
            {movingMessage && (
                <div className="move-toast">{movingMessage}</div>
            )}

            {subFolders.length > 0 && (
                <section className="cards-section">
                    <div className="cards-section-title">
                        Pastas
                        {draggingDocId && <span className="drop-hint">Solte o documento sobre uma pasta para mover</span>}
                    </div>
                    <div className="cards-grid">
                        {subFolders.map(folder => (
                            <button
                                key={folder.id}
                                className={`folder-card${dropTargetId === folder.id ? ' drop-active' : ''}${draggingDocId ? ' drop-ready' : ''}`}
                                onClick={() => !draggingDocId && navigate(`/?cat=${folder.slug}`)}
                                onDragOver={e => handleFolderDragOver(e, folder.id)}
                                onDragLeave={handleFolderDragLeave}
                                onDrop={e => handleFolderDrop(e, folder)}
                            >
                                <span className="folder-card-icon">
                                    <CategoryIcon name={folder.icon} size={28} />
                                </span>
                                <span className="folder-card-name">{folder.name}</span>
                                <span className="folder-card-count">
                                    {dropTargetId === folder.id ? 'Soltar aqui' : 'Subpasta'}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            <section className="cards-section">
                <div className="cards-section-title">Documentos</div>
                <div className="cards-grid">
                    {docs.length === 0 && (
                        <div className="cards-empty">
                            <DocumentIcon size={32} className="cards-empty-icon-svg" />
                            {isAdmin ? 'Nenhum documento. Clique em "Novo Documento" para começar.' : 'Nenhum documento nesta categoria.'}
                        </div>
                    )}
                    {docs.map(doc => (
                        <div
                            key={doc.id}
                            className={`doc-card${draggingDocId === doc.id ? ' dragging' : ''}`}
                            draggable={isAdmin}
                            onDragStart={e => handleDragStart(e, doc.id, doc.title)}
                            onDragEnd={handleDragEnd}
                            onClick={() => navigate(`/doc/${doc.id}`)}
                        >
                            {isAdmin && <span className="drag-handle" title="Arraste para mover para outra pasta">⠿</span>}
                            <span className="doc-card-title">{doc.title}</span>
                            {doc.tags?.length > 0 && (
                                <div className="doc-card-tags">
                                    {doc.tags.slice(0, 3).map(t => (
                                        <span key={t} className="doc-card-tag">{t}</span>
                                    ))}
                                </div>
                            )}
                            <div className="doc-card-meta">
                                <span className="doc-card-meta-label">Documento</span>
                                <span className="doc-card-date">{timeAgo(doc.updated_at)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {showModal && (
                <NewItemModal
                    type={showModal}
                    onConfirm={showModal === 'doc'
                        ? (name) => handleCreateDoc(name)
                        : (name) => handleCreateFolder(name)}
                    onClose={() => setShowModal(null)}
                />
            )}
        </div>
    )
}
