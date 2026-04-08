const { Client } = require('pg')

const expectedTables = [
  'workspaces',
  'profiles',
  'workspace_members',
  'clients',
  'client_operation_briefs',
  'client_operation_states',
  'client_stage_history',
  'categories',
  'torq_docs',
  'doc_versions',
  'attachments',
  'doc_links',
  'jobs',
  'job_dependencies',
  'job_assignments',
  'job_outputs',
  'artifact_registry',
  'client_asset_links',
  'memory_entries',
  'memory_links',
  'knowledge_sources',
  'knowledge_chunks',
  'embedding_jobs',
  'retrieval_feedback',
  'approval_items',
  'approval_decisions',
  'distribution_jobs',
  'distribution_events',
  'performance_metrics',
  'jarvis_sessions',
  'jarvis_messages',
  'agent_runs',
  'agent_context_packs',
  'jarvis_actions',
  'tool_events',
]

async function main() {
  const connectionString = process.env.SUPABASE_DB_URL
  if (!connectionString) {
    throw new Error('SUPABASE_DB_URL is not set')
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })

  await client.connect()
  try {
    const extRes = await client.query(`
      select extname
      from pg_extension
      where extname in ('vector', 'pgcrypto')
      order by extname
    `)

    const tableRes = await client.query(
      `
      select table_name
      from information_schema.tables
      where table_schema = 'public'
      and table_name = any($1::text[])
      order by table_name
    `,
      [expectedTables],
    )

    console.log('Extensions:', extRes.rows.map((r) => r.extname).join(', '))
    console.log('Tables found:', tableRes.rows.length)
    for (const row of tableRes.rows) {
      console.log(row.table_name)
    }
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
