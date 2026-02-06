'use client';


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useReviews, Review } from '@/context/ReviewContext';
import { useToast } from '@/components/ui/ToastContext';
import { useAuth } from '@/context/AuthContext';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const router = useRouter();
    const { user, loading: authLoading, signOut } = useAuth();
    const { reviews, approveReview, rejectReview, updateReview } = useReviews();
    const { addToast } = useToast();
    const [editingReview, setEditingReview] = useState<Review | null>(null);

    const handleEditClick = (review: Review) => {
        setEditingReview(review);
    };

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingReview) return;

        await updateReview(editingReview.id, {
            affiliateLink: editingReview.affiliateLink,
            articleContent: editingReview.articleContent
        });

        addToast({
            type: 'success',
            title: 'Review Updated',
            message: 'Monetization details saved successfully.'
        });
        setEditingReview(null);
    };

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push('/login');
            } else if (user.role !== 'admin') {
                router.push('/');
                addToast({
                    type: 'error',
                    title: 'Access Denied',
                    message: 'You do not have permission to access the Admin Panel.'
                });
            }
        }
    }, [user, authLoading, router, addToast]);

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    if (authLoading || !user) {
        return <div className="loading-screen">Loading Admin Panel...</div>;
    }

    const pendingReviews = reviews.filter(r => r.status === 'pending');
    const publishedReviews = reviews.filter(r => r.status === 'published');

    const handleApprove = (id: string) => {
        approveReview(id);
        addToast({
            type: 'success',
            title: 'Review Approved',
            message: 'The review has been successfully published.',
            duration: 3000
        });
    };

    const handleReject = (id: string) => {
        rejectReview(id);
        addToast({
            type: 'info',
            title: 'Review Rejected',
            message: 'The review has been rejected and archived.',
            duration: 3000
        });
    };

    const totalRating = publishedReviews.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = publishedReviews.length > 0 ? (totalRating / publishedReviews.length).toFixed(1) : '0.0';

    const stats = {
        totalReviews: reviews.length,
        pendingReviews: pendingReviews.length,
        totalUsers: 142, // Adjusted mock to be more realistic
        totalViews: 45200, // Adjusted mock
        avgRating,
        monthlyGrowth: 15, // Mock
    };

    const recentSubmissions = pendingReviews.slice(0, 5); // Show top 5 pending



    return (
        <div className={styles.adminContainer}>
            {/* Header */}
            <header className={styles.adminHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Admin Dashboard</h1>
                        <button onClick={handleSignOut} className={styles.signOutBtn}>
                            Sign Out
                        </button>
                    </div>
                    <div className={styles.headerActions}>
                        <Link href="/" className={styles.viewSiteBtn}>
                            View Site
                        </Link>
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
                    <Link href="/admin" className={styles.navItemActive}>
                        <span className={styles.navIcon}>🏠</span>
                        Dashboard
                    </Link>
                    <Link href="/admin/reviews" className={styles.navItem}>
                        <span className={styles.navIcon}>🎬</span>
                        Reviews ({publishedReviews.length})
                    </Link>
                    <Link href="/admin/submissions" className={styles.navItem}>
                        <span className={styles.navIcon}>📝</span>
                        Submissions
                        <span className={styles.badge}>{stats.pendingReviews}</span>
                    </Link>
                    <Link href="/admin/users" className={styles.navItem}>
                        <span className={styles.navIcon}>👥</span>
                        Users
                    </Link>
                    <Link href="/admin/categories" className={styles.navItem}>
                        <span className={styles.navIcon}>📂</span>
                        Categories
                    </Link>
                    <Link href="/admin/comments" className={styles.navItem}>
                        <span className={styles.navIcon}>💬</span>
                        Comments
                    </Link>
                    <Link href="/admin/settings" className={styles.navItem}>
                        <span className={styles.navIcon}>⚙️</span>
                        Settings
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>🎬</div>
                        <div className={styles.statInfo}>
                            <div className={styles.statValue}>{stats.totalReviews}</div>
                            <div className={styles.statLabel}>Total Reviews</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>⏳</div>
                        <div className={styles.statInfo}>
                            <div className={styles.statValue}>{stats.pendingReviews}</div>
                            <div className={styles.statLabel}>Pending Reviews</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>👥</div>
                        <div className={styles.statInfo}>
                            <div className={styles.statValue}>{stats.totalUsers.toLocaleString()}</div>
                            <div className={styles.statLabel}>Total Users</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>👁️</div>
                        <div className={styles.statInfo}>
                            <div className={styles.statValue}>{(stats.totalViews / 1000000).toFixed(1)}M</div>
                            <div className={styles.statLabel}>Total Views</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>⭐</div>
                        <div className={styles.statInfo}>
                            <div className={styles.statValue}>{stats.avgRating}</div>
                            <div className={styles.statLabel}>Avg Rating</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>📈</div>
                        <div className={styles.statInfo}>
                            <div className={styles.statValue}>+{stats.monthlyGrowth}%</div>
                            <div className={styles.statLabel}>Monthly Growth</div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className={styles.contentGrid}>
                    {/* Recent Submissions */}
                    <div className={styles.contentCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Details Pending Approval</h2>
                            <Link href="/admin/submissions" className={styles.viewAllLink}>
                                View All →
                            </Link>
                        </div>
                        {/* ... Existing table code ... */}
                        <div className={styles.tableContainer}>
                            {recentSubmissions.length > 0 ? (
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Reviewer</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentSubmissions.map((submission) => (
                                            <tr key={submission.id}>
                                                <td className={styles.titleCell}>{submission.title}</td>
                                                <td>{submission.reviewer}</td>
                                                <td>{submission.publishDate}</td>
                                                <td>
                                                    <span className={styles.statusBadge}>
                                                        {submission.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className={styles.actionButtons}>
                                                        <button
                                                            className={styles.approveBtn}
                                                            onClick={() => handleApprove(submission.id)}
                                                            title="Approve"
                                                        >
                                                            ✓
                                                        </button>
                                                        <button
                                                            className={styles.viewBtn}
                                                            onClick={() => handleEditClick(submission)}
                                                            title="Edit / Add Monetization"
                                                        >
                                                            ✏️
                                                        </button>
                                                        <Link href={`/review/${submission.id}`} target="_blank">
                                                            <button className={styles.viewBtn} title="View">👁️</button>
                                                        </Link>
                                                        <button
                                                            className={styles.deleteBtn}
                                                            onClick={() => handleReject(submission.id)}
                                                            title="Reject"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className={styles.emptyState}>
                                    <p>No pending submissions at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Newsletter Subscribers */}
                    <div className={styles.contentCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Newsletter Subscribers</h2>
                        </div>
                        <div className={styles.subscribersList}>
                            <NewsletterList />
                        </div>
                    </div>
                </div>
            </main>

            {/* Quick Edit Modal */}
            {
                editingReview && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2>Edit Review Details</h2>
                            <form onSubmit={handleSaveEdit}>
                                <div className={styles.formGroup}>
                                    <label>Affiliate / Product Link</label>
                                    <input
                                        type="text"
                                        value={editingReview.affiliateLink || ''}
                                        onChange={(e) => setEditingReview({ ...editingReview, affiliateLink: e.target.value })}
                                        placeholder="https://amazon.com/..."
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Article Content (Excerpt)</label>
                                    <textarea
                                        value={editingReview.articleContent || ''}
                                        onChange={(e) => setEditingReview({ ...editingReview, articleContent: e.target.value })}
                                        placeholder="Edit the written review here..."
                                        rows={5}
                                        className={styles.textarea}
                                    />
                                </div>
                                <div className={styles.modalActions}>
                                    <button type="button" onClick={() => setEditingReview(null)} className={styles.cancelBtn}>Cancel</button>
                                    <button type="submit" className={styles.saveBtn}>Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

interface Subscriber {
    id: string;
    email: string;
    created_at: string;
}

function NewsletterList() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch subscribers directly here for now to avoid context bloat for admin-only feature
        const fetchSubscribers = async () => {
            const { supabase } = await import('@/lib/supabase');
            const { data } = await supabase
                .from('newsletter_subscribers')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10);
            if (data) setSubscribers(data as Subscriber[]);
            setLoading(false);
        };
        fetchSubscribers();
    }, []);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (subscribers.length === 0) return <div className={styles.empty}>No subscribers yet.</div>;

    return (
        <ul className={styles.subList}>
            {subscribers.map((sub) => (
                <li key={sub.id} className={styles.subItem}>
                    <span className={styles.subEmail}>{sub.email}</span>
                    <span className={styles.subDate}>{new Date(sub.created_at).toLocaleDateString()}</span>
                </li>
            ))}
        </ul>
    );
}
