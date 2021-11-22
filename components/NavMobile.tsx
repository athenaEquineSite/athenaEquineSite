import styles from '../styles/NavMobile.module.scss';
import Link from 'next/link';

export const NavMobile = () => {
    return (
        <>
            <div className={`${styles.navMobileContainer}`}>
                <div className={`${styles.navicon}`}>
                    <div></div>
                </div>
                <Link href="/" passHref><a>Home</a></Link>
                <Link href="/news" passHref><a>News</a></Link>
                <Link href="/contact" passHref><a>Contact</a></Link>
                <h3 className={`${styles.kolbjornrudMobileTitle}`}>Kolbjornrud</h3>
                <Link href="/stable1/about" passHref><a>About</a></Link>
                <Link href="/stable1/offer" passHref><a>Offer</a></Link>
                <Link href="/stable1/gallery" passHref><a>Gallery</a></Link>
                <h3 className={`${styles.solbergMobileTitle}`}>Solberg</h3>
                <Link href="/stable2/about" passHref><a>About</a></Link>
                <Link href="/stable2/offer" passHref><a>Offer</a></Link>
                <Link href="/stable2/gallery" passHref><a>Gallery</a></Link>
            </div>
        </>
    )
}