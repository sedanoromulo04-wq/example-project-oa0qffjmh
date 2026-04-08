const http = require('http');
const { URL } = require('url');
const { config } = require('./config');
const { query } = require('./db');
const { buildContextPack, getSessionDetails, listSessionsForUser, processJarvisTurn, reviewJarvisActions } = require('./context');
const { runOpenClaude } = require('./openclaudeAdapter');

function corsHeaders(origin) {
  const allowAll = config.allowedOrigins.includes('*');
  const resolvedOrigin = allowAll ? '*' : origin && config.allowedOrigins.includes(origin) ? origin : config.allowedOrigins[0] || '*';

  return {
    'Access-Control-Allow-Origin': resolvedOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function sendJson(res, statusCode, payload, origin) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...corsHeaders(origin),
  });
  res.end(body);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });

    req.on('error', reject);
  });
}

function validateEnvelope(body) {
  if (!body.user_id || typeof body.user_id !== 'string') {
    const error = new Error('user_id is required');
    error.statusCode = 400;
    throw error;
  }

  if (!body.message || typeof body.message !== 'string' || !body.message.trim()) {
    const error = new Error('message is required');
    error.statusCode = 400;
    throw error;
  }

  return {
    session_id: typeof body.session_id === 'string' ? body.session_id : null,
    session_title: typeof body.session_title === 'string' ? body.session_title : null,
    user_id: body.user_id,
    user_email: typeof body.user_email === 'string' ? body.user_email : null,
    input_mode: typeof body.input_mode === 'string' ? body.input_mode : 'text',
    message: body.message.trim(),
    active_client_id: typeof body.active_client_id === 'string' ? body.active_client_id : null,
    active_doc_id: typeof body.active_doc_id === 'string' ? body.active_doc_id : null,
    ui_context: body.ui_context && typeof body.ui_context === 'object' ? body.ui_context : {},
  };
}

function validateActionReview(body) {
  if (!body.user_id || typeof body.user_id !== 'string') {
    const error = new Error('user_id is required');
    error.statusCode = 400;
    throw error;
  }

  if (!Array.isArray(body.action_ids) || body.action_ids.length === 0) {
    const error = new Error('action_ids is required');
    error.statusCode = 400;
    throw error;
  }

  return {
    user_id: body.user_id,
    user_email: typeof body.user_email === 'string' ? body.user_email : null,
    action_ids: body.action_ids.filter((item) => typeof item === 'string'),
    decision: body.decision === 'reject' ? 'reject' : 'approve',
    notes: typeof body.notes === 'string' ? body.notes.trim() : '',
  };
}

async function handleAuthLogin(req, res, origin) {
  const body = await readJson(req);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    sendJson(res, 400, { ok: false, error: 'email and password are required' }, origin);
    return;
  }

  const result = await query(
    `
      select
        u.id,
        u.email,
        p.full_name,
        p.role,
        p.workspace_id,
        w.name as workspace_name,
        crypt($2, u.encrypted_password) = u.encrypted_password as password_matches
      from auth.users u
      left join public.profiles p on p.id = u.id
      left join public.workspaces w on w.id = p.workspace_id
      where lower(u.email) = lower($1)
      limit 1
    `,
    [email, password]
  );

  const row = result.rows[0];
  if (!row || !row.password_matches) {
    sendJson(res, 401, { ok: false, error: 'Invalid credentials' }, origin);
    return;
  }

  sendJson(
    res,
    200,
    {
      ok: true,
      user: {
        id: row.id,
        email: row.email,
        full_name: row.full_name,
        role: row.role,
        workspace_id: row.workspace_id,
        workspace_name: row.workspace_name,
      },
    },
    origin
  );
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '';
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders(origin));
    res.end();
    return;
  }

  try {
    if (req.method === 'GET' && reqUrl.pathname === '/api/health') {
      const ping = await query('select now() as now');
      sendJson(
        res,
        200,
        {
          ok: true,
          service: 'torq-jarvis-backend',
          databaseTime: ping.rows[0].now,
          openclaude: {
            agent: config.openClaudeAgent,
            model: config.openClaudeModel,
            provider: config.openClaudeProvider,
            bin: config.openClaudeBin,
          },
        },
        origin
      );
      return;
    }

    if (req.method === 'POST' && reqUrl.pathname === '/api/auth/login') {
      await handleAuthLogin(req, res, origin);
      return;
    }

    if (req.method === 'GET' && reqUrl.pathname === '/api/jarvis/sessions') {
      const userId = reqUrl.searchParams.get('user_id');
      const userEmail = reqUrl.searchParams.get('user_email');
      if (!userId) {
        sendJson(res, 400, { ok: false, error: 'user_id is required' }, origin);
        return;
      }

      const sessions = await listSessionsForUser(userId, userEmail);
      sendJson(res, 200, { ok: true, sessions }, origin);
      return;
    }

    const sessionMatch = reqUrl.pathname.match(/^\/api\/jarvis\/sessions\/([^/]+)$/);
    if (req.method === 'GET' && sessionMatch) {
      const userId = reqUrl.searchParams.get('user_id');
      const userEmail = reqUrl.searchParams.get('user_email');
      if (!userId) {
        sendJson(res, 400, { ok: false, error: 'user_id is required' }, origin);
        return;
      }

      const details = await getSessionDetails(sessionMatch[1], userId, userEmail);
      sendJson(res, 200, { ok: true, ...details }, origin);
      return;
    }

    const reviewMatch = reqUrl.pathname.match(/^\/api\/jarvis\/sessions\/([^/]+)\/actions\/review$/);
    if (req.method === 'POST' && reviewMatch) {
      const body = await readJson(req);
      const review = validateActionReview(body);
      const result = await reviewJarvisActions({
        sessionId: reviewMatch[1],
        actionIds: review.action_ids,
        decision: review.decision,
        notes: review.notes,
        userId: review.user_id,
        userEmail: review.user_email,
      });

      sendJson(res, 200, { ok: true, ...result }, origin);
      return;
    }

    if (req.method === 'POST' && reqUrl.pathname === '/api/jarvis/message') {
      const body = await readJson(req);
      const envelope = validateEnvelope(body);
      const contextPack = await buildContextPack(envelope);
      const runtimeResult = await runOpenClaude({ envelope, contextPack });
      const persisted = await processJarvisTurn({
        envelope,
        normalizedResponse: runtimeResult.normalized,
        runtimeMeta: runtimeResult.runtime,
        contextPack,
      });

      sendJson(
        res,
        200,
        {
          ok: true,
          session: persisted.session,
          new_messages: persisted.messages,
          context_summary: persisted.contextSummary,
          response: runtimeResult.normalized,
          runtime: runtimeResult.runtime,
        },
        origin
      );
      return;
    }

    sendJson(res, 404, { ok: false, error: 'Not found' }, origin);
  } catch (error) {
    sendJson(
      res,
      error.statusCode || 500,
      {
        ok: false,
        error: error.message || 'Unexpected server error',
      },
      origin
    );
  }
});

server.listen(config.port, () => {
  console.log(`Torq Jarvis backend listening on http://localhost:${config.port}`);
});
