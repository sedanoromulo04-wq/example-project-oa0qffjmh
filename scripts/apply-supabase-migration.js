const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  const connectionString = process.env.SUPABASE_DB_URL;
  if (!connectionString) {
    throw new Error('SUPABASE_DB_URL is not set');
  }

  const migrationPath = path.resolve(
    __dirname,
    '..',
    'supabase',
    'migrations',
    '20260407_173500_torq_schema_v1.sql'
  );

  const sql = fs.readFileSync(migrationPath, 'utf8');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    await client.query('begin');
    await client.query(sql);
    await client.query('commit');
    console.log('Migration applied successfully.');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
