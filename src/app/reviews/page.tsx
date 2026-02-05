'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { useReviews, Review } from '@/context/ReviewContext';
import styles from './reviews.module.css';

function ReviewsContent() {
    const { reviews, searchReviews } = useReviews();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';

    // Local state for the current view
    const [displayReviews, setDisplayReviews] = useState<Review[]>([]);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [isSearching, setIsSearching] = useState(false);
    const [sortBy, setSortBy] = useState('latest');

    // Initialize display reviews when global reviews load or query changes
    useEffect(() => {
        const performInitialSearch = async () => {
            if (initialQuery) {
                // If there's a URL query, use it immediately
                setIsSearching(true);
                const results = await searchReviews(initialQuery);
                setDisplayReviews(results);
                setIsSearching(false);
            } else {
                // Otherwise show all published
                setDisplayReviews(reviews.filter(r => r.status === 'published'));
            }
        };
        performInitialSearch();
    }, [initialQuery, reviews, searchReviews]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        try {
            const results = await searchReviews(searchQuery);
            setDisplayReviews(results);
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        setDisplayReviews(reviews.filter(r => r.status === 'published'));
    };

    // Client-side sort of the current display set
    const sortedVideos = [...displayReviews].sort((a, b) => {
        if (sortBy === 'views') {
            const getViewsValue = (viewStr: string) => {
                const multiplier = viewStr.toUpperCase().includes('M') ? 1000000 : viewStr.toUpperCase().includes('K') ? 1000 : 1;
                const num = parseFloat(viewStr.replace(/[^0-9.]/g, '')) || 0;
                return num * multiplier;
            };
            return getViewsValue(b.views) - getViewsValue(a.views);
        } else if (sortBy === 'rating') {
            return b.rating - a.rating;
        } else if (sortBy === 'latest') {
            return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        }
        return 0;
    });

    return (
        <main className={`${styles.main} fade-in`}>
            <Navigation />

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.pageTitle}>All Reviews</h1>
                    <p className={styles.pageSubtitle}>
                        Browse through our comprehensive collection of video reviews
                    </p>
                </div>
            </section>

            <section className={styles.reviewsSection}>
                <div className={styles.container}>
                    {/* Search and Filter Controls */}
                    <div className={styles.controls}>
                        <form onSubmit={handleSearch} className={styles.searchBox}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                placeholder="Search reviews..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                        </form>

                        <div className={styles.sortBox}>
                            <label htmlFor="sort">Sort by:</label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={styles.sortSelect}
                            >
                                <option value="latest">Latest</option>
                                <option value="views">Most Viewed</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className={styles.resultsCount}>
                        Showing {displayReviews.length > 0 ? '1' : '0'}-{displayReviews.length} of {reviews.filter(r => r.status === 'published').length} Results
                    </div>

                    {/* Videos Grid */}
                    {isSearching ? (
                        <div className={styles.loadingState}>
                            Searching reviews...
                        </div>
                    ) : (
                        <div className={styles.videosGrid}>
                            {sortedVideos.map((video) => (
                                <VideoCard key={video.id} {...video} />
                            ))}
                        </div>
                    )}

                    {sortedVideos.length === 0 && (
                        <div className={styles.noResults}>
                            <p>No reviews found matching your search.</p>
                            <button onClick={handleClear} className={styles.clearBtn}>
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default function ReviewsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReviewsContent />
        </Suspense>
    );
}
