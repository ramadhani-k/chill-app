import pool from '../db.js';

// service dml untuk mengambil film dengan filter, search, sort, dan pagination dinamis
export const getAllMovies = async (queryParams = {}) => {
  const { genre, search, sortBy, page, limit } = queryParams;

  let query = 'SELECT * FROM movies';
  const conditions = [];
  const values = [];

  // filter berdasarkan genre
  if (genre) {
    values.push(genre);
    conditions.push(`genre = $${values.length}`);
  }

  // pencarian berdasarkan title (case-insensitive)
  if (search) {
    values.push(`%${search}%`);
    conditions.push(`title ILIKE $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // sorting (contoh format sortBy: title:asc, rating:desc, release_year:desc, id:asc)
  const validColumns = ['id', 'title', 'genre', 'rating', 'release_year', 'created_at'];
  if (sortBy) {
    const [column, order] = sortBy.split(':');
    const cleanColumn = validColumns.includes(column) ? column : 'id';
    const cleanOrder = order && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    query += ` ORDER BY ${cleanColumn} ${cleanOrder}`;
  } else {
    query += ' ORDER BY id ASC';
  }

  // pagination (limit & offset)
  const pageNum = Number(page) > 0 ? Number(page) : null;
  const limitNum = Number(limit) > 0 ? Number(limit) : null;

  if (limitNum) {
    values.push(limitNum);
    query += ` LIMIT $${values.length}`;

    if (pageNum) {
      const offset = (pageNum - 1) * limitNum;
      values.push(offset);
      query += ` OFFSET $${values.length}`;
    }
  }

  const result = await pool.query(query, values);
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
