export default function HeroBanner() {
    return (
        <section className="hero-banner">
            <div className="hero-container-bottom">
                <div className="hero-content-left">
                    <h1 className="hero-title">Duty After School</h1>
                    <p className="hero-desc">
                        Sebuah benda tak dikenal mengancam kehidupan dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam sebuah perang.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-play">Mulai</button>
                        <button className="btn-info">
                            <img src="images/information-outline.png" alt="" class="info-icon-img" />
                            Selengkapnya
                        </button>
                        <span className="age-tag">18+</span>
                    </div>
                </div>
                <div className="hero-content-right">
                    <button className="btn-mute">
                        <img src="images/mute-icon.png" alt="Mute Audio" className="mute-icon-img" />
                    </button>
                </div>
            </div>
        </section>
    );
}