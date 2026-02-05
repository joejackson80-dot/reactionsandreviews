import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import styles from './about.module.css';

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <Navigation />

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.pageTitle}>About Us</h1>
                    <p className={styles.pageSubtitle}>
                        Premium video reviews and honest reactions
                    </p>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.textBlock}>
                            <h2>Our Mission</h2>
                            <p>
                                At Reactions and Reviews, we&apos;re dedicated to providing honest, in-depth video reviews
                                across movies, tech, games, music, and products. Our mission is to help you make
                                informed decisions through authentic reactions and comprehensive analysis.
                            </p>
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
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>5</div>
                                <div className={styles.statLabel}>Categories</div>
                            </div>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>What We Offer</h2>
                            <div className={styles.featuresList}>
                                <div className={styles.feature}>
                                    <span className={styles.featureIcon}>🎥</span>
                                    <div>
                                        <h3>Movie Reviews</h3>
                                        <p>In-depth film analysis and honest reactions to the latest releases</p>
                                    </div>
                                </div>
                                <div className={styles.feature}>
                                    <span className={styles.featureIcon}>💻</span>
                                    <div>
                                        <h3>Tech Unboxings</h3>
                                        <p>Comprehensive gadget reviews and technology comparisons</p>
                                    </div>
                                </div>
                                <div className={styles.feature}>
                                    <span className={styles.featureIcon}>🎮</span>
                                    <div>
                                        <h3>Gaming Content</h3>
                                        <p>Game reviews, walkthroughs, and gameplay reactions</p>
                                    </div>
                                </div>
                                <div className={styles.feature}>
                                    <span className={styles.featureIcon}>🎵</span>
                                    <div>
                                        <h3>Music Reviews</h3>
                                        <p>Album reviews and audio equipment testing</p>
                                    </div>
                                </div>
                                <div className={styles.feature}>
                                    <span className={styles.featureIcon}>📦</span>
                                    <div>
                                        <h3>Product Testing</h3>
                                        <p>Honest product reviews and detailed demonstrations</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Our Values</h2>
                            <ul className={styles.valuesList}>
                                <li><strong>Honesty:</strong> We provide genuine opinions, never influenced by sponsors</li>
                                <li><strong>Quality:</strong> High-production video content with professional editing</li>
                                <li><strong>Depth:</strong> Comprehensive analysis that goes beyond surface-level impressions</li>
                                <li><strong>Community:</strong> Building a community of informed consumers</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
