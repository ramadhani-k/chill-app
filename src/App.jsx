import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import MovieCrud from './pages/MovieCrud';

function App() {
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
        <Route path="/beranda" element={<Homepage />} />

        {/* rute crud kelola film */}
        <Route path="/crud" element={<MovieCrud />} />
      </Routes>
    </Router>
  );
}

export default App;
