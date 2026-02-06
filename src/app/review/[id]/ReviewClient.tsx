'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { useReviews } from '@/context/ReviewContext';
import CommentsSection from '@/components/CommentsSection';
import LikeButton from '@/components/LikeButton';
import styles from './review.module.css';
import { Review } from '@/context/ReviewContext';
import ScrollProgress from '@/components/ScrollProgress';

interface ReviewClientProps {
    reviewId: string;
    initialReviewData?: Review | null; // Optional: Pass server-fetched data to hydrate/optimize
}

import { motion, LayoutGroup, Variants, AnimatePresence } from 'framer-motion';

export default function ReviewClient({ reviewId, initialReviewData }: ReviewClientProps) {
    const { getReview, reviews, rateReview, logAffiliateClick } = useReviews();
    const contextReview = getReview(reviewId);

    const [showWatchNext, setShowWatchNext] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1500) {
                setShowWatchNext(true);
            } else {
                setShowWatchNext(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fade in variant
    const fadeIn: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: 'easeOut' as const
            }
        })
    };

    const renderStars = (rating: number) => {
        return (
            <div className={styles.starsContainer}>
                {Array.from({ length: 5 }, (_, i) => (
                    <motion.span
                        key={i}
                        className={i < rating ? styles.starFilled : styles.starEmpty}
                        whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px var(--color-gold))" }}
                    >
                        ★
                    </motion.span>
                ))}
            </div>
        );
    };

    const mapDbReview = (r: unknown): Review => {
        const d = r as Record<string, any>;
        return {
            id: d.id as string,
            title: d.title as string,
            category: d.category as string,
            thumbnail: d.thumbnail as string,
            rating: d.rating as number,
            views: Number(d.views) || 0,
            duration: d.duration as string,
            reviewer: d.reviewer as string,
            publishDate: d.publish_date as string,
            description: d.description as string,
            videoEmbed: d.video_embed as string | undefined,
            videoUrl: d.video_url as string | undefined,
            status: d.status as 'published' | 'pending' | 'rejected',
            likes: (d.likes as number) || 0,
            articleContent: d.article_content as string | undefined,
            affiliateLink: d.affiliate_link as string | undefined,
            reviewerEmail: d.reviewer_email as string | undefined,
            tags: (d.tags as string[]) || [],
            pros: (d.pros as string[]) || [],
            cons: (d.cons as string[]) || [],
            verdict: d.verdict as string | undefined,
            userRatingAvg: Number(d.user_rating_avg) || 0,
            userRatingCount: (d.user_rating_count as number) || 0,
            gearItems: (d.gear_items as { name: string; link: string; price?: string; image?: string }[]) || [],
            isTrending: !!d.is_trending
        };
    };

    const activeReview = contextReview || (initialReviewData ? mapDbReview(initialReviewData) : undefined);

    const relatedVideos = reviews
        .filter(r => r.category === activeReview?.category && r.id !== activeReview?.id && r.status === 'published')
        .slice(0, 3);

    const watchNextVideo = relatedVideos[0];

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

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Review',
        'itemReviewed': {
            '@type': 'Thing',
            'name': activeReview.title,
        },
        'author': {
            '@type': 'Person',
            'name': activeReview.reviewer,
        },
        'reviewRating': {
            '@type': 'Rating',
            'ratingValue': activeReview.rating,
            'bestRating': '5',
            'worstRating': '1',
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Reactions and Reviews',
        },
        'datePublished': activeReview.publishDate,
        'description': activeReview.description,
    };

    return (
        <LayoutGroup>
            <main className={styles.main}>
                <ScrollProgress />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Navigation />

                {/* Floating Watch Next */}
                <AnimatePresence>
                    {showWatchNext && watchNextVideo && (
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            className={styles.watchNextFloating}
                        >
                            <button className={styles.closeWatchNext} onClick={() => setShowWatchNext(false)}>✕</button>
                            <div className={styles.watchNextContent}>
                                <div className={styles.watchNextThumb}>
                                    <Image src={watchNextVideo.thumbnail} alt={watchNextVideo.title} fill />
                                </div>
                                <div className={styles.watchNextInfo}>
                                    <span className={styles.watchNextLabel}>🚀 Up Next</span>
                                    <h4 className={styles.watchNextTitle}>{watchNextVideo.title}</h4>
                                    <Link href={`/review/${watchNextVideo.id}`} className={styles.watchNextBtn}>
                                        Watch Now
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    custom={0}
                    className={styles.reviewHero}
                >
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

                        <div className={styles.ratingRow}>
                            <div className={styles.ratingItem}>
                                <span className={styles.ratingSource}>Critic Score</span>
                                <div className={styles.ratingBox}>
                                    <div className={styles.stars}>{renderStars(activeReview.rating)}</div>
                                    <span className={styles.ratingNumber}>{activeReview.rating}.0</span>
                                </div>
                            </div>
                            <div className={styles.ratingDivider}></div>
                            <div className={styles.ratingItem}>
                                <span className={styles.ratingSource}>Community Rating</span>
                                <div className={styles.ratingBox}>
                                    <div className={styles.userStars}>
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <motion.span
                                                key={i}
                                                className={i < (activeReview.userRatingAvg || 0) ? styles.starFilled : styles.starEmpty}
                                                whileHover={{ scale: 1.3 }}
                                                onClick={() => rateReview(activeReview.id, i + 1)}
                                            >
                                                ★
                                            </motion.span>
                                        ))}
                                    </div>
                                    <span className={styles.ratingNumber}>
                                        {(activeReview.userRatingAvg || 0).toFixed(1)}
                                        <span className={styles.voteCount}>({activeReview.userRatingCount || 0} votes)</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    custom={1}
                    className={styles.videoSection}
                >
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
                </motion.section>

                <section className={styles.contentSection}>
                    <div className={styles.container}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            custom={2}
                            className={styles.reviewContent}
                        >
                            <h2>About This Review</h2>
                            <p>{activeReview.description}</p>

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

                            {/* VERDICT SCORECARD */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                                className={styles.verdictCard}
                            >
                                <div className={styles.verdictHeader}>
                                    <h3>The Final Verdict</h3>
                                    <div className={styles.verdictScore}>
                                        <span className={styles.scoreValue}>{activeReview.rating}.0</span>
                                        <span className={styles.scoreLabel}>Official Score</span>
                                    </div>
                                </div>

                                <div className={styles.prosConsGrid}>
                                    <div className={styles.prosBox}>
                                        <h4><span className={styles.prosIcon}>👍</span> The Good</h4>
                                        <ul>
                                            {(activeReview.pros && activeReview.pros.length > 0) ? activeReview.pros.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            )) : (
                                                <>
                                                    <li>Excellent production quality</li>
                                                    <li>Thoughtful and unbiased analysis</li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                    <div className={styles.consBox}>
                                        <h4><span className={styles.consIcon}>👎</span> The Bad</h4>
                                        <ul>
                                            {(activeReview.cons && activeReview.cons.length > 0) ? activeReview.cons.map((c, i) => (
                                                <li key={i}>{c}</li>
                                            )) : (
                                                <>
                                                    <li>A bit longer than expected</li>
                                                    <li>Limited availability in some regions</li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className={styles.verdictText}>
                                    <p>{activeReview.verdict || "Overall, this is a top-tier recommendation for anyone looking to stay ahead of the curve. The value proposition is strong, and the execution is nearly flawless."}</p>
                                </div>
                            </motion.div>

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
                        </motion.div>

                        <div className={styles.sidebar}>
                            {/* THE GEAR BOX */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeIn}
                                custom={3}
                                className={`${styles.shareBox} ${styles.gearBox}`}
                            >
                                <h3 className={styles.gearTitle}>🛠️ The Gear Box</h3>
                                <p className={styles.gearSubtitle}>Tools used in this review</p>
                                <div className={styles.gearList}>
                                    {(activeReview.gearItems && activeReview.gearItems.length > 0) ? activeReview.gearItems.map((item, i) => (
                                        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className={styles.gearItem}>
                                            <div className={styles.gearItemInfo}>
                                                <span className={styles.gearName}>{item.name}</span>
                                                {item.price && <span className={styles.gearPrice}>{item.price}</span>}
                                            </div>
                                            <span className={styles.gearArrow}>→</span>
                                        </a>
                                    )) : (
                                        <>
                                            <div className={styles.gearItem}>
                                                <div className={styles.gearItemInfo}>
                                                    <span className={styles.gearName}>Pro 4K Camera Rig</span>
                                                    <span className={styles.gearPrice}>$1,299</span>
                                                </div>
                                                <span className={styles.gearArrow}>→</span>
                                            </div>
                                            <div className={styles.gearItem}>
                                                <div className={styles.gearItemInfo}>
                                                    <span className={styles.gearName}>Studio Condenser Mic</span>
                                                    <span className={styles.gearPrice}>$299</span>
                                                </div>
                                                <span className={styles.gearArrow}>→</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <p className={styles.affiliateDisclaimer}>*May contain affiliate links</p>
                            </motion.div>

                            {activeReview.affiliateLink && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={fadeIn}
                                    custom={3}
                                    className={`${styles.shareBox} ${styles.affiliateBox}`}
                                >
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
                                </motion.div>
                            )}

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeIn}
                                custom={4}
                                className={styles.shareBox}
                            >
                                <h3>Share This Review</h3>
                                <div className={styles.shareButtons}>
                                    <button className={styles.shareBtn}>📱 Twitter</button>
                                    <button className={styles.shareBtn}>📘 Facebook</button>
                                    <button className={styles.shareBtn}>🔗 Copy Link</button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeIn}
                                custom={5}
                                className={`${styles.shareBox} ${styles.sponsorBox}`}
                            >
                                <h3>Support The Channel</h3>
                                <p>Consider supporting us or sponsoring a future review!</p>
                                <div className={styles.shareButtons}>
                                    <Link href="/contact" className={styles.sponsorBtn}>🤝 Work With Us</Link>
                                    <button className={styles.tipsBtn}>☕ Buy us a Coffee</button>
                                </div>
                            </motion.div>
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
        </LayoutGroup>
    );
}
