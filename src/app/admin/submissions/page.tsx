'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useReviews } from '@/context/ReviewContext';
import { useToast } from '@/components/ui/ToastContext';
import styles from '../admin.module.css';
import pageStyles from '../reviews/reviews.module.css';

export default function AdminSubmissions() {
    const { reviews, approveReview, rejectReview } = useReviews();
    const { addToast } = useToast();

    const [filterStatus, setFilterStatus] = useState<string>('pending');

    const filteredSubmissions = reviews.filter(sub =>
        filterStatus === 'all' || sub.status === filterStatus
    );

    const handleApprove = async (id: string) => {
        await approveReview(id);
        addToast({
            type: 'success',
            title: 'Review Approved',
            message: 'The review has been published successfully.',
        });
    };

    const handleReject = async (id: string) => {
        if (confirm('Are you sure you want to reject this submission?')) {
            await rejectReview(id);
            addToast({
                type: 'info',
                title: 'Review Rejected',
                message: 'The submission has been rejected.',
            });
        }
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'approved': return pageStyles.statusPublished;
            case 'pending': return pageStyles.statusDraft;
            case 'rejected': return pageStyles.statusArchived;
            default: return '';
        }
    };

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader}>
                <div className={styles.headerContent}>
                    <h1 className={styles.adminTitle}>Review Submissions</h1>
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
                    <Link href="/admin/submissions" className={styles.navItemActive}>
                        <span className={styles.navIcon}>📝</span>
                        Submissions
                        <span className={styles.badge}>{reviews.filter(r => r.status === 'pending').length}</span>
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

            <main className={styles.mainContent}>
                <div className={pageStyles.pageHeader}>
                    <div className={pageStyles.filterGroup}>
                        <button
                            className={filterStatus === 'pending' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                            onClick={() => setFilterStatus('pending')}
                        >
                            Pending ({reviews.filter(r => r.status === 'pending').length})
                        </button>
                        <button
                            className={filterStatus === 'approved' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                            onClick={() => setFilterStatus('approved')}
                        >
                            Approved ({reviews.filter(r => r.status === 'published').length})
                        </button>
                        <button
                            className={filterStatus === 'rejected' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                            onClick={() => setFilterStatus('rejected')}
                        >
                            Rejected ({reviews.filter(r => r.status === 'rejected').length})
                        </button>
                        <button
                            className={filterStatus === 'all' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                            onClick={() => setFilterStatus('all')}
                        >
                            All ({reviews.length})
                        </button>
                    </div>
                </div>

                <div className={pageStyles.tableCard}>
                    <table className={pageStyles.reviewsTable}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Reviewer</th>
                                <th>Email</th>
                                <th>Submitted</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubmissions.map((submission) => (
                                <tr key={submission.id}>
                                    <td className={pageStyles.titleCell}>{submission.title}</td>
                                    <td>
                                        <span className={pageStyles.categoryBadge}>{submission.category}</span>
                                    </td>
                                    <td>{submission.reviewer}</td>
                                    <td>{submission.reviewerEmail}</td>
                                    <td>{submission.publishDate}</td>
                                    <td>
                                        <span className={`${pageStyles.statusBadge} ${getStatusBadgeClass(submission.status)}`}>
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={pageStyles.actionButtons}>
                                            {submission.status === 'pending' && (
                                                <>
                                                    <button
                                                        className={pageStyles.editBtn}
                                                        onClick={() => handleApprove(submission.id)}
                                                        title="Approve"
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className={pageStyles.deleteBtn}
                                                        onClick={() => handleReject(submission.id)}
                                                        title="Reject"
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            )}
                                            <button className={pageStyles.viewBtn} title="View Details">👁️</button>
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
