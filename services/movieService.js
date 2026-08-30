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
  const { title, genre, rating, description, image, duration, release_year } = movieData;
  const query = `
    INSERT INTO movies (title, genre, rating, description, image, duration, release_year)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [
    title,
    genre || null,
    rating || null,
    description || null,
    image || null,
    duration || null,
    release_year || null
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// service dml untuk memperbarui data film berdasarkan id (update)
export const updateMovie = async (id, movieData) => {
  const existingMovie = await getMovieById(id);
  if (!existingMovie) {
    return null;
  }

  const title = movieData.title !== undefined ? movieData.title : existingMovie.title;
  const genre = movieData.genre !== undefined ? movieData.genre : existingMovie.genre;
  const rating = movieData.rating !== undefined ? movieData.rating : existingMovie.rating;
  const description = movieData.description !== undefined ? movieData.description : existingMovie.description;
  const image = movieData.image !== undefined ? movieData.image : existingMovie.image;
  const duration = movieData.duration !== undefined ? movieData.duration : existingMovie.duration;
  const release_year = movieData.release_year !== undefined ? movieData.release_year : existingMovie.release_year;

  const query = `
    UPDATE movies
    SET title = $1, genre = $2, rating = $3, description = $4, image = $5, duration = $6, release_year = $7
    WHERE id = $8
    RETURNING *
  `;
  const values = [title, genre, rating, description, image, duration, release_year, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// service dml untuk menghapus film berdasarkan id (delete)
export const deleteMovie = async (id) => {
  const query = 'DELETE FROM movies WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
