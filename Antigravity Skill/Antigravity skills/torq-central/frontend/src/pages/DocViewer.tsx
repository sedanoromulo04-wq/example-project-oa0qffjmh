import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import DocEditor from '../components/DocEditor'
import VersionHistory from '../components/VersionHistory'
import AttachmentPanel from '../components/AttachmentPanel'
import {
  ArrowLeftIcon,
  CategoryIcon,
  ClockIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '../components/Icons'
import './DocViewer.css'

interface Doc {
  id: string
  title: string
  content_markdown: string
  tags: string[]
  updated_at: string
  updated_by: string | null
  category_id: string
  categories: { name: string; icon: string; slug: string } | null
}

interface Attachment {
  id: string
  type: 'image' | 'pdf' | 'youtube' | 'link' | 'file'
  title: string
  url: string
  thumbnail_url?: string
  file_size?: number
  created_at: string
}

function md2html(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/\n\n/g, '</p><p>')
}

export default function DocViewer() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [doc, setDoc] = useState<Doc | null>(null)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(searchParams.get('editing') === 'true')
  const [showHistory, setShowHistory] = useState(false)
  const [userRole, setUserRole] = useState('collaborator')

  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) setUserRole(data.role)
      })
  }, [user])

  const isAdmin = userRole === 'admin'

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setEditing(searchParams.get('editing') === 'true')

    Promise.all([
      supabase.from('torq_docs').select('*, categories(name, icon, slug)').eq('id', id).single(),
      supabase
        .from('attachments')
        .select('*')
        .eq('doc_id', id)
        .order('created_at', { ascending: false }),
    ]).then(([docRes, attRes]) => {
      if (docRes.data) setDoc(docRes.data as Doc)
      setAttachments(attRes.data || [])
      setLoading(false)
    })
  }, [id])

  const handleSave = async (title: string, content: string) => {
    if (doc) {
      await supabase
        .from('torq_docs')
        .update({
          title,
          content_markdown: content,
          updated_by: user?.id,
        })
        .eq('id', doc.id)
      setDoc({ ...doc, title, content_markdown: content, updated_at: new Date().toISOString() })
    }
    setEditing(false)
    navigate(`/doc/${id}`, { replace: true })
  }

  const handleRestore = async (title: string, content: string) => {
    if (!doc || !user) return
    const { error } = await supabase
      .from('torq_docs')
      .update({ title, content_markdown: content, updated_by: user.id })
      .eq('id', doc.id)
    if (!error) {
      setDoc({ ...doc, title, content_markdown: content })
      setShowHistory(false)
    }
  }

  if (!id) return null
  if (loading) return <div className="doc-loading">Carregando...</div>
  if (!doc) return <div className="doc-loading">Documento não encontrado.</div>

  if (editing)
    return (
      <DocEditor
        docId={doc.id}
        initialTitle={doc.title}
        initialContent={doc.content_markdown}
        onSave={handleSave}
        onCancel={() => {
          setEditing(false)
          navigate(`/doc/${id}`, { replace: true })
        }}
      />
    )

  return (
    <>
      <div className="doc-viewer">
        <header className="doc-header">
          <div className="doc-breadcrumb">
            <button
              className="btn-ghost breadcrumb-back btn-with-icon"
              onClick={() => navigate(`/?cat=${doc.categories?.slug}`)}
            >
              <ArrowLeftIcon size={14} />
              {doc.categories?.icon && <CategoryIcon name={doc.categories.icon} size={14} />}
              {doc.categories?.name}
            </button>
          </div>
          <div className="doc-header-row">
            <h1 className="doc-title">{doc.title}</h1>
            <div className="doc-actions">
              <button
                className="btn-ghost doc-action-btn btn-with-icon"
                onClick={() => setShowHistory(true)}
              >
                <ClockIcon size={14} />
                Histórico
              </button>
              {isAdmin && (
                <>
                  <button
                    className="btn-ghost doc-action-btn btn-with-icon"
                    onClick={async () => {
                      if (!doc || !user) return
                      const { data } = await supabase
                        .from('torq_docs')
                        .insert({
                          title: 'Novo Documento',
                          content_markdown: '# Novo Documento\n\n',
                          category_id: doc.category_id,
                          created_by: user.id,
                          updated_by: user.id,
                        })
                        .select()
                        .single()
                      if (data) navigate(`/doc/${data.id}?editing=true`)
                    }}
                  >
                    <PlusIcon size={14} />
                    Novo
                  </button>
                  <button
                    className="btn-primary doc-action-btn btn-with-icon"
                    onClick={() => setEditing(true)}
                  >
                    <PencilIcon size={14} />
                    Editar
                  </button>
                  <button
                    className="btn-ghost doc-action-btn btn-with-icon btn-danger"
                    onClick={async () => {
                      if (!doc) return
                      const confirmed = window.confirm(
                        `Tem certeza que deseja excluir "${doc.title}"? Esta ação não pode ser desfeita.`,
                      )
                      if (!confirmed) return
                      try {
                        const catSlug = doc.categories?.slug
                        await supabase.from('attachments').delete().eq('doc_id', doc.id)
                        await supabase.from('doc_versions').delete().eq('doc_id', doc.id)
                        const { error } = await supabase.from('torq_docs').delete().eq('id', doc.id)
                        if (error) throw error
                        navigate(catSlug ? `/?cat=${catSlug}` : '/', { replace: true })
                      } catch (err) {
                        console.error('Erro ao excluir documento:', err)
                        alert('Erro ao excluir o documento. Verifique suas permissões.')
                      }
                    }}
                  >
                    <TrashIcon size={14} />
                    Excluir
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="doc-meta">
            {doc.tags?.map((t) => (
              <span key={t} className="doc-tag">
                {t}
              </span>
            ))}
            <span className="doc-date">
              {new Date(doc.updated_at).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </header>

        <article
          className="doc-body"
          dangerouslySetInnerHTML={{ __html: md2html(doc.content_markdown) }}
        />

        <AttachmentPanel
          docId={doc.id}
          attachments={attachments}
          onAdd={(att) => setAttachments((prev) => [att, ...prev])}
          onDelete={(id) => setAttachments((prev) => prev.filter((a) => a.id !== id))}
          isAdmin={isAdmin}
        />
      </div>

      {showHistory && (
        <VersionHistory
          docId={doc.id}
          onRestore={handleRestore}
          onClose={() => setShowHistory(false)}
          isAdmin={isAdmin}
        />
      )}
    </>
  )
}
