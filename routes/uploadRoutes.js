import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// pastikan folder upload/ ada
const uploadDir = path.join(process.cwd(), 'upload');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// post /upload - upload file tunggal dengan key 'file'
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'Tidak ada file yang diunggah. Gunakan key "file".',
    });
  }

  const relativePath = path.join('upload', req.file.filename);

  res.status(200).json({
    filename: req.file.filename,
    path: relativePath,
  });
});

export default router;
