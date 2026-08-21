import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import MovieCrud from './pages/MovieCrud';

function App() {
  // state global untuk simpan daftar film
  const [movies, setMovies] = useState([
    { id: 1, title: "Don't Look Up", genre: 'Komedi', image: 'images/dont-look-hor.png' },
    { id: 2, title: 'All Of Us Are Dead', genre: 'Horor', image: 'images/all-of-dead-hor.png', badge: 'episode' },
    { id: 3, title: 'Blue Lock', genre: 'Anime', image: 'images/blue-lock-hor.png' },
    { id: 4, title: 'A Man Called Otto', genre: 'Drama', image: 'images/aman-called-otto-hor.png' },
  ]);

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
