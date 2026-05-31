import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import Button from '../components/atoms/Button';

export default function Login() {
  return (
    <div 
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-center p-4" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('images/image-background.png')` }}
    >
      {/* login-container versi Tailwind murni agar kebal dari gangguan CSS lain */}
      <div className="w-full max-w-[360px] md:max-w-[440px] bg-[#181a1c]/84 p-8 md:p-10 rounded-2xl text-center text-white backdrop-blur-sm shadow-2xl">
        
        {/* Logo Area */}
        <div className="mb-6 flex justify-center items-center">
          <img src="images/logo.png" alt="CHILL LOGO" className="h-8 max-w-full object-contain" />
        </div>

        {/* Judul */}
        <h2 className="text-[22px] md:text-[24px] font-bold mb-1.5 text-white">Masuk</h2>
        <p className="text-[12px] md:text-sm text-white/80 mb-7">Selamat datang kembali!</p>

        {/* Form Login Organism */}
        <LoginForm />

        {/* Divider */}
        <div className="text-[11px] text-white/60 my-4 flex items-center justify-center before:content-[''] before:flex-1 before:border-b before:border-white/10 before:mr-3 after:content-[''] after:flex-1 after:border-b after:border-white/10 after:ml-3">
          Atau
        </div>

        {/* SSO Google Button */}
        <Button variant="outline">
          <img src="images/google-icon.png" alt="Google Icon" className="w-[14px] h-[14px]" />
          Masuk dengan Google
        </Button>
      </div>
    </div>
  );
}