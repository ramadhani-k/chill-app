import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import {
  findUserByEmail,
  findUserByUsername,
  findUserByVerificationToken,
  createUser,
  verifyUserEmail,
} from '../services/userService.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_movie_app';

// konfigurasi nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'test@example.com',
    pass: process.env.SMTP_PASS || 'testpass',
  },
});

// helper untuk mengirim email verifikasi
const sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/verify-email?token=${token}`;
  const mailOptions = {
    from: '"Movie App" <noreply@movieapp.com>',
    to: email,
    subject: 'Verifikasi Email Anda',
    html: `<p>Silakan klik link berikut untuk memverifikasi akun Anda:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Gagal mengirim email verifikasi:', error.message);
  }
};

// post /register - pendaftaran user baru
router.post('/register', async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'fullname, username, email, dan password wajib diisi',
      });
    }

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({
        status: 'fail',
        message: 'email sudah terdaftar',
      });
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) {
      return res.status(400).json({
        status: 'fail',
        message: 'username sudah digunakan',
      });
    }

    // hash password dengan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate verification token dengan uuid
    const verificationToken = uuidv4();

    // simpan user ke database
    const newUser = await createUser({
      fullname,
      username,
      email,
      password: hashedPassword,
      verificationToken,
    });

    // kirim email verifikasi
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      status: 'success',
      message: 'Registrasi berhasil. Silakan cek email untuk verifikasi.',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

// get /verify-email - verifikasi token email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        status: 'fail',
        message: 'Token verifikasi wajib disertakan',
      });
    }

    const user = await findUserByVerificationToken(token);
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Token verifikasi tidak valid atau sudah digunakan',
      });
    }

    // set is_verified = true dan hapus token
    await verifyUserEmail(user.id);

    res.status(200).send('Email Verified Successfully');
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

// post /login - otentikasi user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email dan password wajib diisi',
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email atau password salah',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email atau password salah',
      });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        status: 'fail',
        message: 'Email belum diverifikasi. Silakan cek email Anda.',
      });
    }

    // buat jwt token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      status: 'success',
      message: 'Login berhasil',
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
