import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import MovieCrud from './pages/MovieCrud';
import useMovies from './hooks/useMovies';

function App() {
  // panggil custom hook useMovies untuk dapatkan movies dan fungsi crud
  const movieHook = useMovies();

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
        <Route path="/beranda" element={<Homepage movies={movieHook.movies} />} />

        {/* rute crud kelola film */}
        <Route
          path="/crud"
          element={
            <MovieCrud
              movies={movieHook.movies}
              addMovie={movieHook.addMovie}
              updateMovie={movieHook.updateMovie}
              deleteMovie={movieHook.deleteMovie}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
