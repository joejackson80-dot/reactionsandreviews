'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useReviews } from '@/context/ReviewContext';
import styles from './categories.module.css';
import { CATEGORY_CONFIG } from '@/lib/constants';

export default function CategoriesPage() {
    const { reviews } = useReviews();

    const categories = Object.entries(CATEGORY_CONFIG).map(([id, config]) => {
        const count = reviews.filter(
            r => r.category.toLowerCase() === config.name.toLowerCase() && r.status === 'published'
        ).length;

        return {
            id,
            ...config,
            count
        };
    });

    return (
        <main className={styles.main}>
            <Navigation />

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.pageTitle}>Browse Categories</h1>
                    <p className={styles.pageSubtitle}>
                        Explore reviews organized by category
                    </p>
                </div>
            </section>

            <section className={styles.categoriesSection}>
                <div className={styles.container}>
                    <div className={styles.categoriesGrid}>
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.id}`}
                                className={styles.categoryCard}
                                style={{
                                    '--category-color': category.color,
                                } as React.CSSProperties}
                            >
                                <div className={styles.categoryIcon}>{category.icon}</div>
                                <h2 className={styles.categoryName}>{category.name}</h2>
                                <p className={styles.categoryDescription}>{category.description}</p>
                                <div className={styles.categoryFooter}>
                                    <span className={styles.categoryCount}>{category.count} reviews</span>
                                    <span className={styles.categoryArrow}>→</span>
                                </div>
                                <div className={styles.categoryGlow}></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Additions Preview */}
            <section className={styles.previewSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Recently Added</h2>
                    <div className={styles.previewGrid}>
                        {reviews
                            .filter(r => r.status === 'published')
                            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
                            .slice(0, 4)
                            .map(video => (
                                <Link key={video.id} href={`/review/${video.id}`} className={styles.previewCard}>
                                    <div className={styles.previewThumbnail} style={{ backgroundImage: `url(${video.thumbnail})` }}>
                                        <div className={styles.previewOverlay}>
                                            <span>{video.duration}</span>
                                        </div>
                                    </div>
                                    <div className={styles.previewInfo}>
                                        <h3>{video.title}</h3>
                                        <span>{video.category}</span>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
