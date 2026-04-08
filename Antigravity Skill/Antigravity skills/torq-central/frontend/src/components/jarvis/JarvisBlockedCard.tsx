import type { JarvisStructuredResponse } from '../../lib/jarvisApi'

interface Props {
    response: JarvisStructuredResponse
}

function renderList(items: string[], emptyText: string) {
    if (items.length === 0) {
        return <p className="jarvis-list-empty">{emptyText}</p>
    }

    return (
        <div className="jarvis-inline-list">
            {items.map(item => (
                <span key={item} className="jarvis-chip warning">
                    {item}
                </span>
            ))}
        </div>
    )
}

export default function JarvisBlockedCard({ response }: Props) {
    return (
        <section className="jarvis-blocked-card">
            <div className="jarvis-blocked-header">
                <div>
                    <p className="jarvis-kicker">Governance Block</p>
                    <h3>O sistema detectou dependencias ou acoes que nao podem avancar agora.</h3>
                </div>
                <span className="jarvis-risk-badge blocked">{response.approval_risk}</span>
            </div>

            <div className="jarvis-detail-grid">
                <div className="jarvis-detail-card warning">
                    <label>Blocked actions</label>
                    {renderList(response.blocked_actions, 'Nenhuma acao bloqueada explicitada.')}
                </div>

                <div className="jarvis-detail-card warning">
                    <label>Missing upstream assets</label>
                    {renderList(response.missing_upstream_assets, 'Nenhum upstream faltando.')}
                </div>
            </div>

            <div className="jarvis-spotlight-panel blocked">
                <label>Next Safe Action</label>
                <p>{response.next_safe_action}</p>
            </div>
        </section>
    )
}
