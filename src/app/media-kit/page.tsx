'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import styles from './media-kit.module.css';

export default function MediaKit() {
    return (
        <main className={styles.main}>
            <Navigation />

            {/* Slide 1: Introduction */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.badge}>2026 OFFICIAL MEDIA KIT</span>
                    <h1 className={styles.title}>Partner With Authority</h1>
                    <p className={styles.subtitle}>
                        Reactions and Reviews is a premium lifestyle and tech content platform,
                        delivering high-impact honest reviews to a global audience.
                    </p>
                </div>
            </section>

            {/* Slide 2: Stats & Reach */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>The Numbers</h2>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>500+</span>
                            <span className={styles.statLabel}>Video Reviews</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>50K+</span>
                            <span className={styles.statLabel}>Monthly Views</span>
                        </div>
                        <div className={styles.statValue} style={{ display: 'none' }}>4.8</div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>4.8★</span>
                            <span className={styles.statLabel}>Audience trust</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>7+</span>
                            <span className={styles.statLabel}>Content Niches</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slide 3: Reach Distribution */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Global Audience Reach</h2>
                    <div className={styles.reachContent}>
                        <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>
                            Our viewers are tech-savvy enthusiasts, global travelers,
                            and high-intent consumers looking for their next investment.
                        </p>
                        <div className={styles.reachList}>
                            <div className={styles.reachItem}>
                                <div className={styles.reachBubble}>45%</div>
                                <span className={styles.statLabel}>United States</span>
                            </div>
                            <div className={styles.reachItem}>
                                <div className={styles.reachBubble}>20%</div>
                                <span className={styles.statLabel}>UK & Europe</span>
                            </div>
                            <div className={styles.reachItem}>
                                <div className={styles.reachBubble}>15%</div>
                                <span className={styles.statLabel}>Asia Pacific</span>
                            </div>
                            <div className={styles.reachItem}>
                                <div className={styles.reachBubble}>20%</div>
                                <span className={styles.statLabel}>Other</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slide 4: Partnership Tiers */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Strategic Partnerships</h2>
                    <div className={styles.servicesGrid}>
                        <div className={styles.serviceCard}>
                            <span className={styles.serviceIcon}>🎬</span>
                            <h3 className={styles.serviceTitle}>Sponsored Full Review</h3>
                            <p className={styles.serviceDesc}>
                                A comprehensive, high-production video review of your product, resort, or restaurant.
                                Includes dedicated article content and SEO rich snippet integration.
                            </p>
                            <span className={styles.priceTag}>Contact for custom quote</span>
                        </div>
                        <div className={styles.serviceCard}>
                            <span className={styles.serviceIcon}>✈️</span>
                            <h3 className={styles.serviceTitle}>Travel / Resort Spotlight</h3>
                            <p className={styles.serviceDesc}>
                                Exclusive walkthrough and experience reaction for hotels, vacations, and travel destinations.
                                High-impact visual storytelling for potential guests.
                            </p>
                            <span className={styles.priceTag}>Contact for custom quote</span>
                        </div>
                        <div className={styles.serviceCard}>
                            <span className={styles.serviceIcon}>💎</span>
                            <h3 className={styles.serviceTitle}>Brand Integration</h3>
                            <p className={styles.serviceDesc}>
                                Direct product placement and verbal mentions within our most popular trending reactions.
                                High-frequency exposure to our recurring viewers.
                            </p>
                            <span className={styles.priceTag}>Contact for custom quote</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slide 5: Call to Action */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <h2 className={styles.ctaTitle}>Let&apos;s Build Your Brand.</h2>
                    <p className={styles.ctaSubtitle}>
                        Direct bookings for Q3/Q4 are now open. Secure your placement and reach your target audience today.
                    </p>
                    <Link href="/contact" className={styles.ctaBtn}>
                        Start Partnership Discussion
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
