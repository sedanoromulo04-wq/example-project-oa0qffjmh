function asPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function pick(source, keys) {
  const out = {};
  for (const key of keys) {
    if (source[key] !== undefined) {
      out[key] = source[key];
    }
  }
  return out;
}

function mergeMutationData(payload) {
  const source = asPlainObject(payload);
  return {
    ...pick(source, [
      'client_id',
      'kind',
      'module',
      'status',
      'approval_state',
      'owner_profile_id',
      'source_record_id',
      'input_payload',
      'output_payload',
      'blocker_reason',
      'artifact_type',
      'title',
      'storage_mode',
      'doc_id',
      'json_payload',
      'job_id',
      'destination_channel',
      'scheduled_for',
      'metadata',
      'current_module',
      'current_stage',
      'next_required_job_kind',
      'approval_owner_profile_id',
      'is_blocked',
      'block_reason',
      'client_stage',
    ]),
    ...asPlainObject(source.values),
    ...asPlainObject(source.record),
    ...asPlainObject(source.data),
    ...asPlainObject(source.changes),
    ...asPlainObject(source.transition),
  };
}

async function executeCreateJob(client, { payload, profile, session }) {
  const data = mergeMutationData(payload);
  if (!data.kind || !data.module) {
    return {
      status: 'execution_failed',
      execution: { reason: 'jobs create requires kind and module' },
    };
  }

  const res = await client.query(
    `
      insert into public.jobs (
        workspace_id,
        client_id,
        kind,
        module,
        status,
        approval_state,
        owner_profile_id,
        source_record_id,
        input_payload,
        output_payload,
        blocker_reason,
        created_by
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      returning id
    `,
    [
      profile.workspace_id,
      data.client_id || session.client_id || null,
      data.kind,
      data.module,
      data.status || 'draft',
      data.approval_state || 'draft',
      data.owner_profile_id || profile.id,
      data.source_record_id || null,
      data.input_payload || null,
      data.output_payload || null,
      data.blocker_reason || null,
      profile.id,
    ]
  );

  return {
    status: 'executed',
    execution: {
      executor: 'create_record:jobs',
      record_id: res.rows[0].id,
    },
  };
}

async function executeUpdateJob(client, { action, payload, profile }) {
  const data = mergeMutationData(payload);
  if (!action.target_record_id) {
    return {
      status: 'execution_failed',
      execution: { reason: 'jobs update requires target_record_id' },
    };
  }

  const allowed = pick(data, [
    'kind',
    'module',
    'status',
    'approval_state',
    'owner_profile_id',
    'source_record_id',
    'input_payload',
    'output_payload',
    'blocker_reason',
  ]);

  if (Object.keys(allowed).length === 0) {
    return {
      status: 'execution_failed',
      execution: { reason: 'jobs update requires at least one allowed field' },
    };
  }

  const setFragments = [];
  const values = [];
  let index = 1;
  for (const [key, value] of Object.entries(allowed)) {
    setFragments.push(`${key} = $${index++}`);
    values.push(value);
  }
  setFragments.push(`updated_at = now()`);
  values.push(action.target_record_id, profile.workspace_id);

  const res = await client.query(
    `
      update public.jobs
      set ${setFragments.join(', ')}
      where id = $${index++}
        and workspace_id = $${index}
      returning id
    `,
    values
  );

  if (!res.rows[0]) {
    return {
      status: 'execution_failed',
      execution: { reason: 'target job not found in workspace' },
    };
  }

  return {
    status: 'executed',
    execution: {
      executor: 'update_record:jobs',
      record_id: res.rows[0].id,
    },
  };
}

async function executeCreateArtifact(client, { payload, profile, session }) {
  const data = mergeMutationData(payload);
  if (!data.artifact_type) {
    return {
      status: 'execution_failed',
      execution: { reason: 'artifact create requires artifact_type' },
    };
  }

  const res = await client.query(
    `
      insert into public.artifact_registry (
        workspace_id,
        client_id,
        job_id,
        artifact_type,
        title,
        approval_state,
        storage_mode,
        doc_id,
        json_payload
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning id
    `,
    [
      profile.workspace_id,
      data.client_id || session.client_id || null,
      data.job_id || null,
      data.artifact_type,
      data.title || null,
      data.approval_state || 'draft',
      data.storage_mode || null,
      data.doc_id || null,
      data.json_payload || null,
    ]
  );

  return {
    status: 'executed',
    execution: {
      executor: 'create_record:artifact_registry',
      record_id: res.rows[0].id,
    },
  };
}

async function executeUpdateArtifact(client, { action, payload, profile }) {
  const data = mergeMutationData(payload);
  if (!action.target_record_id) {
    return {
      status: 'execution_failed',
      execution: { reason: 'artifact update requires target_record_id' },
    };
  }

  const allowed = pick(data, [
    'job_id',
    'artifact_type',
    'title',
    'approval_state',
    'storage_mode',
    'doc_id',
    'json_payload',
  ]);

  if (Object.keys(allowed).length === 0) {
    return {
      status: 'execution_failed',
      execution: { reason: 'artifact update requires at least one allowed field' },
    };
  }

  const setFragments = [];
  const values = [];
  let index = 1;
  for (const [key, value] of Object.entries(allowed)) {
    setFragments.push(`${key} = $${index++}`);
    values.push(value);
  }
  setFragments.push(`updated_at = now()`);
  values.push(action.target_record_id, profile.workspace_id);

  const res = await client.query(
    `
      update public.artifact_registry
      set ${setFragments.join(', ')}
      where id = $${index++}
        and workspace_id = $${index}
      returning id
    `,
    values
  );

  if (!res.rows[0]) {
    return {
      status: 'execution_failed',
      execution: { reason: 'target artifact not found in workspace' },
    };
  }

  return {
    status: 'executed',
    execution: {
      executor: 'update_record:artifact_registry',
      record_id: res.rows[0].id,
    },
  };
}

