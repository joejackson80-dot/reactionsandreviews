import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import styles from '../about/about.module.css';

export default function PrivacyPage() {
    return (
        <main className={styles.main}>
            <Navigation />

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.pageTitle}>Privacy Policy</h1>
                    <p className={styles.pageSubtitle}>Last updated: February 2, 2026</p>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.textBlock}>
                            <h2>Information We Collect</h2>
                            <p>
                                When you visit Reactions and Reviews, we may collect certain information about your device,
                                including information about your web browser, IP address, time zone, and some of the cookies
                                that are installed on your device.
                            </p>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>How We Use Your Information</h2>
                            <p>
                                We use the information we collect to:
                            </p>
                            <ul className={styles.valuesList}>
                                <li>Provide, operate, and maintain our website</li>
                                <li>Improve, personalize, and expand our website</li>
                                <li>Understand and analyze how you use our website</li>
                                <li>Develop new products, services, features, and functionality</li>
                                <li>Communicate with you for customer service and updates</li>
                            </ul>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Cookies</h2>
                            <p>
                                We use cookies and similar tracking technologies to track activity on our website and store
                                certain information. You can instruct your browser to refuse all cookies or to indicate when
                                a cookie is being sent.
                            </p>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Third-Party Services</h2>
                            <p>
                                We may employ third-party companies and individuals to facilitate our service, provide the
                                service on our behalf, perform service-related services, or assist us in analyzing how our
                                service is used. These third parties have access to your personal information only to perform
                                these tasks on our behalf.
                            </p>
                        </div>

                        <div className={styles.textBlock}>
                            <h2>Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at
                                privacy@reactionsandreviews.com
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
