'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <main className={`${styles.main} fade-in`}>
            <Navigation />

            <section className={styles.errorSection}>
                <div className={styles.content}>
                    <div className={styles.glitchWrapper}>
                        <h1 className={styles.errorCode} data-text="404">404</h1>
                    </div>
                    <h2 className={styles.errorTitle}>Page Not Found</h2>
                    <p className={styles.errorMessage}>
                        The page you are looking for might have been removed, had its name changed,
                        or is temporarily unavailable.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/" className={styles.homeBtn}>
                            Return Home
                        </Link>
                        <Link href="/reviews" className={styles.reviewsBtn}>
                            Browse Reviews
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
