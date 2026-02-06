import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);

    // Smooth physics for the spotlight
    const mouseXSpring = useSpring(mouseX, { stiffness: 500, damping: 50 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 500, damping: 50 });

    const spotlightX = useTransform(mouseXSpring, (val) => `${val}%`);
    const spotlightY = useTransform(mouseYSpring, (val) => `${val}%`);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const { left, top, width, height } = heroRef.current.getBoundingClientRect();
            mouseX.set(((e.clientX - left) / width) * 100);
            mouseY.set(((e.clientY - top) / height) * 100);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.section
            ref={heroRef}
            className={`${styles.hero} spotlight-container`}
            style={{
                '--mouse-x': spotlightX,
                '--mouse-y': spotlightY,
            } as React.CSSProperties}
        >
            {/* Animated Mesh Background */}
            <div className={styles.meshBackground}>
                <div className={styles.meshPart1}></div>
                <div className={styles.meshPart2}></div>
                <div className={styles.meshPart3}></div>
            </div>

            <div className={styles.heroOverlay}></div>

            <motion.div
                className={styles.heroContent}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    className={styles.badge}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <span className={styles.badgeDot}></span>
                    PREMIUM VIDEO REVIEWS
                </motion.div>

                <h1 className={styles.heroTitle}>
                    Honest <span className={styles.highlight}>Reactions</span>
                    <br />
                    Unfiltered <span className={styles.highlightGold}>Reviews</span>
                </h1>

                <p className={styles.heroSubtitle}>
                    Watch in-depth video reactions and reviews of movies, tech, games, music, and products.
                    Real opinions from real people.
                </p>

                <div className={styles.heroCta}>
                    <Link href="/reviews" className={styles.btnPrimary}>
                        <span>Explore Reviews</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link href="/submit" className={styles.btnSecondary}>
                        <span>Submit Your Review</span>
                    </Link>
                </div>

                <div className={styles.statsGrid}>
                    {[
                        { num: '500+', label: 'Video Reviews' },
                        { num: '50K+', label: 'Monthly Views' },
                        { num: '4.8★', label: 'Avg Rating' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className={styles.statCard}
                            whileHover={{ y: -5, borderColor: 'var(--color-crimson)' }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        >
                            <div className={styles.statNumber}>{stat.num}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className={styles.scrollIndicator}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className={styles.mouse}>
                    <div className={styles.mouseWheel}></div>
                </div>
                <span>Scroll to explore</span>
            </motion.div>
        </motion.section>
    );
}
