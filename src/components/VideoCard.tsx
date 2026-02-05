import Image from 'next/image';
import Link from 'next/link';
import styles from './VideoCard.module.css';

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
    const getCategoryColor = (cat: string) => {
        const colors: Record<string, string> = {
            'Movies': '#DC2626',
            'Tech': '#2563EB',
            'Games': '#7C3AED',
            'Music': '#059669',
            'Products': '#D97706'
        };
        return colors[cat] || '#94A3B8';
    };

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
        <Link href={`/review/${id}`} className={styles.videoCard}>
            <div className={styles.thumbnail}>
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.thumbnailImage}
                />
                <div className={styles.playOverlay}>
                    <div className={styles.playButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
                <div className={styles.duration}>{duration}</div>
                <div
                    className={styles.categoryBadge}
                    style={{ borderColor: getCategoryColor(category) }}
                >
                    {category}
                </div>
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
                        <span className={styles.views}>{views} views</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
