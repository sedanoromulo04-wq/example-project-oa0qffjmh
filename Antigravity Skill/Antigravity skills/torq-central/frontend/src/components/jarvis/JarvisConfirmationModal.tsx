import { useState } from 'react'
import type { JarvisAction, JarvisStructuredResponse } from '../../lib/jarvisApi'

interface Props {
    response: JarvisStructuredResponse
    actions: JarvisAction[]
    pendingHistoricalActions: number
    pending?: boolean
    onClose: () => void
    onDecision: (decision: 'approve' | 'reject', notes: string) => void
}

function stringifyValue(value: unknown) {
    if (typeof value === 'string') return value
    if (typeof value === 'number' || typeof value === 'boolean') return String(value)
    if (value === null || value === undefined) return 'n/a'

    try {
        return JSON.stringify(value)
    } catch {
        return '[unserializable]'
    }
}

export default function JarvisConfirmationModal({
    response,
    actions,
    pendingHistoricalActions,
    pending = false,
    onClose,
    onDecision,
}: Props) {
    const [notes, setNotes] = useState('')

    return (
        <div className="jarvis-modal-backdrop" role="presentation" onClick={onClose}>
            <section
                className="jarvis-confirmation-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Revisar proposta de mutacao"
                onClick={event => event.stopPropagation()}
            >
                <div className="jarvis-confirmation-head">
                    <div>
                        <p className="jarvis-kicker">Founder Consent</p>
                        <h3>Revisao visual da proposta antes de qualquer mutacao real.</h3>
                    </div>
                    <button type="button" className="btn-ghost" onClick={onClose} disabled={pending}>
                        Fechar
                    </button>
                </div>

                <div className="jarvis-confirmation-grid">
                    <div className="jarvis-confirmation-panel">
                        <label>Next safe action</label>
                        <p>{response.next_safe_action}</p>
                    </div>
                    <div className="jarvis-confirmation-panel">
                        <label>Lote em revisao</label>
                        <p>{actions.length} acao(oes) do turno atual</p>
                    </div>
                    <div className="jarvis-confirmation-panel">
                        <label>Required approvals</label>
                        <div className="jarvis-inline-list compact">
                            {response.required_approvals.length === 0 && (
                                <span className="jarvis-chip subtle">Sem aprovacoes adicionais</span>
                            )}
                            {response.required_approvals.map(item => (
                                <span key={item} className="jarvis-chip subtle">{item}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {pendingHistoricalActions > 0 && (
                    <div className="jarvis-confirmation-banner">
                        Existem {pendingHistoricalActions} proposta(s) antiga(s) pendentes nesta sessao. Elas nao serao
                        aprovadas por este modal.
                    </div>
                )}

                <div className="jarvis-confirmation-list">
                    {response.requested_mutations.map((mutation, index) => (
                        <article key={`mutation-review-${index}`} className="jarvis-confirmation-item">
                            <strong>Mutacao {index + 1}</strong>
                            <div className="jarvis-confirmation-fields">
                                {Object.entries(mutation).map(([key, value]) => (
                                    <div key={key} className="jarvis-confirmation-field">
                                        <label>{key}</label>
                                        <p>{stringifyValue(value)}</p>
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                <div className="jarvis-confirmation-notes">
                    <label htmlFor="jarvis-review-notes">Notas da decisao</label>
                    <textarea
                        id="jarvis-review-notes"
                        className="jarvis-review-textarea"
                        placeholder="Opcional: motivo da aprovacao ou rejeicao..."
                        value={notes}
                        onChange={event => setNotes(event.target.value)}
                    />
                </div>

                <div className="jarvis-confirmation-foot">
                    <p>A decisao agora persiste no backend, atualiza `jarvis_actions` e registra a trilha de auditoria.</p>
                    <div className="jarvis-confirmation-actions">
                        <button
                            type="button"
                            className="btn-ghost"
                            onClick={() => onDecision('reject', notes)}
                            disabled={pending}
                        >
                            {pending ? 'Processando...' : 'Rejeitar'}
                        </button>
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={() => onDecision('approve', notes)}
                            disabled={pending}
                        >
                            {pending ? 'Processando...' : 'Aprovar'}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
