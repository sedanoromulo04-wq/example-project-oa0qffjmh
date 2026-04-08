const rawBaseUrl = import.meta.env.VITE_JARVIS_API_URL as string | undefined

export const JARVIS_API_URL = (rawBaseUrl?.replace(/\/$/, '') || 'http://localhost:8787')

export interface JarvisSession {
    id: string
    title: string | null
    status: string
    client_id: string | null
    created_at: string
    updated_at: string
    last_message?: string | null
}

export interface JarvisMessage {
    id: string
    session_id: string
    role: 'user' | 'assistant'
    input_mode: string | null
    content: string | null
    structured_payload: Record<string, unknown> | null
    created_at: string
}

export interface JarvisAction {
    id: string
    action_type: string
    target_table: string | null
    target_record_id: string | null
    status: string
    approval_required: boolean
    payload: Record<string, unknown> | null
    created_at: string
}

export interface JarvisActionReviewResult {
    sessionId: string
    decision: 'approve' | 'reject'
    reviewedActions: JarvisAction[]
    createdApprovalItems: Array<{
        id: string
        status: string
        risk_level: string | null
        created_at: string
        updated_at: string
    }>
}

export interface JarvisStructuredResponse {
    intent_type: string
    current_module: string
    current_stage: string
    recommended_route: string[]
    required_context: string[]
    missing_upstream_assets: string[]
    allowed_actions: string[]
    blocked_actions: string[]
    approval_risk: string
    next_safe_action: string
    answer: string
    confidence: string
    requested_mutations: Record<string, unknown>[]
    required_approvals: string[]
    evidence_refs: string[]
}

export interface JarvisContextSummary {
    workspace: { id: string; name: string | null; slug: string | null }
    operator: { id: string; name: string | null; email: string | null; role: string | null }
    client: Record<string, unknown> | null
    activeDoc: Record<string, unknown> | null
    stats: { activeJobs: number; activeApprovals: number; memoryEntries: number; knowledgeSources: number }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${JARVIS_API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers || {}),
        },
        ...init,
    })

    const payload = await response.json()
    if (!response.ok || payload.ok === false) {
        throw new Error(payload.error || 'Jarvis API request failed')
    }

    return payload as T
}

export async function listJarvisSessions(userId: string, userEmail?: string | null): Promise<JarvisSession[]> {
    const emailPart = userEmail ? `&user_email=${encodeURIComponent(userEmail)}` : ''
    const data = await request<{ ok: true; sessions: JarvisSession[] }>(`/api/jarvis/sessions?user_id=${encodeURIComponent(userId)}${emailPart}`)
    return data.sessions
}

export async function getJarvisSession(userId: string, sessionId: string, userEmail?: string | null) {
    const emailPart = userEmail ? `&user_email=${encodeURIComponent(userEmail)}` : ''
    return request<{ ok: true; session: JarvisSession; messages: JarvisMessage[]; actions: JarvisAction[] }>(
        `/api/jarvis/sessions/${encodeURIComponent(sessionId)}?user_id=${encodeURIComponent(userId)}${emailPart}`
    )
}

export async function sendJarvisMessage(payload: {
    session_id?: string | null
    user_id: string
    user_email?: string | null
    input_mode?: string
    message: string
    active_client_id?: string | null
    active_doc_id?: string | null
    ui_context?: Record<string, unknown>
}) {
    return request<{
        ok: true
        session: JarvisSession
        new_messages: JarvisMessage[]
        context_summary: JarvisContextSummary
        response: JarvisStructuredResponse
    }>('/api/jarvis/message', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
}

export async function reviewJarvisSessionActions(payload: {
    session_id: string
    user_id: string
    user_email?: string | null
    action_ids: string[]
    decision: 'approve' | 'reject'
    notes?: string
}) {
    return request<{
        ok: true
    } & JarvisActionReviewResult>(`/api/jarvis/sessions/${encodeURIComponent(payload.session_id)}/actions/review`, {
        method: 'POST',
        body: JSON.stringify(payload),
    })
}
