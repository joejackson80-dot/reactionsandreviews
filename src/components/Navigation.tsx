'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Navigation.module.css';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <Link href="/" className={styles.logoLink}>
                    <Image
                        src="/logo.jpg"
                        alt="Reactions and Reviews"
                        width={60}
                        height={60}
                        className={styles.logo}
                        priority
                    />
                    <span className={styles.brandName}>
                        <span className={styles.brandPrimary}>REACTIONS</span>
                        <span className={styles.brandAnd}>&</span>
                        <span className={styles.brandSecondary}>REVIEWS</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.navLinks}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/reviews" className={styles.navLink}>Reviews</Link>
                    <Link href="/categories" className={styles.navLink}>Categories</Link>
                    <Link href="/about" className={styles.navLink}>About</Link>
                    <Link href="/contact" className={styles.navLink}>Contact</Link>
                </div>

                {/* Search & Actions */}
                <div className={styles.navActions}>
                    <form action="/reviews" className={styles.navSearch}>
                        <input
                            type="text"
                            name="q"
                            placeholder="Search..."
                            className={styles.searchNavInput}
                        />
                        <button type="submit" className={styles.searchNavBtn}>🔍</button>
                    </form>

                    <Link href="/submit" className={styles.submitBtn}>
                        Submit Review
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={styles.menuToggle}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={isMenuOpen ? styles.menuIconOpen : styles.menuIcon}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="/" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                        Home
                    </Link>
                    <Link href="/reviews" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                        Reviews
                    </Link>
                    <Link href="/categories" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                        Categories
                    </Link>
                    <Link href="/about" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                        About
                    </Link>
                    <Link href="/contact" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                        Contact
                    </Link>
                    <Link href="/submit" className={styles.mobileSubmit} onClick={() => setIsMenuOpen(false)}>
                        Submit Review
                    </Link>
                </div>
            )}
        </nav>
    );
}
