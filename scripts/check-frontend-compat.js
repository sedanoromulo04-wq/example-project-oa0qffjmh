const { Client } = require('pg');

async function main() {
  const connectionString = process.env.SUPABASE_DB_URL;
  if (!connectionString) {
    throw new Error('SUPABASE_DB_URL is not set');
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    const tableRes = await client.query(`
      select table_schema, table_name
      from information_schema.tables
      where (table_schema = 'public' and table_name in ('activity_log', 'categories', 'torq_docs', 'attachments', 'doc_versions', 'profiles'))
         or (table_schema = 'storage' and table_name = 'buckets')
      order by table_schema, table_name
    `);

    const fnRes = await client.query(`
      select routine_schema, routine_name
      from information_schema.routines
      where routine_schema = 'public'
        and routine_name in ('search_docs')
      order by routine_schema, routine_name
    `);

    console.log('Frontend tables:');
    for (const row of tableRes.rows) {
      console.log(`${row.table_schema}.${row.table_name}`);
    }

    console.log('Frontend routines:');
    for (const row of fnRes.rows) {
      console.log(`${row.routine_schema}.${row.routine_name}`);
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
