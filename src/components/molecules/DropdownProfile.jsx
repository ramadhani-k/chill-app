import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DropdownProfile() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`nav-right dropdown-wrapper ${isOpen ? 'active' : ''}`}>
            <button
                className="profile-trigger"
                onClick={() => setIsOpen(!isOpen)}
                // Tutup otomatis jika klik di luar area dropdown
                onBlur={() => setTimeout(() => setIsOpen(false), 200)} 
            >
                <img src="images/profile.png" alt="User Profile" className="avatar" />
                
                {/* SVG Chevron pengganti gambar lama */}
                <svg 
                    viewBox="0 0 24 24" 
                    className="arrow-icon" 
                    fill="currentColor"
                >
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                </svg>
            </button>

            <div className="dropdown-menu">
                <a href="#" className="dropdown-item">👤 Profil Saya</a>
                <a href="#" className="dropdown-item">⭐ Upgrade Premium</a>
                <Link to="/login" className="dropdown-item logout-item">
                    <img src="images/log-out.png" alt="Logout" className="logout-icon-img" /> Keluar
                </Link>
            </div>
        </div>
    );
}