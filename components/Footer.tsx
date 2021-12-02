import styles from '../styles/Footer.module.scss';
import Link from 'next/link';
import { TextContext } from '../context/TextContext';
import { useContext } from 'react';
import { useLang } from '../context/LanguageProvider';

export const Footer = () => {

    const text = useContext(TextContext);
    const isNor = useLang();

    return (
        <footer className={`${styles.footer}`}>
            <div className={`container ${styles.menuSection}`}>
                <div className={`${styles.footLogoContainer}`}>
                    <img src="/LOGO.png"/>
                </div>
                <div className={`${styles.stables}`}>
                    <ul className={`${styles.stableKolbjornrud}`}>
                        <h3>{isNor ? text.nor.navigation.kolbjornrud.title : text.eng.navigation.kolbjornrud.title}</h3>
                        <li><Link href="/stall-kolbjornrud-hestepensjonat/about" passHref><p>{isNor ? text.nor.navigation.kolbjornrud.about : text.eng.navigation.kolbjornrud.about}</p></Link></li>
                        <li><Link href="/stall-kolbjornrud-hestepensjonat/offer" passHref><p>{isNor ? text.nor.navigation.kolbjornrud.offer : text.eng.navigation.kolbjornrud.offer}</p></Link></li>
                        <li><Link href="/stall-kolbjornrud-hestepensjonat/gallery" passHref><p>{isNor ? text.nor.navigation.kolbjornrud.gallery : text.eng.navigation.kolbjornrud.gallery}</p></Link></li>
                    </ul>
                    <ul className={`${styles.stableSolberg}`}>
                        <h3>{isNor ? text.nor.navigation.solberg.title : text.eng.navigation.solberg.title}</h3>
                        <li><Link href="/solberg-gard/about" passHref><p>{isNor ? text.nor.navigation.solberg.about : text.eng.navigation.solberg.about}</p></Link></li>
                        <li><Link href="/solberg-gard/offer" passHref><p>{isNor ? text.nor.navigation.solberg.offer : text.eng.navigation.solberg.offer}</p></Link></li>
                        <li><Link href="/solberg-gard/gallery" passHref><p>{isNor ? text.nor.navigation.solberg.gallery : text.eng.navigation.solberg.gallery}</p></Link></li>
                    </ul>
                </div>
                <ul className={`${styles.basicMenu}`}>
                    <h3>Menu</h3>
                    <li><Link href="/" passHref><p>{isNor ? text.nor.navigation.home : text.eng.navigation.home}</p></Link></li>
                    <li><Link href="/news" passHref><p>{isNor ? text.nor.navigation.news : text.eng.navigation.news}</p></Link></li>
                    <li><Link href="/contact" passHref><p>{isNor ? text.nor.navigation.contact : text.eng.navigation.contact}</p></Link></li>
                </ul>
            </div>
            <div className={`${styles.copyright}`}>
                <p>Copyright &copy; 2021 - Athena Equine AS</p>
            </div>
        </footer>
    )
}