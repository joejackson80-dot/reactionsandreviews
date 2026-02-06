'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Define the Review type
export interface Review {
    id: string;
    title: string;
    category: string;
    thumbnail: string;
    rating: number;
    views: string;
    duration: string;
    reviewer: string;
    publishDate: string;
    description: string;
    videoEmbed?: string;
    videoUrl?: string; // For submission tracking
    status: 'published' | 'pending' | 'rejected';
    likes?: number;
    articleContent?: string; // For transcribed written reviews
    tags?: string[];
    affiliateLink?: string;
    reviewerEmail?: string;
}

export interface Comment {
    id: string;
    review_id: string;
    author_name: string;
    content: string;
    created_at: string;
}



interface ReviewContextType {
    reviews: Review[];
    addReview: (review: Omit<Review, 'id' | 'views' | 'date' | 'status'>) => void;
    approveReview: (id: string) => void;
    rejectReview: (id: string) => void;
    deleteReview: (id: string) => void;
    updateReview: (id: string, updates: Partial<Review>) => Promise<void>;
    getReview: (id: string) => Review | undefined;
    searchReviews: (query: string) => Promise<Review[]>;
    toggleLike: (id: string) => Promise<void>;
    getComments: (reviewId: string) => Promise<Comment[]>;
    addComment: (reviewId: string, author: string, content: string) => Promise<void>;
    deleteComment: (commentId: string) => Promise<void>;
    subscribeNewsletter: (email: string) => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
    const [reviews, setReviews] = useState<Review[]>([]);


    useEffect(() => {
        const fetchReviews = async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching reviews:', error);
            } else if (data) {
                const mappedReviews: Review[] = data.map(r => ({
                    id: r.id,
                    title: r.title,
                    category: r.category,
                    thumbnail: r.thumbnail,
                    rating: r.rating,
                    views: r.views,
                    duration: r.duration,
                    reviewer: r.reviewer,
                    publishDate: r.publish_date, // Map snake_case to camelCase
                    description: r.description,
                    videoEmbed: r.video_embed,   // Map snake_case to camelCase
                    videoUrl: r.video_url,       // Map snake_case to camelCase
                    status: r.status,
                    likes: r.likes || 0,
                    articleContent: r.article_content,
                    tags: r.tags || [],
                    affiliateLink: r.affiliate_link
                }));
                setReviews(mappedReviews);
            }
        };

