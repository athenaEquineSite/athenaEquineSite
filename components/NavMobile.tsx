import styles from '../styles/NavMobile.module.scss';
import Link from 'next/link';
import { useState } from 'react';

export const NavMobile = () => {

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
                <Link href="/" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>Home</a></Link>
                <Link href="/news" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>News</a></Link>
                <Link href="/contact" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>Contact</a></Link>
                <h3 className={`${styles.kolbjornrudMobileTitle}`}>Stall Kolbjørnrud Hestepensjonat</h3>
                <Link href="/stall-kolbjornrud-hestepensjonat/about" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>About</a></Link>
                <Link href="/stall-kolbjornrud-hestepensjonat/offer" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>Offer</a></Link>
                <Link href="/stall-kolbjornrud-hestepensjonat/gallery" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>Gallery</a></Link>
                <h3 className={`${styles.solbergMobileTitle}`}>Solberg Gård</h3>
                <Link href="/solberg-gard/about" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>About</a></Link>
                <Link href="/solberg-gard/offer" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>Offer</a></Link>
                <Link href="/solberg-gard/gallery" passHref><a onClick={toggle} onBlur={hide} onFocus={show}>Gallery</a></Link>
            </div>
        </>
    )
}