async function executeTransition(client, { payload, profile, session }) {
  const data = mergeMutationData(payload);
  const clientId = data.client_id || session.client_id || null;
  if (!clientId) {
    return {
      status: 'execution_failed',
      execution: { reason: 'transition requires client_id' },
    };
  }

  const current = await client.query(
    `
      select client_id, current_module, current_stage
      from public.client_operation_states
      where client_id = $1
        and workspace_id = $2
      limit 1
    `,
    [clientId, profile.workspace_id]
  );

  const prev = current.rows[0] || null;

  await client.query(
    `
      insert into public.client_operation_states (
        client_id,
        workspace_id,
        current_module,
        current_stage,
        next_required_job_kind,
        approval_owner_profile_id,
        is_blocked,
        block_reason,
        last_transition_at
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, now())
      on conflict (client_id) do update
      set current_module = excluded.current_module,
          current_stage = excluded.current_stage,
          next_required_job_kind = excluded.next_required_job_kind,
          approval_owner_profile_id = excluded.approval_owner_profile_id,
          is_blocked = excluded.is_blocked,
          block_reason = excluded.block_reason,
          last_transition_at = now(),
          updated_at = now()
    `,
    [
      clientId,
      profile.workspace_id,
      data.current_module || prev?.current_module || null,
      data.current_stage || data.client_stage || prev?.current_stage || null,
      data.next_required_job_kind || null,
      data.approval_owner_profile_id || profile.id,
      data.is_blocked === true,
      data.block_reason || null,
    ]
  );

  const nextStage = data.current_stage || data.client_stage || prev?.current_stage || null;
  if (nextStage && nextStage !== prev?.current_stage) {
    await client.query(
      `
        insert into public.client_stage_history (client_id, from_stage, to_stage, transition_reason, changed_by)
        values ($1, $2, $3, $4, $5)
      `,
      [clientId, prev?.current_stage || null, nextStage, data.reason || 'Approved via Jarvis action review', profile.id]
    );
  }

  return {
    status: 'executed',
    execution: {
      executor: 'propose_transition:client_operation_states',
      record_id: clientId,
      previous_stage: prev?.current_stage || null,
      next_stage: nextStage,
    },
  };
}

async function executeDistributionJob(client, { payload, profile, session }) {
  const data = mergeMutationData(payload);
  if (!data.artifact_id || !data.destination_channel) {
    return {
      status: 'execution_failed',
      execution: { reason: 'distribution queue requires artifact_id and destination_channel' },
    };
  }

  const res = await client.query(
    `
      insert into public.distribution_jobs (
        workspace_id,
        client_id,
        artifact_id,
        destination_channel,
        status,
        scheduled_for,
        metadata
      )
      values ($1, $2, $3, $4, $5, $6, $7)
      returning id
    `,
    [
      profile.workspace_id,
      data.client_id || session.client_id || null,
      data.artifact_id,
      data.destination_channel,
      data.status || 'draft',
      data.scheduled_for || null,
      data.metadata || null,
    ]
  );

  await client.query(
    `
      insert into public.distribution_events (distribution_job_id, event_type, payload)
      values ($1, 'created_via_jarvis', $2)
    `,
    [res.rows[0].id, { source: 'jarvis_action_review', payload: data }]
  );

  return {
    status: 'executed',
    execution: {
      executor: 'queue_action:distribution_jobs',
      record_id: res.rows[0].id,
    },
  };
}

async function executeApprovedAction(client, { action, profile, session }) {
  const payload = asPlainObject(action.payload);

  if (action.action_type === 'create_record' && action.target_table === 'jobs') {
    return executeCreateJob(client, { action, payload, profile, session });
  }

  if (action.action_type === 'update_record' && action.target_table === 'jobs') {
    return executeUpdateJob(client, { action, payload, profile, session });
  }

  if (action.action_type === 'create_record' && action.target_table === 'artifact_registry') {
    return executeCreateArtifact(client, { action, payload, profile, session });
  }

  if (action.action_type === 'update_record' && action.target_table === 'artifact_registry') {
    return executeUpdateArtifact(client, { action, payload, profile, session });
  }

  if (
    action.action_type === 'propose_transition' ||
    (action.action_type === 'update_record' && action.target_table === 'client_operation_states')
  ) {
    return executeTransition(client, { action, payload, profile, session });
  }

  if (
    action.action_type === 'queue_action' ||
    (action.action_type === 'create_record' && action.target_table === 'distribution_jobs')
  ) {
    return executeDistributionJob(client, { action, payload, profile, session });
  }

  return {
    status: 'approved_manual',
    execution: {
      reason: 'approved but no automatic executor exists for this action type/table',
      action_type: action.action_type,
      target_table: action.target_table,
    },
  };
}

module.exports = {
  executeApprovedAction,
};
