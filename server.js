import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { initDb } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// melayani file statis folder upload/
app.use('/upload', express.static(path.join(process.cwd(), 'upload')));

// root route
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di Movie App API',
  });
});

// mount routes
app.use('/api', movieRoutes);
app.use('/', movieRoutes);
app.use('/', authRoutes);
app.use('/', uploadRoutes);

// inisialisasi tabel database dan jalankan server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
