'use client';
import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import VideoCard from '@/components/VideoCard';
import Footer from '@/components/Footer';
import { useReviews } from '@/context/ReviewContext';
import styles from './page.module.css';

export default function Home() {
  const { reviews } = useReviews();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter only published reviews
  const publishedReviews = reviews.filter(review => review.status === 'published');

  // Memoize sorted trending videos
  const trendingVideos = useMemo(() => {
    return [...publishedReviews]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 3);
  }, [publishedReviews]);

  const filteredVideos = selectedCategory === 'all'
    ? publishedReviews
    : publishedReviews.filter(video =>
      video.category.toLowerCase() === selectedCategory.toLowerCase()
    );

  return (
    <main className={`${styles.main} fade-in`}>
      <Navigation />
      <Hero />

      {/* Trending Section - Show only on 'all' view */}
      {selectedCategory === 'all' && trendingVideos.length > 0 && (
        <section className={styles.trendingSection}>
          <div className={styles.container}>
            <div className={styles.headerRow}>
              <h2 className={styles.sectionTitle}>🔥 Trending Now</h2>
              <p className={styles.sectionSubtitle}>Most liked by the community</p>
            </div>
            <div className={styles.videosGrid}>
              {trendingVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.categorySection}>
        <CategoryFilter onFilterChange={setSelectedCategory} />
      </section>

      <section className={styles.videosSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'Latest Reviews' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Reviews`}
            </h2>
            <p className={styles.sectionSubtitle}>
              Watch in-depth video reactions and honest reviews
            </p>
          </div>

          <div className={styles.videosGrid}>
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className={styles.noResults}>
              <p>No reviews found in this category yet.</p>
              <p className={styles.noResultsSubtext}>Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
