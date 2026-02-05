'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';
import pageStyles from './categories.module.css';

interface Category {
    id: string;
    name: string;
    icon: string;
    reviewCount: number;
    color: string;
    description: string;
}

export default function AdminCategories() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [categories, setCategories] = useState<Category[]>([
        { id: 'movies', name: 'Movies', icon: '🎥', reviewCount: 156, color: '#DC2626', description: 'Film reviews and cinema analysis' },
        { id: 'tech', name: 'Tech', icon: '💻', reviewCount: 203, color: '#2563EB', description: 'Technology reviews and unboxings' },
        { id: 'games', name: 'Games', icon: '🎮', reviewCount: 189, color: '#7C3AED', description: 'Gaming reviews and walkthroughs' },
        { id: 'music', name: 'Music', icon: '🎵', reviewCount: 134, color: '#059669', description: 'Music and audio reviews' },
        { id: 'products', name: 'Products', icon: '📦', reviewCount: 178, color: '#D97706', description: 'Product reviews and demonstrations' },
    ]);

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader}>
                <div className={styles.headerContent}>
                    <h1 className={styles.adminTitle}>Category Management</h1>
                    <div className={styles.headerActions}>
                        <Link href="/" className={styles.viewSiteBtn}>View Site</Link>
                        <button className={styles.logoutBtn}>Logout</button>
                    </div>
                </div>
            </header>

            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <span className={styles.logoIcon}>📊</span>
                    <span className={styles.logoText}>RR Admin</span>
                </div>
                <nav className={styles.sidebarNav}>
                    <Link href="/admin" className={styles.navItem}>
                        <span className={styles.navIcon}>🏠</span>
                        Dashboard
                    </Link>
                    <Link href="/admin/reviews" className={styles.navItem}>
                        <span className={styles.navIcon}>🎬</span>
                        Reviews
                    </Link>
                    <Link href="/admin/submissions" className={styles.navItem}>
                        <span className={styles.navIcon}>📝</span>
                        Submissions
                        <span className={styles.badge}>12</span>
                    </Link>
                    <Link href="/admin/users" className={styles.navItem}>
                        <span className={styles.navIcon}>👥</span>
                        Users
                    </Link>
                    <Link href="/admin/categories" className={styles.navItemActive}>
                        <span className={styles.navIcon}>📂</span>
                        Categories
                    </Link>
                    <Link href="/admin/settings" className={styles.navItem}>
                        <span className={styles.navIcon}>⚙️</span>
                        Settings
                    </Link>
                </nav>
            </aside>

            <main className={styles.mainContent}>
                <div className={pageStyles.pageHeader}>
                    <h2 className={pageStyles.pageTitle}>Manage Categories</h2>
                    <button className={pageStyles.addBtn}>+ Add Category</button>
                </div>

                <div className={pageStyles.categoriesGrid}>
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={pageStyles.categoryCard}
                            style={{ '--category-color': category.color } as React.CSSProperties}
                        >
                            <div className={pageStyles.cardHeader}>
                                <div className={pageStyles.categoryIconLarge}>{category.icon}</div>
                                <div className={pageStyles.categoryInfo}>
                                    <h3 className={pageStyles.categoryName}>{category.name}</h3>
                                    <p className={pageStyles.categoryDescription}>{category.description}</p>
                                </div>
                            </div>

                            <div className={pageStyles.categoryStats}>
                                <div className={pageStyles.stat}>
                                    <span className={pageStyles.statValue}>{category.reviewCount}</span>
                                    <span className={pageStyles.statLabel}>Reviews</span>
                                </div>
                                <div className={pageStyles.stat}>
                                    <span className={pageStyles.statValue} style={{ color: category.color }}>
                                        {category.color}
                                    </span>
                                    <span className={pageStyles.statLabel}>Color</span>
                                </div>
                            </div>

                            <div className={pageStyles.cardActions}>
                                <button className={pageStyles.editBtn}>Edit</button>
                                <button className={pageStyles.deleteBtn}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
