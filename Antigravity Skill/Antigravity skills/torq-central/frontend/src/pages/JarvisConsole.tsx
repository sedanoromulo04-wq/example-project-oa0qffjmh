import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  type JarvisAction,
  type JarvisContextSummary,
  type JarvisMessage,
  type JarvisSession,
  type JarvisStructuredResponse,
  getJarvisSession,
  listJarvisSessions,
  reviewJarvisSessionActions,
  sendJarvisMessage,
} from '../lib/jarvisApi'
import JarvisEmptyState from '../components/jarvis/JarvisEmptyState'
import JarvisThinkingCard from '../components/jarvis/JarvisThinkingCard'
import JarvisResponseCard from '../components/jarvis/JarvisResponseCard'
import JarvisInspector from '../components/jarvis/JarvisInspector'
import JarvisBlockedCard from '../components/jarvis/JarvisBlockedCard'
import JarvisApprovalCard from '../components/jarvis/JarvisApprovalCard'
import JarvisConfirmationModal from '../components/jarvis/JarvisConfirmationModal'
import JarvisVoicePreview from '../components/jarvis/JarvisVoicePreview'
import '../components/jarvis/JarvisPanels.css'
import './JarvisConsole.css'

function formatTime(value: string) {
  return new Date(value).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatRole(role: JarvisMessage['role']) {
  return role === 'user' ? 'Operador' : 'Jarvis'
}

export default function JarvisConsole() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<JarvisSession[]>([])
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<JarvisMessage[]>([])
  const [actions, setActions] = useState<JarvisAction[]>([])
  const [responseCard, setResponseCard] = useState<JarvisStructuredResponse | null>(null)
  const [contextSummary, setContextSummary] = useState<JarvisContextSummary | null>(null)
  const [composer, setComposer] = useState('')
  const [loading, setLoading] = useState(false)
  const [bootLoading, setBootLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [approvalOpen, setApprovalOpen] = useState(false)
  const [reviewLoading, setReviewLoading] = useState(false)

  const selectedSession = useMemo(
    () => sessions.find((session) => session.id === selectedSessionId) || null,
    [sessions, selectedSessionId],
  )
  const proposedActions = useMemo(
    () => actions.filter((action) => action.status === 'proposed'),
    [actions],
  )
  const activeReviewAgentRunId =
    proposedActions.find((action) => action.agent_run_id)?.agent_run_id || null
  const reviewableActions = useMemo(() => {
    if (proposedActions.length === 0) return []
    if (!activeReviewAgentRunId) return [proposedActions[0]]
    return proposedActions.filter((action) => action.agent_run_id === activeReviewAgentRunId)
  }, [proposedActions, activeReviewAgentRunId])
  const reviewableActionIds = reviewableActions.map((action) => action.id)
  const pendingHistoricalActions = Math.max(proposedActions.length - reviewableActions.length, 0)
  const hasBlockedState = Boolean(
    responseCard &&
    (responseCard.blocked_actions.length > 0 || responseCard.missing_upstream_assets.length > 0),
  )
  const hasApprovalState = Boolean(responseCard && reviewableActionIds.length > 0)

  const refreshSessions = async (preferredSessionId?: string | null) => {
    if (!user) return

    const items = await listJarvisSessions(user.id, user.email)
    setSessions(items)

    if (preferredSessionId) {
      setSelectedSessionId(preferredSessionId)
      return
    }

    setSelectedSessionId((current) => current || items[0]?.id || null)
  }

  const loadSession = async (sessionId: string) => {
    if (!user) return

    const data = await getJarvisSession(user.id, sessionId, user.email)
    setSelectedSessionId(sessionId)
    setMessages(data.messages)
    setActions(data.actions)

    const lastAssistant = [...data.messages]
      .reverse()
      .find((message) => message.role === 'assistant')
    const structured = lastAssistant?.structured_payload as JarvisStructuredResponse | null
    setResponseCard(structured || null)
  }

  useEffect(() => {
    if (!user) return

    setBootLoading(true)
    refreshSessions()
      .catch((err) => setError(err.message))
      .finally(() => setBootLoading(false))
  }, [user?.id])

  useEffect(() => {
    if (!selectedSessionId || !user) {
      setMessages([])
      setActions([])
      setResponseCard(null)
      return
    }

    loadSession(selectedSessionId).catch((err) => setError(err.message))
  }, [selectedSessionId, user?.id])

  const handleNewSession = () => {
    setSelectedSessionId(null)
    setMessages([])
    setActions([])
    setResponseCard(null)
    setContextSummary(null)
    setComposer('')
    setError(null)
    setApprovalOpen(false)
  }

  const handlePromptSelect = (prompt: string) => {
    setComposer(prompt)
  }

  const handleSubmit = async () => {
    if (!user || !composer.trim() || loading) return

    setLoading(true)
    setError(null)

    try {
      const result = await sendJarvisMessage({
        session_id: selectedSessionId,
        user_id: user.id,
        user_email: user.email,
        input_mode: 'text',
        message: composer.trim(),
        ui_context: {
          route: '/jarvis',
        },
      })

      setComposer('')
      setContextSummary(result.context_summary)
      setResponseCard(result.response)
      await refreshSessions(result.session.id)
      await loadSession(result.session.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao consultar o Jarvis')
    } finally {
      setLoading(false)
    }
  }

  const handleReviewDecision = async (decision: 'approve' | 'reject', notes: string) => {
    if (!user || !selectedSessionId || reviewableActionIds.length === 0 || reviewLoading) return

    setReviewLoading(true)
    setError(null)

    try {
      await reviewJarvisSessionActions({
        session_id: selectedSessionId,
        user_id: user.id,
        user_email: user.email,
        action_ids: reviewableActionIds,
        decision,
        notes,
      })

      await refreshSessions(selectedSessionId)
      await loadSession(selectedSessionId)
      setApprovalOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao revisar acoes do Jarvis')
    } finally {
      setReviewLoading(false)
    }
  }

  return (
    <div className="jarvis-page">
      <header className="jarvis-header">
        <div className="jarvis-header-copy">
          <p className="jarvis-eyebrow">Torq Jarvis</p>
          <h1>Executive mission control para orquestracao do sistema.</h1>
          <p className="jarvis-subtitle">
            O cockpit opera em texto primeiro, mostra rota, blockers, approvals e o proximo passo
            seguro antes de qualquer mutacao.
          </p>
        </div>

        <div className="jarvis-header-actions">
          <span className="jarvis-badge">text-first governance</span>
          {responseCard && (
            <span className="jarvis-badge subtle">{responseCard.current_module}</span>
          )}
          <button className="btn-primary" onClick={handleNewSession}>
            Nova sessao
          </button>
        </div>
      </header>

      {error && <div className="jarvis-error">{error}</div>}

      <div className="jarvis-layout">
        <aside className="jarvis-sessions">
          <div className="jarvis-panel-head">
            <div>
              <h2>Sessoes</h2>
              <p>Historico de operacao e continuidade de contexto.</p>
            </div>
            <span>{sessions.length}</span>
          </div>

          <div className="jarvis-session-summary">
            <div>
              <label>Operador</label>
              <strong>{user?.email || 'Sem operador'}</strong>
            </div>
            <div>
              <label>Status</label>
              <strong>{selectedSession?.status || 'new-session'}</strong>
            </div>
          </div>

          {bootLoading && <p className="jarvis-empty">Carregando sessoes...</p>}
          {!bootLoading && sessions.length === 0 && (
            <p className="jarvis-empty">
              Nenhuma sessao ainda. Envie a primeira pergunta ao Jarvis.
            </p>
          )}

          <div className="jarvis-session-list">
            {sessions.map((session) => (
              <button
                key={session.id}
                className={`jarvis-session-item${session.id === selectedSessionId ? ' active' : ''}`}
                onClick={() => setSelectedSessionId(session.id)}
              >
                <div className="jarvis-session-topline">
                  <strong>{session.title || 'Sessao sem titulo'}</strong>
                  <time>{formatTime(session.updated_at)}</time>
                </div>
                <span>{session.last_message || 'Sem mensagens ainda.'}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="jarvis-chat">
          <div className="jarvis-main-stack">
            {!loading && !responseCard && messages.length === 0 && (
              <JarvisEmptyState onPromptSelect={handlePromptSelect} />
            )}

            {loading && <JarvisThinkingCard />}

            {responseCard && <JarvisResponseCard response={responseCard} />}
            {responseCard && hasBlockedState && <JarvisBlockedCard response={responseCard} />}
            {responseCard && hasApprovalState && (
              <JarvisApprovalCard
                response={responseCard}
                reviewableActions={reviewableActions}
                pendingHistoricalActions={pendingHistoricalActions}
                onReview={() => setApprovalOpen(true)}
              />
            )}

            <section className="jarvis-transcript-shell">
              <div className="jarvis-panel-head">
                <div>
                  <h2>{selectedSession?.title || 'Nova sessao'}</h2>
                  <p>
                    {selectedSession
                      ? 'Transcript, memoria da sessao e briefing operacional.'
                      : 'Use este painel para conversar com o orquestrador.'}
                  </p>
                </div>
                <span>{messages.length} msgs</span>
              </div>

              <div className="jarvis-transcript">
                {messages.length === 0 && (
                  <div className="jarvis-empty-card">
                    <h3>Primeiro movimento recomendado</h3>
                    <p>
                      Pergunte em linguagem natural. Exemplo: "Qual o proximo movimento seguro para
                      este cliente?"
                    </p>
                  </div>
                )}

                {messages.map((message) => (
                  <article key={message.id} className={`jarvis-message ${message.role}`}>
                    <div className="jarvis-message-meta">
                      <span>{formatRole(message.role)}</span>
                      <time>{formatTime(message.created_at)}</time>
                    </div>
                    <p>{message.content}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="jarvis-composer">
            <div className="jarvis-composer-head">
              <div>
                <p className="jarvis-kicker">Command Composer</p>
                <strong>Diagnostique, planeje ou proponha uma acao controlada.</strong>
              </div>
              <span>Ctrl/Cmd + Enter</span>
            </div>

            <textarea
              value={composer}
              onChange={(event) => setComposer(event.target.value)}
              placeholder="Pergunte o que o Jarvis deve diagnosticar, planejar ou orquestrar..."
              rows={5}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                  event.preventDefault()
                  void handleSubmit()
                }
              }}
            />

            <JarvisVoicePreview />

            <div className="jarvis-composer-actions">
              <div className="jarvis-composer-note">
                Sem publicacao automatica, sem pular etapa, sem mutacao silenciosa.
              </div>
              <button
                className="btn-primary"
                onClick={() => void handleSubmit()}
                disabled={loading}
              >
                {loading ? 'Orquestrando...' : 'Enviar ao Jarvis'}
              </button>
            </div>
          </div>
        </section>

        <aside className="jarvis-inspector">
          <JarvisInspector
            responseCard={responseCard}
            contextSummary={contextSummary}
            actions={actions}
            activeActionIds={reviewableActionIds}
          />
        </aside>
      </div>

      {approvalOpen && responseCard && (
        <JarvisConfirmationModal
          response={responseCard}
          actions={reviewableActions}
          pendingHistoricalActions={pendingHistoricalActions}
          pending={reviewLoading}
          onClose={() => setApprovalOpen(false)}
          onDecision={handleReviewDecision}
        />
      )}
    </div>
  )
}
