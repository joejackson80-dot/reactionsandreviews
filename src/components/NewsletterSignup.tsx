'use client';

import { useState } from 'react';
import { useReviews } from '@/context/ReviewContext';
import { useToast } from './ui/ToastContext';
import styles from './NewsletterSignup.module.css';

export default function NewsletterSignup() {
    const { subscribeNewsletter } = useReviews();
    const { addToast } = useToast();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            await subscribeNewsletter(email);
            addToast({
                type: 'success',
                title: 'Welcome to the Club!',
                message: 'You have successfully subscribed to our newsletter.',
            });
            setEmail('');
        } catch (error) {
            console.error(error);
            addToast({
                type: 'info',
                title: 'Already Subscribed?',
                message: 'If you are already on the list, you are all set!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.newsletterSection}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.textColumn}>
                        <h2 className={styles.title}>Join The Community</h2>
                        <p className={styles.subtitle}>
                            Get exclusive alerts for new reviews, early access to reactions, and insider tech & movie news.
                        </p>
                    </div>
                    <form className={styles.formColumn} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.button} disabled={loading}>
                            {loading ? 'Subscribing...' : 'Get Notified'}
                        </button>
                    </form>
                </div>
            </div>
            <div className={styles.backgroundGlow}></div>
        </section>
    );
}
