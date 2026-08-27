import { create } from 'zustand';
import { getMovies, addMovie, updateMovie, deleteMovie } from '../services/api/moviesApi';

// store zustand untuk kelola state dan logika film
export const useMovieStore = create((set) => ({
  // state awal untuk menampung daftar film
  movies: [],

  // mengambil data film dari api
  fetchMovies: async () => {
    try {
      const response = await getMovies();
      set({ movies: response.data });
    } catch (error) {
      console.error('gagal mengambil data film:', error);
    }
  },

  // menambah film baru ke api dan memperbarui state
  addMovie: async (newMovie) => {
    try {
      const response = await addMovie(newMovie);
      // tambahkan film baru di posisi paling depan
      set((state) => ({ movies: [response.data, ...state.movies] }));
      return response.data;
    } catch (error) {
      console.error('gagal menambah film:', error);
      throw error;
    }
  },

  // memperbarui data film di api dan state
  updateMovie: async (id, updatedData) => {
    try {
      const response = await updateMovie(id, updatedData);
      // perbarui data film yang id-nya sesuai
      set((state) => ({
        movies: state.movies.map((movie) =>
          movie.id === id ? response.data : movie
        ),
      }));
      return response.data;
    } catch (error) {
      console.error('gagal memperbarui film:', error);
      throw error;
    }
  },

  // menghapus film dari api dan state
  deleteMovie: async (id) => {
    try {
      await deleteMovie(id);
      // hapus film dari state berdasarkan id
      set((state) => ({
        movies: state.movies.filter((movie) => movie.id !== id),
      }));
    } catch (error) {
      console.error('gagal menghapus film:', error);
      throw error;
    }
  },
}));

export default useMovieStore;
