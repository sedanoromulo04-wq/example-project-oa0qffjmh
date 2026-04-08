import type { JarvisStructuredResponse } from '../../lib/jarvisApi'

interface Props {
    response: JarvisStructuredResponse
}

function renderList(items: string[], emptyText: string) {
    if (items.length === 0) {
        return <span className="jarvis-list-empty">{emptyText}</span>
    }

    return (
        <div className="jarvis-chip-row">
            {items.map(item => (
                <span key={item} className="jarvis-chip">
                    {item}
                </span>
            ))}
        </div>
    )
}

export default function JarvisResponseCard({ response }: Props) {
    const riskClass = `jarvis-risk-badge ${response.approval_risk}`.trim()

    return (
        <section className="jarvis-response-card">
            <div className="jarvis-response-header">
                <div>
                    <p className="jarvis-kicker">Operational Brief</p>
                    <h3>{response.answer}</h3>
                </div>
                <span className={riskClass}>{response.approval_risk}</span>
            </div>

            <div className="jarvis-response-grid">
                <div className="jarvis-response-metric">
                    <label>Modulo</label>
                    <strong>{response.current_module}</strong>
                </div>
                <div className="jarvis-response-metric">
                    <label>Etapa</label>
                    <strong>{response.current_stage}</strong>
                </div>
                <div className="jarvis-response-metric">
                    <label>Intento</label>
                    <strong>{response.intent_type}</strong>
                </div>
                <div className="jarvis-response-metric">
                    <label>Confianca</label>
                    <strong>{response.confidence}</strong>
                </div>
            </div>

            <div className="jarvis-spotlight-panel">
                <label>Next Safe Action</label>
                <p>{response.next_safe_action}</p>
            </div>

            <div className="jarvis-detail-grid">
                <div className="jarvis-detail-card">
                    <label>Rota recomendada</label>
                    {renderList(response.recommended_route, 'Sem rota recomendada.')}
                </div>
                <div className="jarvis-detail-card">
                    <label>Acoes permitidas</label>
                    {renderList(response.allowed_actions, 'Sem acoes permitidas.')}
                </div>
                <div className="jarvis-detail-card warning">
                    <label>Acoes bloqueadas</label>
                    {renderList(response.blocked_actions, 'Sem bloqueios neste turno.')}
                </div>
                <div className="jarvis-detail-card warning">
                    <label>Dependencias ausentes</label>
                    {renderList(response.missing_upstream_assets, 'Nenhum upstream faltando.')}
                </div>
            </div>
        </section>
    )
}
