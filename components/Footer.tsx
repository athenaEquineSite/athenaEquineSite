import styles from '../styles/Footer.module.scss';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className={`${styles.footer}`}>
            <div className={`container ${styles.menuSection}`}>
                <div className={`${styles.footLogoContainer}`}>
                    <img src="/LOGO.png"/>
                </div>
                <div className={`${styles.stables}`}>
                    <ul className={`${styles.stableKolbjornrud}`}>
                        <h3>Kolbjornrud</h3>
                        <li><Link href="/stable1/about" passHref><p>About</p></Link></li>
                        <li><Link href="/stable1/offer" passHref><p>Offer</p></Link></li>
                        <li><Link href="/stable1/gallery" passHref><p>Gallery</p></Link></li>
                    </ul>
                    <ul className={`${styles.stableSolberg}`}>
                        <h3>Solberg</h3>
                        <li><Link href="/stable2/about" passHref><p>About</p></Link></li>
                        <li><Link href="/stable2/offer" passHref><p>Offer</p></Link></li>
                        <li><Link href="/stable2/gallery" passHref><p>Gallery</p></Link></li>
                    </ul>
                </div>
                <ul className={`${styles.basicMenu}`}>
                    <h3>Menu</h3>
                    <li><Link href="/" passHref><p>Home</p></Link></li>
                    <li><Link href="/news" passHref><p>News</p></Link></li>
                    <li><Link href="/contact" passHref><p>Contact</p></Link></li>
                </ul>
            </div>
            <div className={`${styles.copyright}`}>
                <p>Copyright &copy; 2021 - Athena Aquine AS</p>
            </div>
        </footer>
    )
}