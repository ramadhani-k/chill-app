import React from 'react';
import MovieCard from '../atoms/MovieCard';

export default function MovieSection({ title, isWide = false, moviesData }) {
    return (
        <section className="movie-section">
            <h3 className="section-title">{title}</h3>
            <div className="slider-wrapper">
                <button className="arrow-btn left-arrow">
                    <img src="images/arrow-left-icon.png" alt="Previous" className="arrow-img-file" />
                </button>

                <div className={`movie-grid ${isWide ? 'landscape-grid' : 'portrait-grid'}`}>
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

                <button className="arrow-btn right-arrow">
                    <img src="images/arrow-right-icon.png" alt="Next" className="arrow-img-file" />
                </button>
            </div>
        </section>
    );
}