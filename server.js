import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// root route
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di Movie App API',
  });
});

// mount movie routes
app.use('/api', movieRoutes);
// mount routes pada root juga sesuai spesifikasi /movies, /movie/:id
app.use('/', movieRoutes);

// jalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
