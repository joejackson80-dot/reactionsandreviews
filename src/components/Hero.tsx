import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroOverlay}></div>
            <div className={styles.heroContent}>
                <div className={styles.badge}>
                    <span className={styles.badgeDot}></span>
                    PREMIUM VIDEO REVIEWS
                </div>
                <h1 className={styles.heroTitle}>
                    Honest <span className={styles.highlight}>Reactions</span>
                    <br />
                    Unfiltered <span className={styles.highlightGold} style={{ whiteSpace: 'nowrap' }}>Reviews</span>
                </h1>
                <p className={styles.heroSubtitle}>
                    Watch in-depth video reactions and reviews of movies, tech, games, music, and products.
                    Real opinions from real people.
                </p>
                <div className={styles.heroCta}>
                    <Link href="/reviews" className={styles.btnPrimary}>
                        <span>Explore Reviews</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link href="/submit" className={styles.btnSecondary}>
                        <span>Submit Your Review</span>
                    </Link>
                </div>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>500+</div>
                        <div className={styles.statLabel}>Video Reviews</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>50K+</div>
                        <div className={styles.statLabel}>Monthly Views</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>4.8★</div>
                        <div className={styles.statLabel}>Avg Rating</div>
                    </div>
                </div>
            </div>
            <div className={styles.scrollIndicator}>
                <div className={styles.mouse}>
                    <div className={styles.mouseWheel}></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
}
