import navStyles from '../styles/Nav.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export const Nav = () => {
    return (
        <div className={`container ${navStyles.navigation}`}>
            <div className={`${navStyles.logo} row`}>
                <div className={`${navStyles.languages}`}>
                    <p>ENG</p>
                    <p>NOR</p>
                </div>
                <div className={`${navStyles.logoContainer} col-12`}>
                    <Image src="/LOGO.png" width={150} height={150}/>
                </div>
            </div>
            <nav className={`${navStyles.menu} row`}>
                <div className={`${navStyles.menuItem} col-2`}>
                   <Link href="/" passHref><p>Home</p></Link>
                </div>
                <div className={`${navStyles.menuItem} col-2 ${navStyles.dropdown}`}>
                    <p>Kolbjornrud</p>
                    <div className={navStyles.dropdownContent}>
                        <Link href="/stable1/about" passHref><p>About</p></Link>
                        <Link href="/stable1/offer" passHref><p>Offer</p></Link>
                        <Link href="/stable1/gallery" passHref><p>Gallery</p></Link>
                    </div>
                </div>
                <div className={`${navStyles.menuItem} col-2 ${navStyles.dropdown}`}>
                    <p>Solberg</p>
                    <div className={navStyles.dropdownContent}>
                        <Link href="/stable2/about" passHref><p>About</p></Link>
                        <Link href="/stable2/offer" passHref><p>Offer</p></Link>
                        <Link href="/stable2/gallery" passHref><p>Gallery</p></Link>
                    </div>
                </div>
                <div className={`${navStyles.menuItem} col-2`}>
                    <Link href="/news" passHref><p>News</p></Link>
                </div>
                <div className={`${navStyles.menuItem} col-2`}>
                    <Link href="/contact" passHref><p>Contact</p></Link>
                </div>
            </nav>
        </div>

    )
}