import navStyles from '../styles/Nav.module.scss';
import Link from 'next/link';

export const Nav = () => {
    return (
        <div className="container">
            <div className="languages">
                <p>ENG</p>
                <p>NOR</p>
            </div>
            <nav className={`${navStyles.menu} row`}>
                <div className={`${navStyles.menuItem} col-2`}>
                   <Link href="/" passHref><p>Home</p></Link>
                </div>
                <div className={`${navStyles.menuItem} col-3 ${navStyles.dropdown}`}>
                    <p>Stable1</p>
                    <div className={navStyles.dropdownContent}>
                        <Link href="/stable1/about" passHref><p>About</p></Link>
                        <Link href="/stable1/offer" passHref><p>Offer</p></Link>
                        <Link href="/stable1/gallery" passHref><p>Gallery</p></Link>
                    </div>
                </div>
                <div className={`${navStyles.menuItem} col-3 ${navStyles.dropdown}`}>
                    <p>Stable2</p>
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