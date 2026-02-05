'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useReviews, Comment } from '@/context/ReviewContext';
import AuthModal from './AuthModal';
import styles from './CommentsSection.module.css';

interface CommentsSectionProps {
    reviewId: string;
}

export default function CommentsSection({ reviewId }: CommentsSectionProps) {
    const { getComments, addComment } = useReviews();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState<any>(null);
    const supabase = createClientComponentClient();

    // Check auth status
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

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

        if (!user) {
            setShowAuthModal(true);
            return;
        }

        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const authorName = user.email?.split('@')[0] || 'Anonymous';
            await addComment(reviewId, authorName, newComment);
            setNewComment('');
            loadComments();
        } catch (error) {
            console.error('Failed to post comment', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
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

                {user && (
                    <div className={styles.userInfo}>
                        <span>Signed in as <strong>{user.email}</strong></span>
                        <button type="button" onClick={handleSignOut} className={styles.signOutBtn}>
                            Sign Out
                        </button>
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <textarea
                        placeholder={user ? "What are your thoughts?" : "Sign in to leave a comment..."}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                        className={styles.textarea}
                        disabled={!user}
                        onClick={() => !user && setShowAuthModal(true)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting || !user}
                    className={styles.submitBtn}
                    onClick={(e) => {
                        if (!user) {
                            e.preventDefault();
                            setShowAuthModal(true);
                        }
                    }}
                >
                    {submitting ? 'Posting...' : user ? 'Post Comment' : 'Sign in to Comment'}
                </button>
            </form>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => setShowAuthModal(false)}
            />
        </section>
    );
}
