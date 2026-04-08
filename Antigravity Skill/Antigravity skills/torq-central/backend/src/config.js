const path = require('path');
const fs = require('fs');

const DEFAULT_PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..');
const BACKEND_ROOT = path.resolve(__dirname, '..');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const contents = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(BACKEND_ROOT, '.env.local'));
loadEnvFile(path.join(BACKEND_ROOT, '.env'));

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

function parseOrigins(raw) {
  if (!raw || raw === '*') {
    return ['*'];
  }

  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

const config = {
  port: Number(process.env.JARVIS_PORT || 8787),
  dbUrl: requireEnv('SUPABASE_DB_URL'),
  supabaseProjectUrl: process.env.SUPABASE_PROJECT_URL || null,
  supabaseSecretKey: process.env.SUPABASE_SECRET_KEY || null,
  projectRoot: process.env.JARVIS_PROJECT_ROOT || DEFAULT_PROJECT_ROOT,
  allowedOrigins: parseOrigins(process.env.JARVIS_ALLOWED_ORIGINS || 'http://localhost:5173'),
  openClaudeBin: process.env.OPENCLAUDE_BIN || (process.platform === 'win32' ? 'openclaude.cmd' : 'openclaude'),
  openClaudeProvider: process.env.OPENCLAUDE_PROVIDER || 'openai',
  openClaudeModel: process.env.OPENCLAUDE_MODEL || 'codexplan',
  openClaudeAgent: process.env.OPENCLAUDE_AGENT || 'torq-orchestrator',
  openClaudeTimeoutMs: Number(process.env.OPENCLAUDE_TIMEOUT_MS || 180000),
};

module.exports = { config };
