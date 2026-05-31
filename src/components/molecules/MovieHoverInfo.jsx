import React from 'react';

export default function MovieHoverInfo() {
    return (
        <div className="card-hover-info">
            <div className="hover-banner-container">
                <img src="images/all-of-dead-hor.png" alt="All Of Us Are Dead Banner" className="hover-banner" />
            </div>
            <div className="hover-details">
                <div className="hover-buttons">
                    <div className="buttons-left">
                        <button className="btn-hover-play" title="Putar">
                            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </button>
                        <button className="btn-hover-circle" title="Tambahkan ke Daftar Saya">
                            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                        </button>
                    </div>
                    <button className="btn-hover-circle" title="Selengkapnya">
                        <svg viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></svg>
                    </button>
                </div>
                <div className="hover-meta">
                    <span className="hover-age">13+</span>
                    <span className="hover-episodes">16 Episode</span>
                </div>
                <div className="hover-genres">
                    <span>Misteri</span>
                    <span className="genre-dot"></span>
                    <span>Kriminal</span>
                    <span className="genre-dot"></span>
                    <span>Fantasi</span>
                </div>
            </div>
        </div>
    );
}