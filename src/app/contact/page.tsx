'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);

        setTimeout(() => setSubmitMessage(''), 5000);
    };

    return (
        <main className={styles.main}>
            <Navigation />

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.pageTitle}>Contact Us</h1>
                    <p className={styles.pageSubtitle}>
                        Get in touch with the Reactions and Reviews team
                    </p>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        {/* Contact Info */}
                        <div className={styles.contactInfo}>
                            <h2>Get In Touch</h2>
                            <p>
                                Have questions, suggestions, or looking for sponsorship opportunities? We&apos;d love to hear from you!
                            </p>

                            <div className={styles.infoCards}>
                                <div className={styles.infoCard}>
                                    <div className={styles.infoIcon}>📧</div>
                                    <div>
                                        <h3>Email</h3>
                                        <p>contact@reactionsandreviews.com</p>
                                    </div>
                                </div>

                                <div className={styles.infoCard}>
                                    <div className={styles.infoIcon}>💼</div>
                                    <div>
                                        <h3>Business Inquiries</h3>
                                        <p>business@reactionsandreviews.com</p>
                                    </div>
                                </div>

                                <div className={styles.infoCard}>
                                    <div className={styles.infoIcon}>🌐</div>
                                    <div>
                                        <h3>Social Media</h3>
                                        <p>Follow us on all platforms @RRReviews</p>
                                    </div>
                                </div>

                                <div className={styles.infoCard}>
                                    <div className={styles.infoIcon}>🤝</div>
                                    <div>
                                        <h3>Sponsorships & Tips</h3>
                                        <p>Partner with us or support our content creation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={styles.formContainer}>
                            <form onSubmit={handleSubmit} className={styles.contactForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="subject">Subject *</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="collaboration">Collaboration</option>
                                        <option value="review-request">Review Request</option>
                                        <option value="technical">Technical Issue</option>
                                        <option value="feedback">Feedback</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tell us what's on your mind..."
                                        rows={6}
                                    />
                                </div>

                                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {submitMessage && (
                                    <div className={styles.successMessage}>
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
