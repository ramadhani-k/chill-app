import express from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../services/movieService.js';

const router = express.Router();

// get /movies - mengambil semua data film
router.get('/movies', async (req, res) => {
  try {
    const movies = await getAllMovies();
    res.status(200).json({
      status: 'success',
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

// get /movie/:id - mengambil data film berdasarkan id
router.get('/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await getMovieById(id);
    if (!movie) {
      return res.status(404).json({
        status: 'fail',
        message: 'film tidak ditemukan',
      });
    }
    res.status(200).json({
      status: 'success',
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

// post /movie - menambahkan film baru
router.post('/movie', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        status: 'fail',
        message: 'judul film (title) wajib diisi',
      });
    }
    const newMovie = await createMovie(req.body);
    res.status(201).json({
      status: 'success',
      message: 'film berhasil ditambahkan',
      data: newMovie,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

// patch /movie/:id - memperbarui data film berdasarkan id
router.patch('/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await updateMovie(id, req.body);
    if (!updatedMovie) {
      return res.status(404).json({
        status: 'fail',
        message: 'film tidak ditemukan',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'film berhasil diperbarui',
      data: updatedMovie,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

// delete /movie/:id - menghapus film berdasarkan id
router.delete('/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await deleteMovie(id);
    if (!deletedMovie) {
      return res.status(404).json({
        status: 'fail',
        message: 'film tidak ditemukan',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'film berhasil dihapus',
      data: deletedMovie,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
