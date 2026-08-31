import pool from '../db.js';

// service dml untuk mencari user berdasarkan email
export const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

// service dml untuk mencari user berdasarkan username
export const findUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await pool.query(query, [username]);
  return result.rows[0];
};

// service dml untuk mencari user berdasarkan verification_token
export const findUserByVerificationToken = async (token) => {
  const query = 'SELECT * FROM users WHERE verification_token = $1';
  const result = await pool.query(query, [token]);
  return result.rows[0];
};

// service dml untuk menambahkan user baru
export const createUser = async ({ fullname, username, email, password, verificationToken }) => {
  const query = `
    INSERT INTO users (fullname, username, email, password, verification_token, is_verified)
    VALUES ($1, $2, $3, $4, $5, false)
    RETURNING id, fullname, username, email, verification_token, is_verified, created_at
  `;
  const values = [fullname, username, email, password, verificationToken];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// service dml untuk verifikasi email user (set is_verified = true dan hapus token)
export const verifyUserEmail = async (userId) => {
  const query = `
    UPDATE users
    SET is_verified = true, verification_token = NULL
    WHERE id = $1
    RETURNING id, fullname, username, email, is_verified
  `;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};
