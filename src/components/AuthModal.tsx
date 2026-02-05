'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from './AuthModal.module.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const supabase = createClientComponentClient();

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;

            setMessage('Check your email for the magic link!');
            setEmail('');
        } catch (err: any) {
            setError(err.message || 'Failed to send magic link');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>

                <h2 className={styles.title}>Sign in to Comment</h2>
                <p className={styles.subtitle}>We'll send you a magic link to sign in instantly</p>

                <form onSubmit={handleMagicLink} className={styles.form}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Magic Link'}
                    </button>
                </form>

                {message && <p className={styles.success}>{message}</p>}
                {error && <p className={styles.error}>{error}</p>}

                <p className={styles.privacy}>
                    We'll never share your email. No spam, ever.
                </p>
            </div>
        </div>
    );
}
