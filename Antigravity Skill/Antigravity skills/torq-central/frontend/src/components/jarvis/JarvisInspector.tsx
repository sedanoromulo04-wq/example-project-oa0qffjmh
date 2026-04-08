import type {
  JarvisAction,
  JarvisContextSummary,
  JarvisStructuredResponse,
} from '../../lib/jarvisApi'

interface Props {
  responseCard: JarvisStructuredResponse | null
  contextSummary: JarvisContextSummary | null
  actions: JarvisAction[]
  activeActionIds: string[]
}

function renderSimpleList(items: string[], emptyText: string, className = 'jarvis-inline-list') {
  if (items.length === 0) {
    return <p className="jarvis-empty">{emptyText}</p>
  }

  return (
    <div className={className}>
      {items.map((item) => (
        <span key={item} className="jarvis-chip subtle">
          {item}
        </span>
      ))}
    </div>
  )
}

export default function JarvisInspector({
  responseCard,
  contextSummary,
  actions,
  activeActionIds,
}: Props) {
  return (
    <>
      <section className="jarvis-card">
        <div className="jarvis-panel-head">
          <h2>Leitura operacional</h2>
        </div>
        {!responseCard && <p className="jarvis-empty">A resposta estruturada aparece aqui.</p>}
        {responseCard && (
          <div className="jarvis-stack">
            <div>
              <label>Intento</label>
              <strong>{responseCard.intent_type}</strong>
            </div>
            <div>
              <label>Modulo</label>
              <strong>{responseCard.current_module}</strong>
            </div>
            <div>
              <label>Etapa</label>
              <strong>{responseCard.current_stage}</strong>
            </div>
            <div>
              <label>Risco de aprovacao</label>
              <strong>{responseCard.approval_risk}</strong>
            </div>
            <div>
              <label>Proximo passo seguro</label>
              <p>{responseCard.next_safe_action}</p>
            </div>
          </div>
        )}
      </section>

      <section className="jarvis-card">
        <div className="jarvis-panel-head">
          <h2>Contexto runtime</h2>
        </div>
        {!contextSummary && (
          <p className="jarvis-empty">O resumo de contexto carregado do Supabase aparece aqui.</p>
        )}
        {contextSummary && (
          <div className="jarvis-stack">
            <div>
              <label>Workspace</label>
              <strong>
                {contextSummary.workspace.name || contextSummary.workspace.slug || 'Sem workspace'}
              </strong>
            </div>
            <div>
              <label>Operador</label>
              <strong>
                {contextSummary.operator.email || contextSummary.operator.name || 'Sem operador'}
              </strong>
            </div>
            <div>
              <label>Role</label>
              <strong>{contextSummary.operator.role || 'Sem role'}</strong>
            </div>
            <div className="jarvis-metrics-grid">
              <div>
                <label>Jobs ativos</label>
                <strong>{contextSummary.stats.activeJobs}</strong>
              </div>
              <div>
                <label>Aprovacoes</label>
                <strong>{contextSummary.stats.activeApprovals}</strong>
              </div>
              <div>
                <label>Memorias</label>
                <strong>{contextSummary.stats.memoryEntries}</strong>
              </div>
              <div>
                <label>Knowledge</label>
                <strong>{contextSummary.stats.knowledgeSources}</strong>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="jarvis-card">
        <div className="jarvis-panel-head">
          <h2>Policy & evidence</h2>
        </div>
        {!responseCard && (
          <p className="jarvis-empty">Allowed actions, approvals e evidence refs aparecem aqui.</p>
        )}
        {responseCard && (
          <div className="jarvis-stack">
            <div>
              <label>Required context</label>
              {renderSimpleList(responseCard.required_context, 'Sem contexto adicional exigido.')}
            </div>
            <div>
              <label>Required approvals</label>
              {renderSimpleList(
                responseCard.required_approvals,
                'Sem aprovacoes adicionais.',
                'jarvis-inline-list compact',
              )}
            </div>
            <div>
              <label>Evidence refs</label>
              {renderSimpleList(
                responseCard.evidence_refs,
                'Sem refs explicitadas.',
                'jarvis-inline-list compact',
              )}
            </div>
          </div>
        )}
      </section>

      <section className="jarvis-card">
        <div className="jarvis-panel-head">
          <h2>Acoes propostas</h2>
        </div>
        {actions.length === 0 && (
          <p className="jarvis-empty">Nenhuma mutacao proposta ate agora.</p>
        )}
        <div className="jarvis-action-list">
          {actions.map((action) => (
            <div
              key={action.id}
              className={`jarvis-action-item${activeActionIds.includes(action.id) ? ' active-batch' : ''}`}
            >
              <div className="jarvis-action-topline">
                <strong>{action.action_type}</strong>
                <span
                  className={`jarvis-action-status ${action.approval_required ? 'approval' : 'safe'}`}
                >
                  {action.approval_required ? 'approval gate' : 'draft-safe'}
                </span>
              </div>
              <span>{action.target_table || 'sem tabela alvo'}</span>
              <span>
                {action.agent_run_id
                  ? `run ${action.agent_run_id.slice(0, 8)}`
                  : 'run nao vinculado'}
              </span>
              <span>{action.status}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
