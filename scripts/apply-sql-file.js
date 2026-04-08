const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  const connectionString = process.env.SUPABASE_DB_URL;
  const relativePath = process.argv[2];

  if (!connectionString) {
    throw new Error('SUPABASE_DB_URL is not set');
  }

  if (!relativePath) {
    throw new Error('Usage: node scripts/apply-sql-file.js <relative-sql-path>');
  }

  const sqlPath = path.resolve(process.cwd(), relativePath);
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    await client.query('begin');
    await client.query(sql);
    await client.query('commit');
    console.log(`Applied ${relativePath}`);
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
