import { useState, useEffect } from 'react';
import { getMovies, addMovie, updateMovie, deleteMovie } from '../services/api/moviesApi';

// custom hook untuk kelola data dan logika film
export default function useMovies() {
  // state untuk menyimpan daftar film
  const [movies, setMovies] = useState([]);

  // ambil data film dari api saat pertama kali dipanggil
  useEffect(() => {
    getMovies()
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('gagal mengambil data film:', error);
      });
  }, []);

  // fungsi untuk menambah film baru
  const handleAddMovie = (newMovie) => {
    return addMovie(newMovie)
      .then((response) => {
        // tambahkan film baru ke daftar paling depan
        setMovies((prevMovies) => [response.data, ...prevMovies]);
        return response.data;
      })
      .catch((error) => {
        console.error('gagal menambah film:', error);
        throw error;
      });
  };

  // fungsi untuk mengedit data film
  const handleUpdateMovie = (id, updatedData) => {
    return updateMovie(id, updatedData)
      .then((response) => {
        // perbarui film yang id-nya cocok
        setMovies((prevMovies) =>
          prevMovies.map((movie) => (movie.id === id ? response.data : movie))
        );
        return response.data;
      })
      .catch((error) => {
        console.error('gagal memperbarui film:', error);
        throw error;
      });
  };

  // fungsi untuk menghapus film berdasarkan id
  const handleDeleteMovie = (id) => {
    return deleteMovie(id)
      .then(() => {
        // hapus film dari state
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      })
      .catch((error) => {
        console.error('gagal menghapus film:', error);
        throw error;
      });
  };

  // kembalikan state movies dan fungsi crud
  return {
    movies,
    addMovie: handleAddMovie,
    updateMovie: handleUpdateMovie,
    deleteMovie: handleDeleteMovie,
  };
}
