import MovieHoverInfo from '../molecules/MovieHoverInfo';

export default function MovieCard({ title, image, isWide = false, badge, isInteractive = false }) {
    return (
        <div className={`movie-card ${isWide ? 'wide' : ''} ${isInteractive ? 'interactive-card' : ''}`}>
            {/* Jika ada badge (seperti Episode Baru atau Top 10) */}
            {badge === 'episode' && <span className="badge episode-badge">Episode Baru</span>}
            {badge === 'top10' && <span className="badge top10-badge">Top<br />10</span>}

            {image ? (
                <img src={image} alt={title} />
            ) : (
                <div className={`flex flex-col items-center justify-center bg-[#22252e] text-gray-400 border border-gray-700/50 rounded-lg p-2 text-center w-full ${isWide ? 'aspect-[16/9]' : 'aspect-[2/3]'}`}>
                    <span className="text-sm font-semibold text-gray-300 line-clamp-1 mb-1">{title}</span>
                    <span className="text-xs text-gray-500 font-medium">no image</span>
                </div>
            )}

            {/* Overlay teks hanya untuk tipe kartu landscape (wide) dengan gambar */}
            {isWide && image && (
                <div className="card-overlay">
                    <span>{title}</span>
                </div>
            )}

            {isInteractive && <MovieHoverInfo />}
        </div>
    );
}