'use client';

import { useState, useEffect, useCallback } from 'react';
import { useReviews, Comment } from '@/context/ReviewContext';
import styles from './CommentsSection.module.css';

interface CommentsSectionProps {
    reviewId: string;
}

export default function CommentsSection({ reviewId }: CommentsSectionProps) {
    const { getComments, addComment } = useReviews();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const loadComments = useCallback(async () => {
        const data = await getComments(reviewId);
        setComments(data);
        setLoading(false);
    }, [getComments, reviewId]);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !authorName.trim()) return;

        setSubmitting(true);
        try {
            await addComment(reviewId, authorName, newComment);
            setNewComment('');
            setAuthorName('');
            loadComments(); // Refresh comments
        } catch (error) {
            console.error('Failed to post comment', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading comments...</div>;

    return (
        <section className={styles.commentsSection}>
            <h3 className={styles.title}>Comments ({comments.length})</h3>

            <div className={styles.commentsList}>
                {comments.length === 0 ? (
                    <p className={styles.noComments}>Be the first to share your thoughts!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className={styles.commentCard}>
                            <div className={styles.commentHeader}>
                                <span className={styles.author}>{comment.author_name}</span>
                                <span className={styles.date}>
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className={styles.content}>{comment.content}</p>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h4 className={styles.formTitle}>Leave a Comment</h4>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <textarea
                        placeholder="What are your thoughts?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                        className={styles.textarea}
                    />
                </div>
                <button type="submit" disabled={submitting} className={styles.submitBtn}>
                    {submitting ? 'Posting...' : 'Post Comment'}
                </button>
            </form>
        </section>
    );
}
