import navStyles from '../styles/Nav.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useLang, useLangUpdate } from '../context/LanguageProvider';
export const Nav = () => {

    const isNor = useLang();
    const {langIsNor, langIsEng} = useLangUpdate();

    return (
        <div className={`container ${navStyles.navigation}`}>
            <div className={`${navStyles.languages}`}>
                    <div className={`${navStyles.singleLanguage}`} onClick={langIsEng}>
                        <Image src="/united-kingdom.png" width={40} height={40} alt="englishLogo" />
                        <p>ENG</p>
                    </div>
                    <div className={`${navStyles.singleLanguage}`} onClick={langIsNor}>
                        <Image src="/norway.png" width={40} height={40} alt="norwegianLogo" />
                        <p>NOR</p>
                    </div>
            </div>
            <div className={`${navStyles.logo} row`}>
                <div className={`${navStyles.logoContainer} col-12`}>
                    <Image src="/LOGO.png" width={200} height={200} alt="logo"/>
                </div>
            </div>
            <nav className={`${navStyles.menu} row`}>
                <div className={`${navStyles.menuItem} col-2`}>
                   <Link href="/" passHref><p>Home</p></Link>
                </div>
                <div className={`${navStyles.menuItem} col-3 ${navStyles.dropdown}`}>
                    <p>Stall Kolbj&#216;rnrud Hestepensjonat</p>
                    <div className={navStyles.dropdownContent}>
                        <Link href="/stable1/about" passHref><p>About</p></Link>
                        <Link href="/stable1/offer" passHref><p>Offer</p></Link>
                        <Link href="/stable1/gallery" passHref><p>Gallery</p></Link>
                    </div>
                </div>
                <div className={`${navStyles.menuItem} col-3 ${navStyles.dropdown}`}>
                    <p>Solberg G&#8491;rd</p>
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