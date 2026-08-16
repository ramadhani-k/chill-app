import { useRef } from 'react';
import MovieCard from '../atoms/MovieCard';

export default function MovieSection({ title, isWide = false, moviesData }) {
    const gridRef = useRef(null);

    const handleScroll = (direction) => {
        if (gridRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="movie-section">
            <h3 className="section-title">{title}</h3>
            <div className="slider-wrapper">
                <button className="arrow-btn left-arrow" onClick={() => handleScroll('left')}>
                    <img src="images/arrow-left-icon.png" alt="Previous" className="arrow-img-file" />
                </button>

                <div ref={gridRef} className={`movie-grid ${isWide ? 'landscape-grid' : 'portrait-grid'}`}>
                    {moviesData.map((movie, index) => (
                        <MovieCard
                            key={index}
                            title={movie.title}
                            image={movie.image}
                            badge={movie.badge}
                            isWide={isWide}
                            isInteractive={movie.isInteractive}
                        />
                    ))}
                </div>

                <button className="arrow-btn right-arrow" onClick={() => handleScroll('right')}>
                    <img src="images/arrow-right-icon.png" alt="Next" className="arrow-img-file" />
                </button>
            </div>
        </section>
    );
}