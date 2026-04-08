import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import './DocEditor.css'

interface Props {
  docId: string
  initialTitle: string
  initialContent: string
  onSave: (title: string, content: string) => void
  onCancel: () => void
}

export default function DocEditor({
  docId,
  initialTitle,
  initialContent,
  onSave,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const handleSave = async () => {
    if (!title.trim()) {
      setError('O título não pode estar vazio.')
      return
    }
    setSaving(true)
    setError('')

    const { error: err } = await supabase
      .from('torq_docs')
      .update({
        title: title.trim(),
        content_markdown: content,
        updated_by: user?.id,
      })
      .eq('id', docId)

    if (err) {
      setError('Erro ao salvar. Tente novamente.')
      setSaving(false)
    } else {
      onSave(title, content)
    }
  }

  return (
    <div className="editor-wrap">
      <div className="editor-toolbar">
        <div className="editor-toolbar-left">
          <button
            className="toolbar-btn"
            title="Negrito"
            onClick={() => setContent((c) => c + '**texto**')}
          >
            B
          </button>
          <button
            className="toolbar-btn italic"
            title="Itálico"
            onClick={() => setContent((c) => c + '*texto*')}
          >
            I
          </button>
          <button
            className="toolbar-btn"
            title="H2"
            onClick={() => setContent((c) => c + '\n## Título\n')}
          >
            H2
          </button>
          <button
            className="toolbar-btn"
            title="H3"
            onClick={() => setContent((c) => c + '\n### Título\n')}
          >
            H3
          </button>
          <button
            className="toolbar-btn"
            title="Lista"
            onClick={() => setContent((c) => c + '\n- item\n')}
          >
            ≡
          </button>
          <button
            className="toolbar-btn mono"
            title="Código inline"
            onClick={() => setContent((c) => c + '`código`')}
          >
            &lt;/&gt;
          </button>
          <button
            className="toolbar-btn"
            title="Citação"
            onClick={() => setContent((c) => c + '\n> citação\n')}
          >
            ❝
          </button>
        </div>
        <div className="editor-toolbar-right">
          {error && <span className="editor-error">{error}</span>}
          <button className="btn-ghost" onClick={onCancel} disabled={saving}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>

      <input
        className="editor-title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título do documento"
      />

      <textarea
        className="editor-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva em Markdown..."
        spellCheck={false}
      />

      <div className="editor-hint">
        Markdown suportado: **negrito** *itálico* ## título `código` &gt; citação - lista
      </div>
    </div>
  )
}
