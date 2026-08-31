import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// koneksi database postgres menggunakan pg pool
const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'movie_db',
      }
);

// inisialisasi tabel users & movies secara otomatis jika belum ada
export const initDb = async () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      fullname VARCHAR(255),
      username VARCHAR(100) UNIQUE,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      verification_token VARCHAR(255),
      is_verified BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const createMoviesTable = `
    CREATE TABLE IF NOT EXISTS movies (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      badge VARCHAR(100),
      genre VARCHAR(100),
      rating NUMERIC(3, 1),
      description TEXT,
      image VARCHAR(255),
      duration VARCHAR(50),
      release_year INT,
      isInteractive BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createUsersTable);
    await pool.query(createMoviesTable);
  } catch (error) {
    console.error('Gagal inisialisasi database:', error.message);
  }
};

export default pool;
