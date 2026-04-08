const { Pool } = require('pg');
const { config } = require('./config');

const pool = new Pool({
  connectionString: config.dbUrl,
  ssl: { rejectUnauthorized: false },
});

async function query(text, params = []) {
  return pool.query(text, params);
}

async function withTransaction(work) {
  const client = await pool.connect();
  try {
    await client.query('begin');
    const result = await work(client);
    await client.query('commit');
    return result;
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  query,
  withTransaction,
};
