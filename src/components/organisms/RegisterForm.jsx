import { Link, useNavigate } from 'react-router-dom';
import InputGroup from '../molecules/InputGroup';
import Button from '../atoms/Button';

export default function RegisterForm() {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/beranda');
    };

    return (
        <form onSubmit={handleRegister}>
            {/* Pakai ulang InputGroup untuk Username */}
            <InputGroup id="username" label="Username" placeholder="Masukkan username" required />

            {/* Pakai ulang InputGroup untuk Kata Sandi */}
            <InputGroup id="password" label="Kata Sandi" type="password" placeholder="Masukkan kata sandi" required />

            {/* Pakai ulang InputGroup untuk Konfirmasi Kata Sandi */}
            <InputGroup id="confirm-password" label="Konfirmasi Kata Sandi" type="password" placeholder="Masukkan kata sandi" required />

            {/* Tautan Navigasi */}
            <div className="flex justify-start text-[11px] md:text-xs mb-6 text-white/80">
                <p>Sudah punya akun? <Link to="/login" className="font-bold hover:underline">Masuk</Link></p>
            </div>

            <Button type="submit" variant="primary">Daftar</Button>
        </form>
    );
}