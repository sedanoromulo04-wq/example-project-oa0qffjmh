const { query, withTransaction } = require('./db');
const { executeApprovedAction } = require('./actionExecutor');

function toSessionTitle(message) {
  return message.trim().replace(/\s+/g, ' ').slice(0, 72) || 'Nova sessao Jarvis';
}

async function getProfile(userId, userEmail = null) {
  const result = await query(
    `
      select
        p.id,
        p.workspace_id,
        p.full_name,
        p.email,
        coalesce(p.role, wm.membership_role, 'member') as role,
        w.name as workspace_name,
        w.slug as workspace_slug
      from public.profiles p
      left join public.workspaces w on w.id = p.workspace_id
      left join public.workspace_members wm
        on wm.workspace_id = p.workspace_id
       and wm.profile_id = p.id
      where ($1::uuid is not null and p.id = $1)
         or ($2::text is not null and lower(p.email) = lower($2))
      order by case when $1::uuid is not null and p.id = $1 then 0 else 1 end
      limit 1
    `,
    [userId || null, userEmail || null]
  );

  if (!result.rows[0]) {
    const error = new Error('Perfil nao encontrado no Torq runtime');
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
}

async function getClientState(workspaceId, clientId) {
  if (!clientId) {
    return null;
  }

  const result = await query(
    `
      select
        c.id,
        c.name,
        c.slug,
        c.segment,
        c.business_model,
        c.status,
        cos.current_module,
        cos.current_stage,
        cos.next_required_job_kind,
        cos.is_blocked,
        cos.block_reason,
        cos.last_transition_at
      from public.clients c
      left join public.client_operation_states cos on cos.client_id = c.id
      where c.id = $1
        and c.workspace_id = $2
      limit 1
    `,
    [clientId, workspaceId]
  );

  return result.rows[0] || null;
}

async function getDocContext(workspaceId, docId) {
  if (!docId) {
    return null;
  }

  const result = await query(
    `
      select
        d.id,
        d.title,
        d.status,
        d.approval_state,
        d.doc_type,
        d.tags,
        c.name as category_name,
        c.slug as category_slug
      from public.torq_docs d
      left join public.categories c on c.id = d.category_id
      where d.id = $1
        and d.workspace_id = $2
      limit 1
    `,
    [docId, workspaceId]
  );

  return result.rows[0] || null;
}

async function buildContextPack({ user_id, user_email, active_client_id, active_doc_id }) {
  const profile = await getProfile(user_id, user_email);

  const [clientState, activeDoc, jobs, approvals, memories, knowledgeSources] = await Promise.all([
    getClientState(profile.workspace_id, active_client_id),
    getDocContext(profile.workspace_id, active_doc_id),
    query(
      `
        select id, kind, module, status, approval_state, blocker_reason, updated_at
        from public.jobs
        where workspace_id = $1
          and ($2::uuid is null or client_id = $2)
        order by updated_at desc nulls last, created_at desc
        limit 8
      `,
      [profile.workspace_id, active_client_id || null]
    ),
    query(
      `
        select
          ai.id,
          ai.status,
          ai.risk_level,
          ai.updated_at,
          ar.title as artifact_title
        from public.approval_items ai
        left join public.artifact_registry ar on ar.id = ai.artifact_id
        where ai.workspace_id = $1
          and ($2::uuid is null or ai.client_id = $2)
        order by ai.updated_at desc, ai.created_at desc
        limit 5
      `,
      [profile.workspace_id, active_client_id || null]
    ),
    query(
      `
        select id, memory_type, title, summary, approved_for_retrieval, tags, updated_at
        from public.memory_entries
        where workspace_id = $1
          and approved_for_retrieval = true
          and ($2::uuid is null or client_id = $2)
        order by updated_at desc
        limit 5
      `,
      [profile.workspace_id, active_client_id || null]
    ),
    query(
      `
        select id, source_type, title, approval_state, metadata, created_at
        from public.knowledge_sources
        where workspace_id = $1
          and ($2::uuid is null or client_id = $2)
        order by created_at desc
        limit 5
      `,
      [profile.workspace_id, active_client_id || null]
    ),
  ]);

  return {
    profile,
    clientState,
    activeDoc,
    activeJobs: jobs.rows,
    activeApprovals: approvals.rows,
    memoryEntries: memories.rows,
    knowledgeSources: knowledgeSources.rows,
    governance: {
      nonNegotiables: [
        'Memory before volume',
        'Research before opinion',
        'Strategy before design',
        'Conversion before content',
        'Approval before distribution',
      ],
      mutationPolicy: 'No mutation without explicit operator confirmation.',
      publicationPolicy: 'External publication is never automatic.',
    },
  };
}

function summarizeContext(contextPack) {
  return {
    workspace: {
      id: contextPack.profile.workspace_id,
      name: contextPack.profile.workspace_name,
      slug: contextPack.profile.workspace_slug,
    },
    operator: {
      id: contextPack.profile.id,
      name: contextPack.profile.full_name,
      email: contextPack.profile.email,
      role: contextPack.profile.role,
    },
    client: contextPack.clientState,
    activeDoc: contextPack.activeDoc,
    stats: {
      activeJobs: contextPack.activeJobs.length,
      activeApprovals: contextPack.activeApprovals.length,
      memoryEntries: contextPack.memoryEntries.length,
      knowledgeSources: contextPack.knowledgeSources.length,
    },
  };
}

async function listSessionsForUser(userId, userEmail = null) {
  const profile = await getProfile(userId, userEmail);
  const result = await query(
    `
      select
        js.id,
        js.title,
        js.status,
        js.client_id,
        js.created_at,
        js.updated_at,
        (
          select jm.content
          from public.jarvis_messages jm
          where jm.session_id = js.id
          order by jm.created_at desc
          limit 1
        ) as last_message
      from public.jarvis_sessions js
      where js.workspace_id = $1
        and js.profile_id = $2
      order by js.updated_at desc, js.created_at desc
      limit 25
    `,
    [profile.workspace_id, userId]
  );

  return result.rows;
}

async function getSessionDetails(sessionId, userId, userEmail = null) {
  const profile = await getProfile(userId, userEmail);
  const [sessionRes, messagesRes, actionsRes] = await Promise.all([
    query(
      `
        select id, workspace_id, profile_id, client_id, title, status, created_at, updated_at
        from public.jarvis_sessions
        where id = $1
          and workspace_id = $2
          and profile_id = $3
        limit 1
      `,
      [sessionId, profile.workspace_id, userId]
    ),
    query(
      `
        select id, session_id, role, input_mode, content, structured_payload, created_at
        from public.jarvis_messages
        where session_id = $1
        order by created_at asc
      `,
      [sessionId]
    ),
    query(
      `
        select id, action_type, target_table, target_record_id, status, approval_required, payload, created_at
        from public.jarvis_actions
        where session_id = $1
        order by created_at desc
        limit 20
      `,
      [sessionId]
    ),
  ]);

  if (!sessionRes.rows[0]) {
    const error = new Error('Sessao Jarvis nao encontrada');
    error.statusCode = 404;
    throw error;
  }

  return {
    session: sessionRes.rows[0],
    messages: messagesRes.rows,
    actions: actionsRes.rows,
  };
}

async function reviewJarvisActions({ sessionId, actionIds, decision, notes, userId, userEmail = null }) {
  const profile = await getProfile(userId, userEmail);
  const normalizedDecision = decision === 'reject' ? 'reject' : 'approve';
  const nextStatus = normalizedDecision === 'approve' ? 'approved' : 'rejected';

  if (!Array.isArray(actionIds) || actionIds.length === 0) {
    const error = new Error('action_ids is required');
    error.statusCode = 400;
    throw error;
  }

  return withTransaction(async (client) => {
    const sessionRes = await client.query(
      `
        select id, workspace_id, profile_id, client_id, title
        from public.jarvis_sessions
        where id = $1
          and workspace_id = $2
          and profile_id = $3
        limit 1
      `,
      [sessionId, profile.workspace_id, profile.id]
    );

    const session = sessionRes.rows[0];
    if (!session) {
      const error = new Error('Sessao Jarvis nao encontrada para revisao');
      error.statusCode = 404;
      throw error;
    }

    const actionsRes = await client.query(
      `
        select id, action_type, target_table, target_record_id, status, approval_required, payload, created_at
        from public.jarvis_actions
        where session_id = $1
          and id = any($2::uuid[])
        order by created_at asc
      `,
      [sessionId, actionIds]
    );

    if (actionsRes.rows.length !== actionIds.length) {
      const error = new Error('Uma ou mais acoes nao foram encontradas nesta sessao');
      error.statusCode = 404;
      throw error;
    }

    for (const action of actionsRes.rows) {
      if (action.status !== 'proposed') {
        const error = new Error(`A acao ${action.id} nao esta mais em estado proposed`);
        error.statusCode = 409;
        throw error;
      }
    }

    const reviewedActions = [];
    const createdApprovalItems = [];
    const executionResults = [];

    for (const action of actionsRes.rows) {
      const payload = action.payload && typeof action.payload === 'object' ? action.payload : {};
      let resolvedStatus = nextStatus;
      let execution = null;

      if (normalizedDecision === 'approve' && action.approval_required) {
        const approvalItem = await client.query(
          `
            insert into public.approval_items (
              workspace_id,
              client_id,
              required_approver_profile_id,
              status,
              risk_level,
              review_payload
            )
            values ($1, $2, $3, 'approved', $4, $5)
            returning id, status, risk_level, created_at, updated_at
          `,
          [
            profile.workspace_id,
            session.client_id || null,
            profile.id,
            typeof payload.approval_risk === 'string' ? payload.approval_risk : null,
            {
              source: 'jarvis_action_review',
              session_id: sessionId,
              jarvis_action_id: action.id,
              action_type: action.action_type,
              target_table: action.target_table,
              target_record_id: action.target_record_id,
              notes: notes || null,
              payload,
            },
          ]
        );

        await client.query(
          `
            insert into public.approval_decisions (approval_item_id, decided_by, decision, notes)
            values ($1, $2, 'approved', $3)
          `,
          [approvalItem.rows[0].id, profile.id, notes || null]
        );

        createdApprovalItems.push(approvalItem.rows[0]);
      }

      if (normalizedDecision === 'approve') {
        const executed = await executeApprovedAction(client, {
          action,
          profile,
          session,
        });
        resolvedStatus = executed.status;
        execution = executed.execution;
        executionResults.push({
          action_id: action.id,
          ...executed,
        });
      }

      const nextPayload = {
        ...payload,
        review: {
          decision: normalizedDecision,
          notes: notes || null,
          reviewed_by: profile.id,
          reviewed_at: new Date().toISOString(),
        },
        execution,
      };

      const updatedAction = await client.query(
        `
          update public.jarvis_actions
          set status = $2,
              payload = $3
          where id = $1
          returning id, action_type, target_table, target_record_id, status, approval_required, payload, created_at
        `,
        [action.id, resolvedStatus, nextPayload]
      );

      reviewedActions.push(updatedAction.rows[0]);
    }

    await client.query(
      `
        insert into public.jarvis_messages (session_id, role, input_mode, content, structured_payload)
        values ($1, 'assistant', 'system', $2, $3)
      `,
      [
        sessionId,
        normalizedDecision === 'approve'
          ? `Operador aprovou ${reviewedActions.length} acao(oes) proposta(s).`
          : `Operador rejeitou ${reviewedActions.length} acao(oes) proposta(s).`,
        {
          event_type: 'jarvis_action_review',
          decision: normalizedDecision,
          action_ids: reviewedActions.map((item) => item.id),
          notes: notes || null,
          approval_items: createdApprovalItems,
          execution_results: executionResults,
        },
      ]
    );

    await client.query(
      `
        insert into public.activity_log (workspace_id, profile_id, action, entity_type, entity_id, entity_title, category_name, payload)
        values ($1, $2, $3, 'jarvis_session', $4, $5, 'jarvis', $6)
      `,
      [
        profile.workspace_id,
        profile.id,
        normalizedDecision === 'approve' ? 'jarvis_actions_approved' : 'jarvis_actions_rejected',
        sessionId,
        session.title || 'Jarvis Session',
        {
          action_ids: reviewedActions.map((item) => item.id),
          notes: notes || null,
          created_approval_items: createdApprovalItems.map((item) => item.id),
          execution_results: executionResults,
        },
      ]
    );

    return {
      sessionId,
      decision: normalizedDecision,
      reviewedActions,
      createdApprovalItems,
      executionResults,
    };
  });
}

async function processJarvisTurn({ envelope, normalizedResponse, runtimeMeta, contextPack }) {
  const profile = await getProfile(envelope.user_id, envelope.user_email || null);
  const sessionTitle = envelope.session_title || toSessionTitle(envelope.message);

  return withTransaction(async (client) => {
    const sessionRes = await client.query(
      envelope.session_id
        ? `
            select id, workspace_id, profile_id, client_id, title, status, created_at, updated_at
            from public.jarvis_sessions
            where id = $1
              and workspace_id = $2
              and profile_id = $3
            limit 1
          `
        : `
            insert into public.jarvis_sessions (workspace_id, profile_id, client_id, title, status)
            values ($1, $2, $3, $4, 'active')
            returning id, workspace_id, profile_id, client_id, title, status, created_at, updated_at
          `,
      envelope.session_id
        ? [envelope.session_id, profile.workspace_id, profile.id]
        : [profile.workspace_id, profile.id, envelope.active_client_id || null, sessionTitle]
    );

    const session = sessionRes.rows[0];
    if (!session) {
      const error = new Error('Sessao Jarvis nao encontrada para escrita');
      error.statusCode = 404;
      throw error;
    }

    await client.query(
      `
        update public.jarvis_sessions
        set client_id = coalesce($2, client_id),
            title = coalesce(title, $3),
            updated_at = now()
        where id = $1
      `,
      [session.id, envelope.active_client_id || null, sessionTitle]
    );

    const userMessage = await client.query(
      `
        insert into public.jarvis_messages (session_id, role, input_mode, content, structured_payload)
        values ($1, 'user', $2, $3, $4)
        returning id, session_id, role, input_mode, content, structured_payload, created_at
      `,
      [session.id, envelope.input_mode || 'text', envelope.message, envelope]
    );

    await client.query(
      `
        insert into public.agent_context_packs (session_id, client_id, current_module, current_stage, payload)
        values ($1, $2, $3, $4, $5)
      `,
      [
        session.id,
        envelope.active_client_id || null,
        contextPack.clientState?.current_module || normalizedResponse.current_module || null,
        contextPack.clientState?.current_stage || normalizedResponse.current_stage || null,
        contextPack,
      ]
    );

    const agentRun = await client.query(
      `
        insert into public.agent_runs (session_id, agent_name, module, status, context_pack, result_payload, finished_at)
        values ($1, $2, $3, $4, $5, $6, now())
        returning id, session_id, agent_name, module, status, created_at, finished_at
      `,
      [
        session.id,
        runtimeMeta.agent,
        normalizedResponse.current_module || null,
        runtimeMeta.status,
        contextPack,
        { runtime: runtimeMeta, response: normalizedResponse },
      ]
    );

    const assistantMessage = await client.query(
      `
        insert into public.jarvis_messages (session_id, role, input_mode, content, structured_payload)
        values ($1, 'assistant', 'text', $2, $3)
        returning id, session_id, role, input_mode, content, structured_payload, created_at
      `,
      [session.id, normalizedResponse.answer, normalizedResponse]
    );

    for (const mutation of normalizedResponse.requested_mutations || []) {
      await client.query(
        `
          insert into public.jarvis_actions (
            session_id,
            agent_run_id,
            action_type,
            target_table,
            target_record_id,
            status,
            approval_required,
            payload
          )
          values ($1, $2, $3, $4, $5, 'proposed', $6, $7)
        `,
        [
          session.id,
          agentRun.rows[0].id,
          mutation.action_type || 'proposed_action',
          mutation.target_table || null,
          mutation.target_record_id || null,
          mutation.approval_required !== false,
          mutation,
        ]
      );
    }

    await client.query(
      `
        insert into public.activity_log (workspace_id, profile_id, action, entity_type, entity_id, entity_title, category_name, payload)
        values ($1, $2, 'jarvis_message_processed', 'jarvis_session', $3, $4, 'jarvis', $5)
      `,
      [
        profile.workspace_id,
        profile.id,
        session.id,
        session.title || sessionTitle,
        {
          sessionTitle,
          intent_type: normalizedResponse.intent_type,
          current_module: normalizedResponse.current_module,
          current_stage: normalizedResponse.current_stage,
          approval_risk: normalizedResponse.approval_risk,
        },
      ]
    );

    return {
      session: {
        ...session,
        title: session.title || sessionTitle,
      },
      messages: [userMessage.rows[0], assistantMessage.rows[0]],
      agentRun: agentRun.rows[0],
      contextSummary: summarizeContext(contextPack),
    };
  });
}

module.exports = {
  buildContextPack,
  getSessionDetails,
  getProfile,
  listSessionsForUser,
  processJarvisTurn,
  reviewJarvisActions,
  summarizeContext,
  toSessionTitle,
};
