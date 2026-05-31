import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Jalur default langsung arahkan ke login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rute Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rute Register (Cukup SATU baris ini saja, hapus yang ada Navigate-nya) */}
        <Route path="/register" element={<Register />} />
        
        {/* Rute Beranda */}
        <Route path="/beranda" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;