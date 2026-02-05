'use client';

import { useState } from 'react';
import { useReviews } from '@/context/ReviewContext';
import styles from './LikeButton.module.css';

interface LikeButtonProps {
    reviewId: string;
    initialLikes: number;
}

export default function LikeButton({ reviewId, initialLikes }: LikeButtonProps) {
    const { toggleLike } = useReviews();
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        if (liked) return; // Prevent multiple likes for this demo

        setLiked(true);
        setLikes(prev => prev + 1);
        await toggleLike(reviewId);
    };

    return (
        <button
            onClick={handleLike}
            className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
            disabled={liked}
        >
            <span className={styles.icon}>♥</span>
            <span className={styles.count}>{likes} Likes</span>
        </button>
    );
}
