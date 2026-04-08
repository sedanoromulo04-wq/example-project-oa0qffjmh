const { config } = require('./config');

function getHeader(req, name) {
  if (!req || !req.headers) {
    return null;
  }

  const direct = req.headers[name];
  if (Array.isArray(direct)) {
    return direct[0] || null;
  }

  return direct || null;
}

function getBearerToken(req) {
  const authorization = getHeader(req, 'authorization');
  if (!authorization || typeof authorization !== 'string') {
    return null;
  }

  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

async function getSupabaseUser(token) {
  if (!config.supabaseProjectUrl || !config.supabaseSecretKey) {
    const error = new Error('Supabase auth validation is not configured');
    error.statusCode = 500;
    throw error;
  }

  const response = await fetch(`${config.supabaseProjectUrl}/auth/v1/user`, {
    method: 'GET',
    headers: {
      apikey: config.supabaseSecretKey,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error('Supabase session is invalid or expired');
    error.statusCode = 401;
    throw error;
  }

  const payload = await response.json();
  return {
    id: payload.id,
    email: payload.email || null,
  };
}

async function resolveRequestActor(req, fallback = {}) {
  const token = getBearerToken(req);
  if (token) {
    const user = await getSupabaseUser(token);
    return {
      id: user.id,
      email: user.email,
      source: 'supabase',
    };
  }

  if (config.allowInsecureDevAuth && fallback.userId) {
    return {
      id: fallback.userId,
      email: fallback.userEmail || null,
      source: 'insecure-dev',
    };
  }

  const error = new Error('Authentication required');
  error.statusCode = 401;
  throw error;
}

module.exports = {
  resolveRequestActor,
};
