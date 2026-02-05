import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import styles from '../about/about.module.css';

export default function TermsPage() {
    return (
        <main className={styles.main}>
            <Navigation />

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.pageTitle}>Terms of Service</h1>
                    <p className={styles.pageSubtitle}>Last updated: February 2, 2026</p>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.textBlock}>
                            <h2>Agreement to Terms</h2>
                            <p>
                                By accessing and using Reactions and Reviews, you accept and agree to be bound by the terms
                                and provision of this agreement. If you do not agree to abide by the above, please do not use
                                this service.
                            </p>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Use License</h2>
                            <p>
                                Permission is granted to temporarily view and download one copy of the materials on Reactions
                                and Reviews&apos; website for personal, non-commercial transitory viewing only. This is the grant
                                of a license, not a transfer of title.
                            </p>
                            <p>Under this license you may not:</p>
                            <ul className={styles.valuesList}>
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose</li>
                                <li>Attempt to decompile or reverse engineer any software</li>
                                <li>Remove any copyright or other proprietary notations</li>
                                <li>Transfer the materials to another person</li>
                            </ul>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>User Content</h2>
                            <p>
                                By submitting reviews or other content to our website, you grant us a worldwide, non-exclusive,
                                royalty-free license to use, reproduce, modify, and display such content in connection with our
                                service.
                            </p>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Disclaimer</h2>
                            <p>
                                The materials on Reactions and Reviews&apos; website are provided on an &apos;as is&apos; basis. We make no
                                warranties, expressed or implied, and hereby disclaim and negate all other warranties including,
                                without limitation, implied warranties or conditions of merchantability, fitness for a particular
                                purpose, or non-infringement of intellectual property.
                            </p>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Limitations</h2>
                            <p>
                                In no event shall Reactions and Reviews or its suppliers be liable for any damages (including,
                                without limitation, damages for loss of data or profit, or due to business interruption) arising
                                out of the use or inability to use the materials on our website.
                            </p>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Governing Law</h2>
                            <p>
                                These terms and conditions are governed by and construed in accordance with applicable laws
                                and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                            </p>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Contact</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at legal@reactionsandreviews.com
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
