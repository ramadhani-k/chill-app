import DropdownProfile from '../molecules/DropdownProfile';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="nav-left">
                <Link to="/beranda">
                    <img src="/images/logo.png" alt="CHILL Logo" className="nav-logo" />
                </Link>
                <nav className="nav-menu">
                    <Link to="/beranda">Beranda</Link>
                    <a href="#">Series</a>
                    <a href="#">Film</a>
                    <a href="#">Daftar Saya</a>
                    <Link to="/crud">Kelola Film</Link>
                </nav>
            </div>
            <DropdownProfile />
        </header>
    );
}
