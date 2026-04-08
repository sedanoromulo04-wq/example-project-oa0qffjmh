const { spawn } = require('child_process');
const { config } = require('./config');

function safeJsonParse(value) {
  if (!value || typeof value !== 'string') {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeRequestedMutations(value) {
  return Array.isArray(value)
    ? value.filter((item) => item && typeof item === 'object')
    : [];
}

function buildPrompt({ envelope, contextPack }) {
  return [
    'You are the Torq Jarvis orchestration runtime.',
    'Return only valid JSON.',
    'Do not add markdown fences.',
    'Classify the request and answer within Torq governance.',
    'If required context is missing, say so explicitly.',
    'Never authorize publication or silent state mutation.',
    'Use this JSON shape exactly:',
    JSON.stringify({
      intent_type: 'planning_query',
      current_module: 'string',
      current_stage: 'string',
      recommended_route: ['torq-strategy-os'],
      required_context: ['string'],
      missing_upstream_assets: ['string'],
      allowed_actions: ['string'],
      blocked_actions: ['string'],
      approval_risk: 'low',
      next_safe_action: 'string',
      answer: 'string',
      confidence: 'medium',
      requested_mutations: [
        {
          action_type: 'create_record',
          target_table: 'jobs',
          target_record_id: null,
          approval_required: true,
          reason: 'string',
        },
      ],
      required_approvals: ['string'],
      evidence_refs: ['string'],
    }),
    'Allowed intent_type values:',
    JSON.stringify([
      'status_query',
      'diagnostic_query',
      'planning_query',
      'drafting_query',
      'execution_query',
      'approval_query',
      'system_query',
    ]),
    'Request envelope:',
    JSON.stringify(envelope),
    'Context pack:',
    JSON.stringify(contextPack),
  ].join('\n\n');
}

function normalizeResponse(parsed, fallbackAnswer) {
  const source = parsed && typeof parsed === 'object' ? parsed : {};

  return {
    intent_type: typeof source.intent_type === 'string' ? source.intent_type : 'system_query',
    current_module: typeof source.current_module === 'string' ? source.current_module : 'Torq OS',
    current_stage: typeof source.current_stage === 'string' ? source.current_stage : 'context-required',
    recommended_route: normalizeArray(source.recommended_route),
    required_context: normalizeArray(source.required_context),
    missing_upstream_assets: normalizeArray(source.missing_upstream_assets),
    allowed_actions: normalizeArray(source.allowed_actions),
    blocked_actions: normalizeArray(source.blocked_actions),
    approval_risk: typeof source.approval_risk === 'string' ? source.approval_risk : 'medium',
    next_safe_action: typeof source.next_safe_action === 'string'
      ? source.next_safe_action
      : 'Clarify the missing operational context before proceeding.',
    answer: typeof source.answer === 'string' ? source.answer : fallbackAnswer,
    confidence: typeof source.confidence === 'string' ? source.confidence : 'medium',
    requested_mutations: normalizeRequestedMutations(source.requested_mutations),
    required_approvals: normalizeArray(source.required_approvals),
    evidence_refs: normalizeArray(source.evidence_refs),
  };
}

async function runOpenClaude({ envelope, contextPack }) {
  const prompt = buildPrompt({ envelope, contextPack });
  const args = [
    '-p',
    '--output-format',
    'json',
    '--tools',
    '',
    '--provider',
    config.openClaudeProvider,
    '--model',
    config.openClaudeModel,
    '--agent',
    config.openClaudeAgent,
    prompt,
  ];

  return new Promise((resolve, reject) => {
    const child = spawn(config.openClaudeBin, args, {
      cwd: config.projectRoot,
      shell: process.platform === 'win32',
      env: process.env,
      windowsHide: true,
    });

    let stdout = '';
    let stderr = '';
    let finished = false;

    const timeout = setTimeout(() => {
      if (finished) {
        return;
      }

      finished = true;
      child.kill();
      reject(new Error(`OpenClaude timed out after ${config.openClaudeTimeoutMs}ms`));
    }, config.openClaudeTimeoutMs);

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      clearTimeout(timeout);
      if (finished) {
        return;
      }
      finished = true;
      reject(error);
    });

    child.on('close', (code) => {
      clearTimeout(timeout);
      if (finished) {
        return;
      }
      finished = true;

      const finalLine = stdout
        .trim()
        .split(/\r?\n/)
        .filter(Boolean)
        .pop();

      if (!finalLine) {
        reject(new Error(stderr.trim() || 'OpenClaude returned no output'));
        return;
      }

      const outer = safeJsonParse(finalLine);
      if (!outer) {
        reject(new Error(`OpenClaude output was not valid JSON: ${finalLine}`));
        return;
      }

      if (code !== 0 || outer.is_error) {
        reject(new Error(outer.result || stderr.trim() || `OpenClaude exited with code ${code}`));
        return;
      }

      const inner = safeJsonParse(outer.result);
      const normalized = normalizeResponse(inner, typeof outer.result === 'string' ? outer.result : 'Unable to normalize runtime answer.');

      resolve({
        normalized,
        runtime: {
          status: 'completed',
          agent: config.openClaudeAgent,
          session_id: outer.session_id || null,
          duration_ms: outer.duration_ms || null,
          total_cost_usd: outer.total_cost_usd || null,
          raw_result: outer.result || null,
          raw_stdout: stdout.trim(),
          raw_stderr: stderr.trim(),
        },
      });
    });
  });
}

module.exports = {
  runOpenClaude,
};
