'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';
import pageStyles from './settings.module.css';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        siteName: 'Reactions and Reviews',
        siteDescription: 'Premium video reviews and honest reactions',
        contactEmail: 'contact@reactionsandreviews.com',
        reviewsPerPage: 12,
        autoApproveReviews: false,
        allowUserSubmissions: true,
        requireEmailVerification: true,
        maintenanceMode: false,
    });

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader}>
                <div className={styles.headerContent}>
                    <h1 className={styles.adminTitle}>Settings</h1>
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
                    <Link href="/admin/categories" className={styles.navItem}>
                        <span className={styles.navIcon}>📂</span>
                        Categories
                    </Link>
                    <Link href="/admin/settings" className={styles.navItemActive}>
                        <span className={styles.navIcon}>⚙️</span>
                        Settings
                    </Link>
                </nav>
            </aside>

            <main className={styles.mainContent}>
                <div className={pageStyles.settingsContainer}>
                    {/* General Settings */}
                    <div className={pageStyles.settingsSection}>
                        <h2 className={pageStyles.sectionTitle}>General Settings</h2>
                        <div className={pageStyles.formGroup}>
                            <label>Site Name</label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                className={pageStyles.input}
                            />
                        </div>
                        <div className={pageStyles.formGroup}>
                            <label>Site Description</label>
                            <textarea
                                value={settings.siteDescription}
                                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                                className={pageStyles.textarea}
                                rows={3}
                            />
                        </div>
                        <div className={pageStyles.formGroup}>
                            <label>Contact Email</label>
                            <input
                                type="email"
                                value={settings.contactEmail}
                                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                className={pageStyles.input}
                            />
                        </div>
                    </div>

                    {/* Review Settings */}
                    <div className={pageStyles.settingsSection}>
                        <h2 className={pageStyles.sectionTitle}>Review Settings</h2>
                        <div className={pageStyles.formGroup}>
                            <label>Reviews Per Page</label>
                            <input
                                type="number"
                                value={settings.reviewsPerPage}
                                onChange={(e) => setSettings({ ...settings, reviewsPerPage: parseInt(e.target.value) })}
                                className={pageStyles.input}
                            />
                        </div>
                        <div className={pageStyles.toggleGroup}>
                            <div className={pageStyles.toggleItem}>
                                <div>
                                    <h3>Auto-Approve Reviews</h3>
                                    <p>Automatically publish new review submissions</p>
                                </div>
                                <label className={pageStyles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={settings.autoApproveReviews}
                                        onChange={(e) => setSettings({ ...settings, autoApproveReviews: e.target.checked })}
                                    />
                                    <span className={pageStyles.toggleSlider}></span>
                                </label>
                            </div>
                            <div className={pageStyles.toggleItem}>
                                <div>
                                    <h3>Allow User Submissions</h3>
                                    <p>Enable users to submit their own reviews</p>
                                </div>
                                <label className={pageStyles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={settings.allowUserSubmissions}
                                        onChange={(e) => setSettings({ ...settings, allowUserSubmissions: e.target.checked })}
                                    />
                                    <span className={pageStyles.toggleSlider}></span>
                                </label>
                            </div>
                            <div className={pageStyles.toggleItem}>
                                <div>
                                    <h3>Email Verification Required</h3>
                                    <p>Require email verification for new submissions</p>
                                </div>
                                <label className={pageStyles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={settings.requireEmailVerification}
                                        onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
                                    />
                                    <span className={pageStyles.toggleSlider}></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Site Status */}
                    <div className={pageStyles.settingsSection}>
                        <h2 className={pageStyles.sectionTitle}>Site Status</h2>
                        <div className={pageStyles.toggleGroup}>
                            <div className={pageStyles.toggleItem}>
                                <div>
                                    <h3>Maintenance Mode</h3>
                                    <p className={pageStyles.warningText}>
                                        ⚠️ Enable this to put the site in maintenance mode
                                    </p>
                                </div>
                                <label className={pageStyles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={settings.maintenanceMode}
                                        onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                                    />
                                    <span className={pageStyles.toggleSlider}></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className={pageStyles.saveSection}>
                        <button onClick={handleSave} className={pageStyles.saveBtn}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
