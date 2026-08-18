import { Link, useNavigate } from 'react-router-dom';
import InputGroup from '../molecules/InputGroup';
import Button from '../atoms/Button';

export default function LoginForm() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/beranda');
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup id="username" label="Username" placeholder="Masukkan username" required />
            <InputGroup id="password" label="Kata Sandi" type="password" placeholder="Masukkan kata sandi" required />

            {/* Tautan Bantuan */}
            <div className="flex justify-between w-full text-[11px] md:text-xs my-4 text-white/80">
                <p>Belum punya akun? <Link to="/register" className="font-bold hover:underline">Daftar</Link></p>
                <a href="#" className="font-bold hover:underline">Lupa kata sandi?</a>
            </div>
            <Button type="submit" variant="primary">Masuk</Button>
        </form>
    );
}