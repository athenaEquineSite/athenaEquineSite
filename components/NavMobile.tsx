import styles from '../styles/NavMobile.module.scss';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { useLang, useLangUpdate } from '../context/LanguageProvider';
import { TextContext } from '../context/TextContext';

export const NavMobile = () => {

    const isNor = useLang();
    const {langIsNor, langIsEng} = useLangUpdate();
    const text = useContext(TextContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const hide = () => setIsOpen(false);
    const show = () => setIsOpen(true);

    return (
        <>
            <div className={`${styles.navMobileContainer} ${isOpen ? styles.showMobile : ''}`} onClick={toggle}>
                <div className={`${styles.navicon}`}>
                    <div></div>
                </div>
                <Link href="/" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>{isNor ? text.nor.navigation.home : text.eng.navigation.home}</a></Link>
                <Link href="/news" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>{isNor ? text.nor.navigation.news : text.eng.navigation.news}</a></Link>
                <Link href="/contact" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>{isNor ? text.nor.navigation.contact : text.eng.navigation.contact}</a></Link>
                <h3 className={`${styles.kolbjornrudMobileTitle}`}>Stall Kolbjørnrud Hestepensjonat</h3>
                <Link href="/stall-kolbjornrud-hestepensjonat/about" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>{isNor ? text.nor.navigation.kolbjornrud.about : text.eng.navigation.kolbjornrud.about}</a></Link>
                <Link href="/stall-kolbjornrud-hestepensjonat/offer" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>{isNor ? text.nor.navigation.kolbjornrud.offer : text.eng.navigation.kolbjornrud.offer}</a></Link>
                <Link href="/stall-kolbjornrud-hestepensjonat/gallery" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>{isNor ? text.nor.navigation.kolbjornrud.gallery : text.eng.navigation.kolbjornrud.gallery}</a></Link>
                <h3 className={`${styles.solbergMobileTitle}`}>Solberg Gård</h3>
                <Link href="/solberg-gard/about" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>{isNor ? text.nor.navigation.solberg.about : text.eng.navigation.solberg.about}</a></Link>
                <Link href="/solberg-gard/offer" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>{isNor ? text.nor.navigation.solberg.offer : text.eng.navigation.solberg.offer}</a></Link>
                <Link href="/solberg-gard/gallery" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>{isNor ? text.nor.navigation.solberg.gallery : text.eng.navigation.solberg.gallery}</a></Link>
            </div>
        </>
    )
}