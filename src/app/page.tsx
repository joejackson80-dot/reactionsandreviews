'use client';
import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import VideoCard from '@/components/VideoCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footer';
import { useReviews } from '@/context/ReviewContext';
import styles from './page.module.css';

import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
    },
  },
};

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
    <main className={styles.main}>
      <Navigation />
      <Hero />

      {/* Trending Section - Show only on 'all' view */}
      {selectedCategory === 'all' && trendingVideos.length > 0 && (
        <section className={styles.trendingSection}>
          <div className={styles.container}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.headerRow}
            >
              <h2 className={styles.sectionTitle}>🔥 Trending Now</h2>
              <p className={styles.sectionSubtitle}>Most liked by the community</p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={styles.videosGrid}
            >
              {trendingVideos.map((video) => (
                <motion.div key={video.id} variants={itemVariants}>
                  <VideoCard {...video} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <section className={styles.categorySection}>
        <CategoryFilter onFilterChange={setSelectedCategory} />
      </section>

      <section className={styles.videosSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.sectionHeader}
          >
            <h2 className={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'Latest Reviews' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Reviews`}
            </h2>
            <p className={styles.sectionSubtitle}>
              Watch in-depth video reactions and honest reviews
            </p>
          </motion.div>

          <motion.div
            key={selectedCategory} // Re-animate on category change
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={styles.videosGrid}
          >
            {filteredVideos.map((video) => (
              <motion.div key={video.id} variants={itemVariants}>
                <VideoCard {...video} />
              </motion.div>
            ))}
          </motion.div>

          {filteredVideos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.noResults}
            >
              <p>No reviews found in this category yet.</p>
              <p className={styles.noResultsSubtext}>Check back soon for new content!</p>
            </motion.div>
          )}
        </div>
      </section>

      <NewsletterSignup />
      <Footer />
    </main>
  );
}
