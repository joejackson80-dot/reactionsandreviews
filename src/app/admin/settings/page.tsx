'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSetting, updateSetting } from '@/lib/settings';
import styles from '../admin.module.css';
import pageStyles from './settings.module.css';

interface SettingsState {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    mediaKitContactEmail: string;
    showMediaKitEmailAddress: boolean;
    reviewsPerPage: number;
    autoApproveReviews: boolean;
    allowUserSubmissions: boolean;
    maintenanceMode: boolean;
}

export default function AdminSettings() {
    const [settings, setSettings] = useState<SettingsState>({
        siteName: 'Reactions and Reviews',
        siteDescription: 'Premium video reviews and honest reactions',
        contactEmail: 'contact@reactionsandreviews.com',
        mediaKitContactEmail: 'joejackson80@gmail.com',
        showMediaKitEmailAddress: false,
        reviewsPerPage: 12,
        autoApproveReviews: false,
        allowUserSubmissions: true,
        maintenanceMode: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function loadSettings() {
            const keys = Object.keys(settings) as Array<keyof SettingsState>;
            const loadedSettings = { ...settings };

            for (const key of keys) {
                const val = await getSetting(key, settings[key]);
                loadedSettings[key] = val as never;
            }

            setSettings(loadedSettings);
            setIsLoading(false);
        }
        loadSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const keys = Object.keys(settings) as Array<keyof SettingsState>;
        let success = true;

        for (const key of keys) {
            const res = await updateSetting(key, settings[key]);
            if (!res) success = false;
        }

        setIsSaving(false);
        if (success) {
            alert('Settings saved successfully!');
        } else {
            alert('Failed to save some settings.');
        }
    };

    if (isLoading) {
        return <div className={styles.adminContainer}><p style={{ padding: '2rem' }}>Loading settings...</p></div>;
    }

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
                    </div>

                    {/* Contact Settings */}
                    <div className={pageStyles.settingsSection}>
                        <h2 className={pageStyles.sectionTitle}>Contact Settings</h2>
                        <div className={pageStyles.formGroup}>
                            <label>Default Contact Email</label>
                            <input
                                type="email"
                                value={settings.contactEmail}
                                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                className={pageStyles.input}
                            />
                        </div>
                        <div className={pageStyles.formGroup}>
                            <label>Media Kit Contact Email</label>
                            <input
                                type="email"
                                value={settings.mediaKitContactEmail}
                                onChange={(e) => setSettings({ ...settings, mediaKitContactEmail: e.target.value })}
                                className={pageStyles.input}
                            />
                            <p className={pageStyles.fieldHint}>Specific email for partnership inquiries from the media kit page.</p>
                        </div>
                        <div className={pageStyles.toggleItem}>
                            <div>
                                <h3>Show Email in Media Kit</h3>
                                <p>Whether to display the email address publicly or just the contact form</p>
                            </div>
                            <label className={pageStyles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={settings.showMediaKitEmailAddress}
                                    onChange={(e) => setSettings({ ...settings, showMediaKitEmailAddress: e.target.checked })}
                                />
                                <span className={pageStyles.toggleSlider}></span>
                            </label>
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
                        <button
                            onClick={handleSave}
                            className={pageStyles.saveBtn}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
