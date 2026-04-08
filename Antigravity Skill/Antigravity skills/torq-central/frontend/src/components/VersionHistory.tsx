import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { XIcon, UndoIcon } from './Icons'
import './VersionHistory.css'

interface Version {
  id: string
  version_number: number
  title: string
  content_markdown: string
  created_at: string
  profiles: { full_name: string; email: string } | null
}

interface Props {
  docId: string
  onRestore: (title: string, content: string) => void
  onClose: () => void
  isAdmin: boolean
}

export default function VersionHistory({ docId, onRestore, onClose, isAdmin }: Props) {
  const [versions, setVersions] = useState<Version[]>([])
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState<Version | null>(null)

  useEffect(() => {
    supabase
      .from('doc_versions')
      .select('*, profiles(full_name, email)')
      .eq('doc_id', docId)
      .order('version_number', { ascending: false })
      .then(({ data }) => {
        setVersions((data as Version[]) || [])
        setLoading(false)
      })
  }, [docId])

  const handleRestore = (v: Version) => {
    if (
      confirm(
        `Restaurar para a versão #${v.version_number}? O conteúdo atual será salvo como nova versão.`,
      )
    ) {
      onRestore(v.title, v.content_markdown)
    }
  }

  return (
    <div className="history-overlay" onClick={onClose}>
      <div className="history-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="history-header">
          <h3>Histórico de Versões</h3>
          <button className="btn-ghost" onClick={onClose}>
            <XIcon size={16} />
          </button>
        </div>

        {loading && <div className="history-loading">Carregando...</div>}

        {!loading && versions.length === 0 && (
          <div className="history-empty">Nenhuma versão anterior encontrada.</div>
        )}

        <div className="history-list">
          {versions.map((v) => (
            <div
              key={v.id}
              className={`history-item${preview?.id === v.id ? ' active' : ''}`}
              onClick={() => setPreview(preview?.id === v.id ? null : v)}
            >
              <div className="history-item-header">
                <span className="history-version">v{v.version_number}</span>
                <span className="history-date">
                  {new Date(v.created_at).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="history-title">{v.title}</div>
              {v.profiles && (
                <div className="history-author">{v.profiles.full_name || v.profiles.email}</div>
              )}

              {preview?.id === v.id && (
                <div className="history-preview">
                  <pre className="history-preview-content">
                    {v.content_markdown.slice(0, 400)}
                    {v.content_markdown.length > 400 ? '...' : ''}
                  </pre>
                  {isAdmin && (
                    <button
                      className="btn-primary history-restore-btn btn-with-icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRestore(v)
                      }}
                    >
                      <UndoIcon size={14} />
                      Restaurar esta versão
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
