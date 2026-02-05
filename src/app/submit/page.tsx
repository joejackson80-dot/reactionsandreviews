'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useReviews } from '@/context/ReviewContext';
import { useToast } from '@/components/ui/ToastContext';
import styles from './submit.module.css';

export default function SubmitPage() {
    const { addReview } = useReviews();
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        videoUrl: '',
        reviewer: '',
        email: '',
        description: '',
        articleContent: '',
        affiliateLink: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Add review to context
        addReview({
            title: formData.title,
            category: formData.category,
            thumbnail: `/movie-review.png`, // Placeholder
            rating: 0, // Not rated yet
            duration: '00:00', // Placeholder
            reviewer: formData.reviewer,
            publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            description: formData.description,
            videoEmbed: formData.videoUrl.replace('watch?v=', 'embed/'), // Simple conversion
            videoUrl: formData.videoUrl,
            articleContent: formData.articleContent,
            affiliateLink: formData.affiliateLink,
        });

        // Trigger Confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        addToast({
            type: 'success',
            title: 'Review Submitted',
            message: 'Your review has been submitted for approval. We\'ll notify you via email once it\'s published.',
        });

        setFormData({ title: '', category: '', videoUrl: '', reviewer: '', email: '', description: '', articleContent: '', affiliateLink: '' });
        setIsSubmitting(false);
    };

    return (
        <main className={styles.main}>
            <Navigation />

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.pageTitle}>Submit Your Review</h1>
                    <p className={styles.pageSubtitle}>
                        Share your reactions and reviews with our community
                    </p>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.guidelinesBox}>
                        <h2>Submission Guidelines</h2>
                        <ul>
                            <li>✓ Reviews must be your original content</li>
                            <li>✓ Videos should be high quality (720p minimum)</li>
                            <li>✓ Maintain honest and respectful commentary</li>
                            <li>✓ Include proper context and analysis</li>
                            <li>✓ All submissions are reviewed before publishing</li>
                        </ul>
                    </div>

                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.submitForm}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="title">Review Title *</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Latest Smartphone Review - Worth the Upgrade?"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="category">Category *</label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Movies">Movies 🎥</option>
                                        <option value="Books">Books �</option>
                                        <option value="Music">Music �</option>
                                        <option value="Trending Content">Trending Content 🔥</option>
                                        <option value="Products">Products 📦</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="videoUrl">Video URL *</label>
                                <input
                                    type="url"
                                    id="videoUrl"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    required
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                                <span className={styles.helpText}>
                                    YouTube, Vimeo, or direct video links accepted
                                </span>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="reviewer">Your Name *</label>
                                    <input
                                        type="text"
                                        id="reviewer"
                                        name="reviewer"
                                        value={formData.reviewer}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="description">Short Description *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    placeholder="Brief summary for the card view..."
                                    rows={3}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="articleContent">Full Written Review / Transcript</label>
                                <textarea
                                    id="articleContent"
                                    name="articleContent"
                                    value={formData.articleContent}
                                    onChange={handleChange}
                                    placeholder="Paste the full video transcript or written article here. This will appear below the video."
                                    rows={10}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="affiliateLink">Affiliate / Product Link (Optional)</label>
                                <input
                                    type="url"
                                    id="affiliateLink"
                                    name="affiliateLink"
                                    value={formData.affiliateLink}
                                    onChange={handleChange}
                                    placeholder="https://amazon.com/..."
                                />
                                <span className={styles.helpText}>
                                    Link to the product being reviewed (for monetization)
                                </span>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Review'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
