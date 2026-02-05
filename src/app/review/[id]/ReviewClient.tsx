'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { useReviews } from '@/context/ReviewContext';
import CommentsSection from '@/components/CommentsSection';
import LikeButton from '@/components/LikeButton';
import styles from './review.module.css';
import { Review } from '@/context/ReviewContext';

interface ReviewClientProps {
    reviewId: string;
    initialReviewData?: Review | null; // Optional: Pass server-fetched data to hydrate/optimize
}

export default function ReviewClient({ reviewId, initialReviewData }: ReviewClientProps) {
    const { getReview, reviews } = useReviews();
    const contextReview = getReview(reviewId);

    // Use server data first (immediate render), fallback to context (live updates)
    // We map snake_case from DB (if raw) to camelCase if needed, but initialReviewData here 
    // should ideally match the Review interface. 
    // Since getReview uses context which uses mapped data, we might need to map initialReviewData 
    // if it comes raw from Supabase in page.tsx. However, assuming we handle that.

    // Actually, page.tsx fetches raw DB rows. We need to map it to our Review interface.
    const mapDbReview = (r: unknown): Review => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = r as Record<string, any>;
        return {
            id: d.id,
            title: d.title,
            category: d.category,
            thumbnail: d.thumbnail,
            rating: d.rating,
            views: d.views,
            duration: d.duration,
            reviewer: d.reviewer,
            publishDate: d.publish_date,
            description: d.description,
            videoEmbed: d.video_embed,
            videoUrl: d.video_url,
            status: d.status,
            likes: d.likes || 0,
            articleContent: d.article_content,
            affiliateLink: d.affiliate_link,
            tags: d.tags || []
        };
    };

    const activeReview = contextReview || (initialReviewData ? mapDbReview(initialReviewData) : undefined);

    // Get related videos (same category, excluding current)
    const relatedVideos = reviews
        .filter(r => r.category === activeReview?.category && r.id !== activeReview?.id && r.status === 'published')
        .slice(0, 3);

    if (!activeReview) {
        return (
            <main className={styles.main}>
                <Navigation />
                <section className={styles.errorSection}>
                    <h1>Review Not Found</h1>
                    <p>The review you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <Link href="/reviews" className={styles.backBtn}>
                        Back to All Reviews
                    </Link>
                </section>
                <Footer />
            </main>
        );
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
                ★
            </span>
        ));
    };

    return (
        <main className={styles.main}>
            <Navigation />

            <section className={styles.reviewHero}>
                <div className={styles.container}>
                    <div className={styles.breadcrumb}>
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/reviews">Reviews</Link>
                        <span>/</span>
                        <span>{activeReview.category}</span>
                    </div>

                    <h1 className={styles.reviewTitle}>{activeReview.title}</h1>

                    <div className={styles.reviewMeta}>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Category:</span>
                            <div className={styles.categoryTag}>
                                {activeReview.category}
                            </div>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>By:</span>
                            <span>{activeReview.reviewer}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Published:</span>
                            <span>{activeReview.publishDate}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Views:</span>
                            <span>{activeReview.views}</span>
                        </div>
                    </div>

                    <div className={styles.rating}>
                        <div className={styles.stars}>{renderStars(activeReview.rating)}</div>
                        <span className={styles.ratingNumber}>{activeReview.rating}.0 / 5.0</span>
                    </div>
                </div>
            </section>

            <section className={styles.videoSection}>
                <div className={styles.container}>
                    <div className={styles.videoPlayer}>
                        {activeReview.videoEmbed ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={activeReview.videoEmbed}
                                title={activeReview.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className={styles.iframe}
                            ></iframe>
                        ) : (
                            <div className={styles.videoPlaceholder}>
                                <div className={styles.playIcon}>▶</div>
                                <p>Video not available</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.reviewContent}>
                        <h2>About This Review</h2>
                        <p>{activeReview.description}</p>

                        {/* Transcribed Article Content */}
                        {activeReview.articleContent ? (
                            <div className={styles.articleBody}>
                                <div className={styles.articleDivider}></div>
                                <h3>Full Review & Analysis</h3>
                                <div className={styles.articleText}>
                                    {activeReview.articleContent.split('\n').map((paragraph: string, index: number) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        <div className={styles.likeSection}>
                            <LikeButton reviewId={activeReview.id} initialLikes={activeReview.likes || 0} />
                        </div>

                        <div className={styles.keyPoints}>
                            <h3>Key Highlights</h3>
                            <ul>
                                <li>Professional video production quality</li>
                                <li>Comprehensive analysis and coverage</li>
                                <li>Honest, unbiased opinions</li>
                                <li>Clear audio and visual presentation</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.sidebar}>
                        {/* Affiliate / CTA Box - Highest Priority for Monetization */}
                        {activeReview.affiliateLink && (
                            <div className={`${styles.shareBox} ${styles.affiliateBox}`}>
                                <h3>Interested?</h3>
                                <p>Check out this product or movie directly.</p>
                                <a
                                    href={activeReview.affiliateLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.affiliateBtn}
                                >
                                    🛍️ Check Price / Buy Now
                                </a>
                                <span className={styles.affiliateDisclaimer}>*We may earn a commission from links.</span>
                            </div>
                        )}

                        <div className={styles.shareBox}>
                            <h3>Share This Review</h3>
                            <div className={styles.shareButtons}>
                                <button className={styles.shareBtn}>📱 Twitter</button>
                                <button className={styles.shareBtn}>📘 Facebook</button>
                                <button className={styles.shareBtn}>🔗 Copy Link</button>
                            </div>
                        </div>

                        {/* Sponsorship / Support Upgrade */}
                        <div className={`${styles.shareBox} ${styles.sponsorBox}`}>
                            <h3>Support The Channel</h3>
                            <p>Enjoying our content? Consider supporting us or sponsoring a future review!</p>
                            <div className={styles.shareButtons}>
                                <Link href="/contact" className={styles.sponsorBtn}>🤝 Work With Us</Link>
                                <button className={styles.tipsBtn}>☕ Buy us a Coffee</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.commentsWrapper}>
                <div className={styles.container}>
                    <CommentsSection reviewId={activeReview.id} />
                </div>
            </section>

            {relatedVideos.length > 0 && (
                <section className={styles.relatedSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Related Reviews</h2>
                        <div className={styles.relatedGrid}>
                            {relatedVideos.map((video) => (
                                <VideoCard key={video.id} {...video} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
