'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { useReviews } from '@/context/ReviewContext';
import { CATEGORY_CONFIG } from '@/lib/constants';
import styles from './category.module.css';

export default function CategoryPage() {
    const params = useParams();
    const slug = (params.slug as string)?.toLowerCase();
    const { reviews } = useReviews();

    // Find category by key or name
    const categoryKey = Object.keys(CATEGORY_CONFIG).find(
        key => key.toLowerCase() === slug || CATEGORY_CONFIG[key].name.toLowerCase() === slug
    );

    const category = categoryKey ? CATEGORY_CONFIG[categoryKey] : null;

    if (!category) {
        return (
            <main className={styles.main}>
                <Navigation />
                <div className={styles.errorContainer}>
                    <h1>Category Not Found</h1>
                    <p>The category &quot;{params.slug}&quot; does not exist.</p>
                </div>
                <Footer />
            </main>
        );
    }

    const categoryReviews = reviews.filter(
        r => r.category.toLowerCase() === category.name.toLowerCase() && r.status === 'published'
    );

    return (
        <main className={styles.main}>
            <Navigation />

            <section
                className={styles.heroSection}
                style={{ '--category-color': category.color } as React.CSSProperties}
            >
                <div className={styles.heroContent}>
                    <div className={styles.categoryIcon}>{category.icon}</div>
                    <h1 className={styles.pageTitle}>{category.name}</h1>
                    <p className={styles.pageSubtitle}>{category.description}</p>
                    <div className={styles.stats}>
                        <span>{categoryReviews.length} Reviews</span>
                    </div>
                </div>
            </section>

            <section className={styles.reviewsSection}>
                <div className={styles.container}>
                    {categoryReviews.length > 0 ? (
                        <div className={styles.videosGrid}>
                            {categoryReviews.map((video) => (
                                <VideoCard key={video.id} {...video} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            <p>No reviews in this category yet.</p>
                            <p className={styles.noResultsSubtext}>Check back soon for new content!</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
