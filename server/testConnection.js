 
require('dotenv').config();

// Log the connection details (remove in production)
console.log('Attempting to connect with:', {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  // Don't log password
});

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 5432
});

async function testConnection() {
  try {
    // Test basic connection
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL');

    // Test query
    const result = await client.query('SELECT * FROM info LIMIT 1');
    console.log('Successfully queried table:', result.rows);

    client.release();
  } catch (error) {
    console.error('Connection error:', {
      message: error.message,
      stack: error.stack
    });
  } finally {
    pool.end();
  }
}

testConnection();