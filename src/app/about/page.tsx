import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CATEGORY_CONFIG } from '@/lib/constants';
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
                                At Reactions and Reviews, we&apos;re dedicated to providing honest, in-depth reviews
                                across movies, tech, products, dining, and global travel. Our mission is to help you explore
                                the best the world has to offer through authentic reactions and comprehensive analysis.
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
                                <div className={styles.statNumber}>7+</div>
                                <div className={styles.statLabel}>Categories</div>
                            </div>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>What We Offer</h2>
                            <div className={styles.featuresList}>
                                {Object.entries(CATEGORY_CONFIG).map(([id, category]) => (
                                    <div key={id} className={styles.feature}>
                                        <span className={styles.featureIcon}>{category.icon}</span>
                                        <div>
                                            <h3>{category.name}</h3>
                                            <p>{category.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Work With Us</h2>
                            <p>
                                Are you a brand, resort, or service provider? We offer high-impact sponsored reviews and
                                strategic product placements that resonate with a global audience.
                            </p>
                            <div className={styles.sponsorCta}>
                                <Link href="/media-kit" className={styles.mediaKitBtn}>
                                    📄 View Our Media Kit & Pitch Deck
                                </Link>
                                <p className={styles.ctaSubtitle}>Current sponsorship slots available for Q3 & Q4 2026</p>
                            </div>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Our Values</h2>
                            <ul className={styles.valuesList}>
                                <li><strong>Honesty:</strong> We provide genuine opinions that build trust with our audience</li>
                                <li><strong>Quality:</strong> Professional cinematic production for every review</li>
                                <li><strong>Global Reach:</strong> Covering products and destinations across the globe</li>
                                <li><strong>Community First:</strong> Helping our viewers find the best value and experiences</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
