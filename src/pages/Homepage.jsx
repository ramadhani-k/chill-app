import { useEffect } from 'react';
import Navbar from '../components/organisms/Navbar';
import HeroBanner from '../components/organisms/HeroBanner';
import MovieSection from '../components/organisms/MovieSection';
import useMovieStore from '../store/useMovieStore';

export default function Homepage() {
    // ambil state movies dan fungsi fetchMovies dari store zustand
    const movies = useMovieStore((state) => state.movies);
    const fetchMovies = useMovieStore((state) => state.fetchMovies);

    // panggil fetchMovies jika data movies masih kosong
    useEffect(() => {
        if (movies.length === 0) {
            fetchMovies();
        }
    }, [movies.length, fetchMovies]);

    // data film lanjutan dari state zustand
    const melanjutkanTontonData = movies.map((movie) => ({
        title: movie.title,
        image: movie.image,
        badge: movie.badge
    }));

    // data film top rating
    const topRatingData = [
        { title: "Suzume", image: "/images/suzume-pot.png" },
        { title: "Jurassic World", image: "/images/jurrasic-w-pot.png" },
        { title: "Sonic 2", image: "/images/sonic-2-pot.png" },
        { title: "All Of Us Are Dead", image: "/images/allofus-are-dead-potrait.png", badge: "episode", isInteractive: true },
        { title: "Big Hero 6", image: "/images/big-hero-potrait.png", badge: "top10" },
    ];

    // data film trending
    const trendingData = [
        { title: "The Tomorrow War", image: "/images/the-tomorrow-war-potrait.png" },
        { title: "Quantumania", image: "/images/quantum-mania-potrait.png" },
        { title: "Guardians of the Galaxy", image: "/images/gog-potrait.png", badge: "top10" },
        { title: "A Man Called Otto", image: "/images/aman-called-otto-hor.png", badge: "top10" },
        { title: "Little Mermaid", image: "/images/little-mermaid-potrait.png" },
    ];

    // data film rilis baru
    const rilisBaruData = [
        { title: "Little Mermaid", image: "/images/little-mermaid-potrait.png" },
        { title: "Duty After School", image: "/images/duty-after-school.png", badge: "episode" },
        { title: "Big Hero 6", image: "/images/big-hero-potrait.png", badge: "top10" },
        { title: "All Of Us Are Dead", image: "/images/allofus-are-dead-potrait.png" },
        { title: "Missing", image: "/images/missing-potrait.png" },
    ];

    return (
        <div className="homepage-wrapper">
            {/* navbar atas */}
            <Navbar />

            {/* banner utama */}
            <HeroBanner />

            {/* daftar section film */}
            <main className="content-container">
                <MovieSection title="Melanjutkan Tonton Film" isWide={true} moviesData={melanjutkanTontonData} />
                <MovieSection title="Top Rating Film dan Series Hari ini" moviesData={topRatingData} />
                <MovieSection title="Film Trending" moviesData={trendingData} />
                <MovieSection title="Rilis Baru" moviesData={rilisBaruData} />
            </main>

            {/* bagian footer */}
            <footer className="footer">
                <div className="footer-left">
                    <img src="/images/logo.png" alt="CHILL Logo" className="footer-logo" />
                    <p className="copyright">© 2026 CHILL. All rights reserved.</p>
                </div>
                <div className="footer-links">
                    <div className="footer-col">
                        <h4>Genre</h4>
                        <a href="#">Aksi</a><a href="#">Anak-anak</a><a href="#">Anime</a><a href="#">Britania</a>
                    </div>
                    <div className="footer-col">
                        <h4>&nbsp;</h4>
                        <a href="#">Drama</a><a href="#">Fantasi Ilmiah & Fantasi</a><a href="#">Kejahatan</a><a href="#">KDrama</a>
                    </div>
                    <div className="footer-col">
                        <h4>&nbsp;</h4>
                        <a href="#">Komedi</a><a href="#">Petualangan</a><a href="#">Perang</a><a href="#">Romantis</a>
                    </div>
                    <div className="footer-col">
                        <h4>&nbsp;</h4>
                        <a href="#">Sains & Alam</a><a href="#">Thriller</a>
                    </div>
                    <div className="footer-col">
                        <h4>Bantuan</h4>
                        <a href="#">FAQ</a><a href="#">Kontak Kami</a><a href="#">Privasi</a><a href="#">Syarat & Ketentuan</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
