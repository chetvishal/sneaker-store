import styles from './Footer.module.css';

export const Footer = () => {

    return (
        <footer className={styles.footer}>
            <h3>Made by Vishal Singhs</h3>
            <span className={styles.footer_social_link}>
                <a href="https://github.com/chetvishal" className="nostyle">
                    <i className="fab fa-github"></i>
                </a></span>
            <span className={styles.footer_social_link}>
                <a href="https://www.linkedin.com/in/chet-vishal-tunju-1056b7123/" className="nostyle">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </span>
            <span className={styles.footer_social_link}>
                <a href="https://twitter.com/chetvishal" className="nostyle">
                    <i className="fab fa-twitter"></i>
                </a>
            </span>
        </footer>
    )
}