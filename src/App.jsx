import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import MovieCrud from './pages/MovieCrud';
import { getMovies } from './services/api/moviesApi';

function App() {
  // state global untuk simpan daftar film
  const [movies, setMovies] = useState([]);

  // ambil data awal film dari mockapi
  useEffect(() => {
    getMovies()
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('gagal mengambil data film dari api:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        {/* jalur default ke login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* rute login */}
        <Route path="/login" element={<Login />} />
        
        {/* rute register */}
        <Route path="/register" element={<Register />} />
        
        {/* rute beranda */}
        <Route path="/beranda" element={<Homepage movies={movies} />} />

        {/* rute crud kelola film */}
        <Route path="/crud" element={<MovieCrud movies={movies} setMovies={setMovies} />} />
      </Routes>
    </Router>
  );
}

export default App;
