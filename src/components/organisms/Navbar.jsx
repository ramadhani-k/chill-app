import React from 'react';
import DropdownProfile from '../molecules/DropdownProfile';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="nav-left">
                <Link to="/">
                    <img src="images/logo.png" alt="CHILL Logo" className="nav-logo" />
                </Link>
                <nav className="nav-menu">
                    <a href="#">Series</a>
                    <a href="#">Film</a>
                    <a href="#">Daftar Saya</a>
                </nav>
            </div>
            <DropdownProfile />
        </header>
    );
}