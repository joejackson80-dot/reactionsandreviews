import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className={styles.loadingWrapper}>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}>
                    <div className={styles.spinnerInner}></div>
                </div>
                <div className={styles.loadingText}>Loading...</div>
            </div>
        </div>
    );
}
