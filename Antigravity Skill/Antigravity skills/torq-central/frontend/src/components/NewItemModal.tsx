import { useState } from 'react'
import { XIcon } from './Icons'
import './NewItemModal.css'

interface Props {
    type: 'doc' | 'folder'
    onConfirm: (name: string) => void
    onClose: () => void
}

export default function NewItemModal({ type, onConfirm, onClose }: Props) {
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const handleConfirm = () => {
        if (!name.trim()) { setError('Nome obrigatório.'); return }
        onConfirm(name.trim())
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{type === 'doc' ? 'Novo Documento' : 'Nova Pasta'}</h3>
                    <button className="btn-ghost modal-close" onClick={onClose}>
                        <XIcon size={16} />
                    </button>
                </div>

                <div className="modal-field">
                    <label className="modal-label">
                        {type === 'doc' ? 'Título do documento' : 'Nome da pasta'}
                    </label>
                    <input
                        autoFocus
                        className="modal-input"
                        placeholder={type === 'doc' ? 'Ex: Manifesto da Empresa' : 'Ex: Recursos Humanos'}
                        value={name}
                        onChange={e => { setName(e.target.value); setError('') }}
                        onKeyDown={e => { if (e.key === 'Enter') handleConfirm(); if (e.key === 'Escape') onClose() }}
                    />
                    {error && <span className="modal-error">{error}</span>}
                </div>

                <div className="modal-actions">
                    <button className="btn-ghost" onClick={onClose}>Cancelar</button>
                    <button className="btn-primary" onClick={handleConfirm}>
                        {type === 'doc' ? 'Criar Documento' : 'Criar Pasta'}
                    </button>
                </div>
            </div>
        </div>
    )
}
