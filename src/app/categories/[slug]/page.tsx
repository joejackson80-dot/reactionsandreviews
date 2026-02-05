'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { useReviews } from '@/context/ReviewContext';
import styles from './category.module.css';

const CATEGORY_CONFIG: Record<string, { name: string; icon: string; color: string; description: string }> = {
    movies: {
        name: 'Movies',
        icon: '🎥',
        color: '#DC2626',
        description: 'In-depth film reviews, reactions, and cinema analysis',
    },
    books: {
        name: 'Books',
        icon: '📚',
        color: '#2563EB',
        description: 'Literary critiques, book summaries, and reading recommendations',
    },
    music: {
        name: 'Music',
        icon: '🎵',
        color: '#7C3AED',
        description: 'Album reviews, track reactions, and sonic breakdowns',
    },
    trending: {
        name: 'Trending Content',
        icon: '🔥',
        color: '#F59E0B',
        description: 'Viral video reactions, hot takes, and internet culture',
    },
    products: {
        name: 'Products',
        icon: '📦',
        color: '#10B981',
        description: 'Tech unboxings, gadget reviews, and consumer advice',
    },
};

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { reviews } = useReviews();

    const category = CATEGORY_CONFIG[slug];

    if (!category) {
        return (
            <main className={styles.main}>
                <Navigation />
                <div className={styles.errorContainer}>
                    <h1>Category Not Found</h1>
                    <p>The category &quot;{slug}&quot; does not exist.</p>
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