        fetchReviews();
    }, []);

    const addReview = async (reviewData: Omit<Review, 'id' | 'views' | 'date' | 'status'>) => {
        // Optimistic UI Update (optional, but skipping for simplicity/correctness first)
        const { data, error } = await supabase
            .from('reviews')
            .insert([{
                title: reviewData.title,
                category: reviewData.category,
                thumbnail: reviewData.thumbnail,
                rating: reviewData.rating,
                views: '0',
                duration: reviewData.duration,
                reviewer: reviewData.reviewer,
                publish_date: reviewData.publishDate,
                description: reviewData.description,
                video_embed: reviewData.videoEmbed,
                video_url: reviewData.videoUrl,
                article_content: reviewData.articleContent,
                affiliate_link: reviewData.affiliateLink,
                reviewer_email: reviewData.reviewerEmail,
                status: 'pending'
            }])
            .select();

        if (error) {
            console.error('Error adding review:', error);
            return;
        }

        if (data) {
            const newReview = data[0];
            const mappedReview: Review = {
                id: newReview.id,
                title: newReview.title,
                category: newReview.category,
                thumbnail: newReview.thumbnail,
                rating: newReview.rating,
                views: newReview.views,
                duration: newReview.duration,
                reviewer: newReview.reviewer,
                publishDate: newReview.publish_date,
                description: newReview.description,
                videoEmbed: newReview.video_embed,
                videoUrl: newReview.video_url,
                articleContent: newReview.article_content,
                affiliateLink: newReview.affiliate_link,
                reviewerEmail: newReview.reviewer_email,
                status: newReview.status
            };
            setReviews(prev => [mappedReview, ...prev]);
        }
    };

    const approveReview = async (id: string) => {
        const { error } = await supabase
            .from('reviews')
            .update({ status: 'published' })
            .eq('id', id);

        if (error) console.error('Error approving review:', error);
        else {
            setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'published' } : r));
        }
    };

    const rejectReview = async (id: string) => {
        const { error } = await supabase
            .from('reviews')
            .update({ status: 'rejected' })
            .eq('id', id);

        if (error) console.error('Error rejecting review:', error);
        else {
            setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
        }
    };

    const updateReview = async (id: string, updates: Partial<Review>) => {
        // Map camelCase to snake_case for DB
        // Map camelCase to snake_case for DB
        const dbUpdates: Record<string, string | number | boolean | null | undefined | string[]> = {};
        if (updates.title) dbUpdates.title = updates.title;
        if (updates.category) dbUpdates.category = updates.category;
        if (updates.description) dbUpdates.description = updates.description;
        if (updates.videoUrl) dbUpdates.video_url = updates.videoUrl;
        if (updates.videoEmbed) dbUpdates.video_embed = updates.videoEmbed;
        if (updates.articleContent !== undefined) dbUpdates.article_content = updates.articleContent;
        if (updates.affiliateLink !== undefined) dbUpdates.affiliate_link = updates.affiliateLink;
        if (updates.reviewerEmail !== undefined) dbUpdates.reviewer_email = updates.reviewerEmail;
        if (updates.tags) dbUpdates.tags = updates.tags;
        if (updates.reviewer) dbUpdates.reviewer = updates.reviewer;
        if (updates.status) dbUpdates.status = updates.status;

        const { error } = await supabase
            .from('reviews')
            .update(dbUpdates)
            .eq('id', id);

        if (error) {
            console.error('Error updating review:', error);
        } else {
            console.log('Update successful, updating local state');
            setReviews(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
        }
    };

    const deleteReview = async (id: string) => {
        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id);

        if (error) console.error('Error deleting review:', error);
        else {
            setReviews(prev => prev.filter(r => r.id !== id));
        }
    };

    const getReview = (id: string) => {
        return reviews.find(r => r.id === id);
    };

    const searchReviews = async (query: string): Promise<Review[]> => {
        if (!query.trim()) return reviews;

        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .or(`title.ilike.%${query}%,description.ilike.%${query}%,reviewer.ilike.%${query}%`)
            .eq('status', 'published')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error searching reviews:', error);
            return [];
        }

        return (data || []).map(r => ({
            id: r.id,
            title: r.title,
            category: r.category,
            thumbnail: r.thumbnail,
            rating: r.rating,
            views: r.views,
            duration: r.duration,
            reviewer: r.reviewer,
            publishDate: r.publish_date,
            description: r.description,
            videoEmbed: r.video_embed,
            videoUrl: r.video_url,
            status: r.status,
            likes: r.likes || 0,
            articleContent: r.article_content,
            affiliateLink: r.affiliate_link,
            tags: r.tags || []
        }));
    };

    // Engagement Features
    const toggleLike = async (id: string) => {
        // Optimistic update
        setReviews(prev => prev.map(r => {
            if (r.id === id) {
                return { ...r, likes: (r.likes || 0) + 1 };
            }
            return r;
        }));

        // Actual DB update (increment)
        // RPC is safer for concurrency but for simple demo, getting current and updating is okay,
        // or just sending the increment logic if supabase supports it easily via client.
        // For now, let's just do a simple fetch-update loop or blind increment if we had an rpc.
        // We will just do a simple increment on the client's assumption for this demo.
        const current = reviews.find(r => r.id === id);
        if (current) {
            const newLikes = (current.likes || 0) + 1;
            await supabase.from('reviews').update({ likes: newLikes }).eq('id', id);
        }
    };

    const getComments = async (reviewId: string) => {
        const { data } = await supabase
            .from('comments')
            .select('*')
            .eq('review_id', reviewId)
            .order('created_at', { ascending: false });
        return data || [];
    };

    const addComment = async (reviewId: string, author: string, content: string) => {
        const { error } = await supabase
            .from('comments')
            .insert([{ review_id: reviewId, author_name: author, content }]);

        if (error) throw error;
    };

    const deleteComment = async (commentId: string) => {
        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', commentId);

        if (error) throw error;
    };

    const subscribeNewsletter = async (email: string) => {
        const { error } = await supabase
            .from('newsletter_subscribers')
            .insert([{ email }]);

        if (error) throw error;
    };


    return (
        <ReviewContext.Provider value={{
            reviews,
            addReview,
            approveReview,
            rejectReview,
            deleteReview,
            updateReview,
            getReview,
            searchReviews,
            toggleLike,
            getComments,
            addComment,
            deleteComment,
            subscribeNewsletter
        }}>
            {children}
        </ReviewContext.Provider>
    );
}

export function useReviews() {
    const context = useContext(ReviewContext);
    if (context === undefined) {
        throw new Error('useReviews must be used within a ReviewProvider');
    }
    return context;
}
