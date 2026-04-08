import { useState, useRef, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { PaperclipIcon, UploadIcon, LinkIcon, VideoIcon, PdfIcon, DocumentIcon, XIcon } from './Icons'
import './AttachmentPanel.css'

interface Attachment {
    id: string
    type: 'image' | 'pdf' | 'youtube' | 'link' | 'file'
    title: string
    url: string
    thumbnail_url?: string
    file_size?: number
    created_at: string
}

interface Props {
    docId: string
    attachments: Attachment[]
    onAdd: (att: Attachment) => void
    onDelete: (id: string) => void
    isAdmin: boolean
}

function extractYouTubeId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
        /youtube\.com\/shorts\/([^&\n?#]+)/,
    ]
    for (const p of patterns) {
        const m = url.match(p)
        if (m) return m[1]
    }
    return null
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1048576) return `${Math.round(bytes / 1024)}KB`
    return `${(bytes / 1048576).toFixed(1)}MB`
}

export default function AttachmentPanel({ docId, attachments, onAdd, onDelete, isAdmin }: Props) {
    const { user } = useAuth()
    const [uploading, setUploading] = useState(false)
    const [urlInput, setUrlInput] = useState('')
    const [urlTitle, setUrlTitle] = useState('')
    const [dragOver, setDragOver] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = useCallback(async (file: File) => {
        if (!user) return
        setUploading(true)
        setError('')

        const ext = file.name.split('.').pop()?.toLowerCase()
        const type = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '') ? 'image'
            : ext === 'pdf' ? 'pdf' : 'file'

        const path = `${docId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

        const { error: uploadErr } = await supabase.storage
            .from('torq-attachments')
            .upload(path, file, { upsert: false })

        if (uploadErr) {
            setError('Erro ao enviar arquivo. Verifique se o bucket existe.')
            setUploading(false)
            return
        }

        const { data: { publicUrl } } = supabase.storage
            .from('torq-attachments')
            .getPublicUrl(path)

        const { data: att } = await supabase.from('attachments').insert({
            doc_id: docId,
            type,
            title: file.name,
            url: publicUrl,
            thumbnail_url: type === 'image' ? publicUrl : undefined,
            file_size: file.size,
            created_by: user.id
        }).select().single()

        if (att) onAdd(att as Attachment)
        setUploading(false)
    }, [docId, user, onAdd])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file) handleFileUpload(file)
    }, [handleFileUpload])

    const handleUrlAdd = async () => {
        if (!urlInput.trim() || !user) return
        const yt = extractYouTubeId(urlInput)
        const type = yt ? 'youtube' : 'link'
        const url = yt ? `https://www.youtube.com/watch?v=${yt}` : urlInput
        const thumbnail = yt ? `https://img.youtube.com/vi/${yt}/mqdefault.jpg` : undefined

        const { data: att } = await supabase.from('attachments').insert({
            doc_id: docId,
            type,
            title: urlTitle || url,
            url,
            thumbnail_url: thumbnail,
            created_by: user.id
        }).select().single()

        if (att) onAdd(att as Attachment)
        setUrlInput('')
        setUrlTitle('')
    }

    const handleDelete = async (id: string) => {
        await supabase.from('attachments').delete().eq('id', id)
        onDelete(id)
    }

    return (
        <div className="attachment-panel">
            <div className="attachment-panel-title">
                <PaperclipIcon size={16} />
                Arquivos & Mídia
            </div>

            {isAdmin && (
                <div className="attachment-upload-area">
                    <div
                        className={`drop-zone${dragOver ? ' drag-over' : ''}`}
                        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                            style={{ display: 'none' }}
                            onChange={e => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0]) }}
                        />
                        {uploading ? (
                            <span className="drop-zone-text">Enviando...</span>
                        ) : (
                            <>
                                <UploadIcon size={24} className="drop-zone-icon-svg" />
                                <span className="drop-zone-text">Arraste ou clique para upload</span>
                                <span className="drop-zone-hint">Imagens, PDFs, Documentos</span>
                            </>
                        )}
                    </div>

                    <div className="url-input-group">
                        <input
                            className="url-input"
                            type="url"
                            placeholder="Cole URL do YouTube ou qualquer link..."
                            value={urlInput}
                            onChange={e => setUrlInput(e.target.value)}
                        />
                        {urlInput && (
                            <input
                                className="url-input url-title"
                                type="text"
                                placeholder="Título (opcional)"
                                value={urlTitle}
                                onChange={e => setUrlTitle(e.target.value)}
                            />
                        )}
                        {urlInput && (
                            <button className="btn-primary url-add-btn btn-with-icon" onClick={handleUrlAdd}>
                                {extractYouTubeId(urlInput) ? <><VideoIcon size={14} /> Adicionar Vídeo</> : <><LinkIcon size={14} /> Adicionar Link</>}
                            </button>
                        )}
                    </div>
                    {error && <span className="att-error">{error}</span>}
                </div>
            )}

            <div className="attachment-list">
                {attachments.length === 0 && !isAdmin && (
                    <p className="att-empty">Nenhum arquivo ou mídia.</p>
                )}
                {attachments.map(att => (
                    <div key={att.id} className="attachment-item">
                        {att.type === 'image' && att.thumbnail_url && (
                            <a href={att.url} target="_blank" rel="noopener" className="att-image-link">
                                <img src={att.thumbnail_url} alt={att.title} className="att-thumbnail" />
                            </a>
                        )}
                        {att.type === 'youtube' && (
                            <div className="att-youtube">
                                <iframe
                                    src={`https://www.youtube.com/embed/${extractYouTubeId(att.url)}`}
                                    title={att.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="att-youtube-iframe"
                                />
                            </div>
                        )}
                        {(att.type === 'pdf' || att.type === 'file' || att.type === 'link') && (
                            <a href={att.url} target="_blank" rel="noopener" className="att-file-link">
                                <span className="att-file-icon">
                                    {att.type === 'pdf' ? <PdfIcon size={18} /> : att.type === 'link' ? <LinkIcon size={18} /> : <DocumentIcon size={18} />}
                                </span>
                                <div className="att-file-info">
                                    <span className="att-file-name">{att.title}</span>
                                    {att.file_size && <span className="att-file-size">{formatFileSize(att.file_size)}</span>}
                                </div>
                            </a>
                        )}
                        {isAdmin && (
                            <button className="att-delete-btn" onClick={() => handleDelete(att.id)} title="Remover">
                                <XIcon size={14} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
