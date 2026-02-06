import Image from 'next/image';
import Link from 'next/link';
import { Play, Eye } from 'lucide-react';
import styles from './VideoCard.module.css';
import { motion } from 'framer-motion';

interface VideoCardProps {
    id: string;
    title: string;
    category: string;
    thumbnail: string;
    rating: number;
    views: number;
    duration: string;
    reviewer: string;
    isTrending?: boolean;
    userRating?: number;
}

export default function VideoCard({
    id,
    title,
    category,
    thumbnail,
    rating,
    views,
    duration,
    reviewer,
    isTrending,
    userRating
}: VideoCardProps) {
    const renderStars = (rating: number) => {
        // ... existing renderStars ...
        // (Note: I already updated renderStars in a previous turn, I'll just make sure the destructured props match)
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

    return (
        <Link href={`/review/${id}`} passHref legacyBehavior>
            <motion.a
                className={`${styles.videoCard} shimmer`}
                whileHover={{
                    y: -10,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                layout
            >
                <div className={styles.thumbnail}>
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.thumbnailImage}
                    />
                    <div className={styles.playOverlay}>
                        <motion.div
                            className={styles.playButton}
                            whileHover={{ scale: 1.1, backgroundColor: 'var(--color-gold)', color: 'black' }}
                        >
                            <Play fill="currentColor" size={24} />
                        </motion.div>
                    </div>
                    <div className={styles.duration}>{duration}</div>
                    <div className={styles.categoryBadge}>{category}</div>
                    {isTrending && (
                        <motion.div
                            className={styles.trendingBadge}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            🔥 TRENDING
                        </motion.div>
                    )}
                </div>

                <div className={styles.cardContent}>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.meta}>
                        <div className={styles.ratingSection}>
                            <div className={styles.ratingInfo}>
                                <div className={styles.stars}>
                                    {renderStars(rating)}
                                </div>
                                <span className={styles.ratingNumber}>{rating}.0</span>
                            </div>
                            {userRating && userRating > 0 && (
                                <div className={styles.userRatingInfo}>
                                    <span className={styles.userRatingLabel}>Community</span>
                                    <span className={styles.userRatingValue}>★ {userRating.toFixed(1)}</span>
                                </div>
                            )}
                        </div>

                        <div className={styles.info}>
                            <span className={styles.reviewer}>{reviewer}</span>
                            <div className={styles.views}>
                                <Eye size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                <span>{views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views} views</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.a>
        </Link>
    );
}
