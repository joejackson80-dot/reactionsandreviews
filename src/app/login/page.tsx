'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/ToastContext';
import styles from './login.module.css';

export default function LoginPage() {
    const router = useRouter();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            addToast({
                type: 'error',
                title: 'Login Failed',
                message: error.message
            });
            setLoading(false);
        } else {
            addToast({
                type: 'success',
                title: 'Welcome Back',
                message: 'Successfully logged in. Redirecting to dashboard...',
            });
            router.push('/admin');
        }
    };

    return (
        <main className={styles.loginSection}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <h1 className={styles.title}>Admin Login</h1>
                    <p className={styles.subtitle}>Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </main>
    );
}
