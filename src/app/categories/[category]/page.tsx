'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { useReviews } from '@/context/ReviewContext';
import styles from './category.module.css';

const categoryData: Record<string, { name: string; icon: string; color: string; description: string }> = {
    movies: {
        name: 'Movies',
        icon: '🎥',
        color: '#DC2626',
        description: 'In-depth film reviews, reactions, and cinema analysis',
    },
    tech: {
        name: 'Tech',
        icon: '💻',
        color: '#2563EB',
        description: 'Latest gadget unboxings, tech reviews, and comparisons',
    },
    games: {
        name: 'Games',
        icon: '🎮',
        color: '#7C3AED',
        description: 'Gaming reviews, walkthroughs, and gameplay reactions',
    },
    music: {
        name: 'Music',
        icon: '🎵',
        color: '#059669',
        description: 'Album reviews, audio equipment tests, and music reactions',
    },
    products: {
        name: 'Products',
        icon: '📦',
        color: '#D97706',
        description: 'Product unboxings, demonstrations, and honest reviews',
    },
};

export default function CategoryPage() {
    const params = useParams();
    const categorySlug = params?.category as string;
    const { reviews } = useReviews();
    const category = categoryData[categorySlug];

    if (!category) {
        return (
            <main className={styles.main}>
                <Navigation />
                <section className={styles.errorSection}>
                    <h1>Category Not Found</h1>
                    <p>The category you&apos;re looking for doesn&apos;t exist.</p>
                </section>
                <Footer />
            </main>
        );
    }

    const filteredVideos = reviews.filter(
        (video) => video.category.toLowerCase() === category.name.toLowerCase() && video.status === 'published'
    );

    return (
        <main className={styles.main}>
            <Navigation />

            <section
                className={styles.heroSection}
                style={{
                    '--category-color': category.color,
                } as React.CSSProperties}
            >
                <div className={styles.heroContent}>
                    <div className={styles.categoryIcon}>{category.icon}</div>
                    <h1 className={styles.pageTitle}>{category.name} Reviews</h1>
                    <p className={styles.pageSubtitle}>{category.description}</p>
                </div>
            </section>

            <section className={styles.videosSection}>
                <div className={styles.container}>
                    <div className={styles.videosGrid}>
                        {filteredVideos.map((video) => (
                            <VideoCard key={video.id} {...video} />
                        ))}
                    </div>

                    {filteredVideos.length === 0 && (
                        <div className={styles.noResults}>
                            <p>No {category.name.toLowerCase()} reviews available yet.</p>
                            <p className={styles.noResultsSubtext}>Check back soon for new content!</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
