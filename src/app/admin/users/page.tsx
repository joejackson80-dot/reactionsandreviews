'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';
import pageStyles from '../reviews/reviews.module.css';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'reviewer' | 'admin' | 'user';
    reviewCount: number;
    totalViews: string;
    joinedDate: string;
    status: 'active' | 'inactive' | 'banned';
}

export default function AdminUsers() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'Cinema Critic', email: 'cinema@example.com', role: 'reviewer', reviewCount: 45, totalViews: '2.3M', joinedDate: '2025-06-15', status: 'active' },
        { id: 2, name: 'Tech Insider', email: 'tech@example.com', role: 'reviewer', reviewCount: 38, totalViews: '1.8M', joinedDate: '2025-07-20', status: 'active' },
        { id: 3, name: 'GameMaster Pro', email: 'gamer@example.com', role: 'reviewer', reviewCount: 52, totalViews: '3.1M', joinedDate: '2025-05-10', status: 'active' },
        { id: 4, name: 'Audio Expert', email: 'audio@example.com', role: 'reviewer', reviewCount: 29, totalViews: '890K', joinedDate: '2025-08-05', status: 'active' },
        { id: 5, name: 'Admin User', email: 'admin@reactionsandreviews.com', role: 'admin', reviewCount: 0, totalViews: '0', joinedDate: '2025-01-01', status: 'active' },
        { id: 6, name: 'John Doe', email: 'john@example.com', role: 'user', reviewCount: 0, totalViews: '0', joinedDate: '2026-02-01', status: 'active' },
    ]);

    const [filterRole, setFilterRole] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user => {
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    const getRoleBadgeClass = (role: string) => {
        switch (role) {
            case 'admin': return pageStyles.statusArchived;
            case 'reviewer': return pageStyles.statusPublished;
            case 'user': return pageStyles.statusDraft;
            default: return '';
        }
    };

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader}>
                <div className={styles.headerContent}>
                    <h1 className={styles.adminTitle}>User Management</h1>
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
                    <Link href="/admin/users" className={styles.navItemActive}>
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
                    <div className={pageStyles.headerLeft}>
                        <div className={pageStyles.searchBox}>
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={pageStyles.searchInput}
                            />
                        </div>
                        <div className={pageStyles.filterGroup}>
                            <button
                                className={filterRole === 'all' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                                onClick={() => setFilterRole('all')}
                            >
                                All ({users.length})
                            </button>
                            <button
                                className={filterRole === 'reviewer' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                                onClick={() => setFilterRole('reviewer')}
                            >
                                Reviewers ({users.filter(u => u.role === 'reviewer').length})
                            </button>
                            <button
                                className={filterRole === 'admin' ? pageStyles.filterBtnActive : pageStyles.filterBtn}
                                onClick={() => setFilterRole('admin')}
                            >
                                Admins ({users.filter(u => u.role === 'admin').length})
                            </button>
                        </div>
                    </div>
                    <button className={pageStyles.addNewBtn}>+ Add New User</button>
                </div>

                <div className={pageStyles.tableCard}>
                    <table className={pageStyles.reviewsTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Reviews</th>
                                <th>Total Views</th>
                                <th>Joined</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className={pageStyles.titleCell}>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`${pageStyles.statusBadge} ${getRoleBadgeClass(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{user.reviewCount}</td>
                                    <td>{user.totalViews}</td>
                                    <td>{user.joinedDate}</td>
                                    <td>
                                        <span className={`${pageStyles.statusBadge} ${pageStyles.statusPublished}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={pageStyles.actionButtons}>
                                            <button className={pageStyles.editBtn} title="Edit">✏️</button>
                                            <button className={pageStyles.viewBtn} title="View">👁️</button>
                                            <button className={pageStyles.deleteBtn} title="Delete">🗑️</button>
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
