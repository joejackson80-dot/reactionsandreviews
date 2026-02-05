'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/ToastContext';
import styles from './comments.module.css';

interface CommentWithReview {
    id: string;
    content: string;
    author_name: string;
    created_at: string;
    review_id: string;
    reviews: {
        title: string;
    };
}

export default function AdminCommentsPage() {
    const { user, loading: authLoading } = useAuth();
    const { addToast } = useToast();
    const [comments, setComments] = useState<CommentWithReview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('comments')
                .select(`
                    *,
                    reviews (
                        title
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching comments:', error);
                addToast({ type: 'error', title: 'Error', message: 'Failed to load comments' });
            } else {
                // Determine if data is an array or single object (it's query dependent, select returns array)
                // Casting for simplicity as Supabase types can be tricky with joins
                setComments(data as unknown as CommentWithReview[]);
            }
            setLoading(false);
        };

        if (user) {
            fetchComments();
        }
    }, [user, addToast]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting comment:', error);
            addToast({ type: 'error', title: 'Error', message: 'Failed to delete comment' });
        } else {
            setComments(comments.filter(c => c.id !== id));
            addToast({ type: 'success', title: 'Success', message: 'Comment deleted' });
        }
    };

    if (authLoading || loading) return <div className={styles.loading}>Loading comments...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    💬 Comment Moderation
                </h1>
                <Link href="/admin" className={styles.backLink}>
                    ← Back to Dashboard
                </Link>
            </header>

            <div className={styles.commentsList}>
                {comments.length === 0 ? (
                    <div className={styles.emptyState}>No comments found.</div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className={styles.commentCard}>
                            <div className={styles.commentInfo}>
                                <div className={styles.meta}>
                                    <span className={styles.author}>{comment.author_name}</span>
                                    <span>•</span>
                                    <span className={styles.date}>
                                        {new Date(comment.created_at).toLocaleDateString()} at {new Date(comment.created_at).toLocaleTimeString()}
                                    </span>
                                    <span>•</span>
                                    <Link href={`/review/${comment.review_id}`} className={styles.reviewLink} target="_blank">
                                        On: {comment.reviews?.title || 'Unknown Review'}
                                    </Link>
                                </div>
                                <p className={styles.content}>{comment.content}</p>
                            </div>
                            <div className={styles.actions}>
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className={styles.deleteBtn}
                                    title="Delete Comment"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
