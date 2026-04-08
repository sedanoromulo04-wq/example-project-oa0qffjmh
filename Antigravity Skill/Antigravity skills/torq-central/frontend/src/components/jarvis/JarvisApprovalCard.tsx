import type { JarvisAction, JarvisStructuredResponse } from '../../lib/jarvisApi'

interface Props {
    response: JarvisStructuredResponse
    reviewableActions: JarvisAction[]
    pendingHistoricalActions: number
    onReview: () => void
}

function summarizeMutation(mutation: Record<string, unknown>, index: number) {
    const action =
        (typeof mutation.action_type === 'string' && mutation.action_type) ||
        (typeof mutation.type === 'string' && mutation.type) ||
        `mutation-${index + 1}`

    const target =
        (typeof mutation.target_table === 'string' && mutation.target_table) ||
        (typeof mutation.table === 'string' && mutation.table) ||
        'sem-tabela'

    return { action, target }
}

export default function JarvisApprovalCard({ response, reviewableActions, pendingHistoricalActions, onReview }: Props) {
    return (
        <section className="jarvis-approval-card">
            <div className="jarvis-approval-header">
                <div>
                    <p className="jarvis-kicker">Approval Layer</p>
                    <h3>Existe proposta de mutacao e ela precisa de revisao humana antes de seguir.</h3>
                </div>
                <button type="button" className="btn-primary" onClick={onReview}>
                    Revisar proposta
                </button>
            </div>

            <div className="jarvis-approval-summary">
                <div className="jarvis-mini-metric">
                    <label>Lote atual</label>
                    <strong>{reviewableActions.length}</strong>
                </div>
                <div className="jarvis-mini-metric">
                    <label>Mutacoes do turno</label>
                    <strong>{response.requested_mutations.length}</strong>
                </div>
                <div className="jarvis-mini-metric">
                    <label>Approval risk</label>
                    <strong>{response.approval_risk}</strong>
                </div>
            </div>

            {pendingHistoricalActions > 0 && (
                <p className="jarvis-approval-note">
                    Existem {pendingHistoricalActions} proposta(s) pendente(s) de turnos anteriores. Esta revisao atua
                    apenas no lote atual.
                </p>
            )}

            <div className="jarvis-mutation-list">
                {response.requested_mutations.map((mutation, index) => {
                    const summary = summarizeMutation(mutation, index)

                    return (
                        <div key={`${summary.action}-${index}`} className="jarvis-mutation-item">
                            <strong>{summary.action}</strong>
                            <span>{summary.target}</span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
