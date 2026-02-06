'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useReviews } from '@/context/ReviewContext';
import { useToast } from '@/components/ui/ToastContext';
import styles from '../admin.module.css';
import pageStyles from './reviews.module.css';

export default function AdminReviews() {
    const { reviews, deleteReview } = useReviews();
    const { addToast } = useToast();

    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredReviews = reviews.filter(review => {
        const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
        const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.reviewer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this review?')) {
            await deleteReview(id);
            addToast({
                type: 'info',
                title: 'Review Deleted',
                message: 'The review has been removed from the database.',
            });
        }
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'published': return pageStyles.statusPublished;
            case 'pending': return pageStyles.statusDraft;
            case 'rejected': return pageStyles.statusArchived;
            case 'archived': return pageStyles.statusArchived;
            default: return '';
        }
    };

    return (
        <div className={styles.adminContainer}>
            {/* Header */}
            <header className={styles.adminHeader}>
                <div className={styles.headerContent}>
                    <h1 className={styles.adminTitle}>Review Management</h1>
                    <div className={styles.headerActions}>
                        <Link href="/" className={styles.viewSiteBtn}>View Site</Link>
                        <button className={styles.logoutBtn}>Logout</button>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
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
                    <Link href="/admin/reviews" className={styles.navItemActive}>
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
                    <Link href="/admin/categories" className={styles.navItem}>
                        <span className={styles.navIcon}>📂</span>
                        Categories
                    </Link>
                    <Link href="/admin/settings" className={styles.navItem}>
                        <span className={styles.navIcon}>⚙️</span>
                        Settings
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <div className={pageStyles.pageHeader}>
                    <div className={pageStyles.headerLeft}>
                        <div className={pageStyles.searchBox}>
                            <input
                                type="text"
                                placeholder="Search reviews..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={pageStyles.searchInput}
                            />
                        </div>
                        <div className={pageStyles.filterGroup}>
                            <button
                                className={filterStatus === 'all' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                                onClick={() => setFilterStatus('all')}
                            >
                                All ({reviews.length})
                            </button>
                            <button
                                className={filterStatus === 'published' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                                onClick={() => setFilterStatus('published')}
                            >
                                Published ({reviews.filter(r => r.status === 'published').length})
                            </button>
                            <button
                                className={filterStatus === 'pending' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                                onClick={() => setFilterStatus('pending')}
                            >
                                Pending ({reviews.filter(r => r.status === 'pending').length})
                            </button>
                        </div>
                    </div>
                    <button className={pageStyles.addNewBtn}>+ Add New Review</button>
                </div>

                <div className={pageStyles.tableCard}>
                    <table className={pageStyles.reviewsTable}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Reviewer</th>
                                <th>Rating</th>
                                <th>Views</th>
                                <th>Status</th>
                                <th>Published</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.map((review) => (
                                <tr key={review.id}>
                                    <td className={pageStyles.titleCell}>{review.title}</td>
                                    <td>
                                        <span className={pageStyles.categoryBadge}>{review.category}</span>
                                    </td>
                                    <td>{review.reviewer}</td>
                                    <td>
                                        <div className={pageStyles.ratingCell}>
                                            {'★'.repeat(review.rating)}
                                            {'☆'.repeat(5 - review.rating)}
                                        </div>
                                    </td>
                                    <td>{review.views}</td>
                                    <td>
                                        <span className={`${pageStyles.statusBadge} ${getStatusBadgeClass(review.status)}`}>
                                            {review.status}
                                        </span>
                                    </td>
                                    <td>{review.publishDate}</td>
                                    <td>
                                        <div className={pageStyles.actionButtons}>
                                            <button className={pageStyles.editBtn} title="Edit">✏️</button>
                                            <button className={pageStyles.viewBtn} title="View">👁️</button>
                                            <button
                                                className={pageStyles.deleteBtn}
                                                onClick={() => handleDelete(review.id)}
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
