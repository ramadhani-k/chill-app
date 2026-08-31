import pool from '../db.js';

// service dml untuk mengambil semua film (select all)
export const getAllMovies = async () => {
  const query = 'SELECT * FROM movies ORDER BY id ASC';
  const result = await pool.query(query);
  return result.rows;
};

// service dml untuk mengambil film berdasarkan id (select by id)
export const getMovieById = async (id) => {
  const query = 'SELECT * FROM movies WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// service dml untuk menambah film baru (insert)
export const createMovie = async (movieData) => {
  const { title, badge, genre, isInteractive } = movieData;
  const query = `
    INSERT INTO movies (title, badge, genre, isInteractive)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [title, badge, genre, isInteractive];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// service dml untuk memperbarui data film berdasarkan id (update)
export const updateMovie = async (id, movieData) => {
  const existingMovie = await getMovieById(id);
  if (!existingMovie) {
    return null;
  }

  const title = movieData.title ?? existingMovie.title;
  const badge = movieData.badge ?? existingMovie.badge;
  const genre = movieData.genre ?? existingMovie.genre;
  const isInteractive = movieData.isInteractive ?? existingMovie.isInteractive;

  const query = `
    UPDATE movies
    SET title = $1, badge = $2, genre = $3, isInteractive = $4
    WHERE id = $5
    RETURNING *
  `;
  const values = [title, badge, genre, isInteractive, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// service dml untuk menghapus film berdasarkan id (delete)
export const deleteMovie = async (id) => {
  const query = 'DELETE FROM movies WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
