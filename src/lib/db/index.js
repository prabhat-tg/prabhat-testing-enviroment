import mysql from "mysql2/promise";

// Declare a variable to cache the pool.
// We use `global` to ensure it's truly global across module re-evaluations in serverless environments.
let cachedPool = global.pool;

async function getConnectionPool() {
  if (cachedPool) {
    return cachedPool;
  }

  console.log("Creating new database connection pool...");
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: process.env.NODE_ENV === "development" ? 5 : 10, // Adjusted for Vercel Hobby tier limits
    queueLimit: 0,
    port: process.env.DB_PORT,
    ssl: {
      // Vercel typically requires SSL for database connections.
      // Adjust rejectUnauthorized based on your SSL certificate setup.
      // If using a CA-signed cert, you might not need rejectUnauthorized: false.
      // For self-signed or local dev, false might be necessary.
      // Consider making this configurable via environment variables.
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === "true", // Defaults to false if env var not set
    },
    // Add a connection timeout to help manage idle connections from the client side
    // connectTimeout: 10000, // 10 seconds
  });

  // Store the promise of the pool in the global cache.
  // This ensures that even if multiple calls happen concurrently while the first pool is being created,
  // they all wait for the same pool promise.
  global.pool = pool;
  cachedPool = pool;

  // It's good practice to test the connection immediately.
  try {
    const connection = await pool.getConnection();
    console.log("Database connection successful.");
    connection.release();
  } catch (error) {
    console.error("Failed to establish database connection:", error);
    // If connection fails, unset the cached pool to allow retries on subsequent calls.
    cachedPool = null;
    global.pool = null;
    throw error; // Re-throw the error to indicate failure
  }

  return cachedPool;
}

export default getConnectionPool;
