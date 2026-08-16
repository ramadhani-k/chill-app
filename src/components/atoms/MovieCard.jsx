import MovieHoverInfo from '../molecules/MovieHoverInfo';

export default function MovieCard({ title, image, isWide = false, badge, isInteractive = false }) {
    return (
        <div className={`movie-card ${isWide ? 'wide' : ''} ${isInteractive ? 'interactive-card' : ''}`}>
            {/* Jika ada badge (seperti Episode Baru atau Top 10) */}
            {badge === 'episode' && <span className="badge episode-badge">Episode Baru</span>}
            {badge === 'top10' && <span className="badge top10-badge">Top<br />10</span>}

            <img src={image} alt={title} />

            {/* Overlay teks hanya untuk tipe kartu landscape (wide) */}
            {isWide && (
                <div className="card-overlay">
                    <span>{title}</span>
                </div>
            )}

            {isInteractive && <MovieHoverInfo />}
        </div>
    );
}