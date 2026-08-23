import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const getMovies = () => axios.get(`${API_URL}/movies`);
export const addMovie = (movie) => axios.post(`${API_URL}/movies`, movie);
export const updateMovie = (id, movie) => axios.put(`${API_URL}/movies/${id}`, movie);
export const deleteMovie = (id) => axios.delete(`${API_URL}/movies/${id}`);