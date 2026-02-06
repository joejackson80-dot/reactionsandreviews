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
    views: string;
    duration: string;
    reviewer: string;
}

export default function VideoCard({
    id,
    title,
    category,
    thumbnail,
    rating,
    views,
    duration,
    reviewer
}: VideoCardProps) {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={i < rating ? styles.starFilled : styles.starEmpty}
            >
                ★
            </span>
        ));
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
                </div>

                <div className={styles.cardContent}>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.meta}>
                        <div className={styles.rating}>
                            <div className={styles.stars}>
                                {renderStars(rating)}
                            </div>
                            <span className={styles.ratingNumber}>{rating}.0</span>
                        </div>

                        <div className={styles.info}>
                            <span className={styles.reviewer}>{reviewer}</span>
                            <div className={styles.views}>
                                <Eye size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                <span>{views} views</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.a>
        </Link>
    );
}
