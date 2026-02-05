'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';
import pageStyles from '../reviews/reviews.module.css';

interface Submission {
    id: number;
    title: string;
    category: string;
    reviewer: string;
    email: string;
    videoUrl: string;
    submittedDate: string;
    status: 'pending' | 'approved' | 'rejected';
}

export default function AdminSubmissions() {
    const [submissions, setSubmissions] = useState<Submission[]>([
        { id: 1, title: 'New Tech Review - Smartphone X', category: 'Tech', reviewer: 'John Doe', email: 'john@example.com', videoUrl: 'https://youtube.com/...', submittedDate: '2026-02-02', status: 'pending' },
        { id: 2, title: 'Movie Analysis - Action Film 2026', category: 'Movies', reviewer: 'Jane Smith', email: 'jane@example.com', videoUrl: 'https://youtube.com/...', submittedDate: '2026-02-02', status: 'pending' },
        { id: 3, title: 'Gaming Review - RPG Adventure', category: 'Games', reviewer: 'Mike Johnson', email: 'mike@example.com', videoUrl: 'https://youtube.com/...', submittedDate: '2026-02-01', status: 'pending' },
        { id: 4, title: 'Music Album Review', category: 'Music', reviewer: 'Sarah Wilson', email: 'sarah@example.com', videoUrl: 'https://youtube.com/...', submittedDate: '2026-02-01', status: 'approved' },
        { id: 5, title: 'Product Unboxing Video', category: 'Products', reviewer: 'Tom Brown', email: 'tom@example.com', videoUrl: 'https://youtube.com/...', submittedDate: '2026-01-31', status: 'rejected' },
    ]);

    const [filterStatus, setFilterStatus] = useState<string>('pending');

    const filteredSubmissions = submissions.filter(sub =>
        filterStatus === 'all' || sub.status === filterStatus
    );

    const handleApprove = (id: number) => {
        setSubmissions(submissions.map(sub =>
            sub.id === id ? { ...sub, status: 'approved' } : sub
        ));
    };

    const handleReject = (id: number) => {
        if (confirm('Are you sure you want to reject this submission?')) {
            setSubmissions(submissions.map(sub =>
                sub.id === id ? { ...sub, status: 'rejected' } : sub
            ));
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
                        <span className={styles.badge}>{submissions.filter(s => s.status === 'pending').length}</span>
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
                            Pending ({submissions.filter(s => s.status === 'pending').length})
                        </button>
                        <button
                            className={filterStatus === 'approved' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                            onClick={() => setFilterStatus('approved')}
                        >
                            Approved ({submissions.filter(s => s.status === 'approved').length})
                        </button>
                        <button
                            className={filterStatus === 'rejected' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                            onClick={() => setFilterStatus('rejected')}
                        >
                            Rejected ({submissions.filter(s => s.status === 'rejected').length})
                        </button>
                        <button
                            className={filterStatus === 'all' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                            onClick={() => setFilterStatus('all')}
                        >
                            All ({submissions.length})
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
                                    <td>{submission.email}</td>
                                    <td>{submission.submittedDate}</td>
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
