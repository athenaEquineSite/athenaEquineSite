import navStyles from '../styles/Nav.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useLang, useLangUpdate } from '../context/LanguageProvider';
import { TextContext } from '../context/TextContext';
import { useContext } from 'react';


export const Nav = () => {

    const isNor = useLang();
    const {langIsNor, langIsEng} = useLangUpdate();
    const text = useContext(TextContext);

    return (
        <div className={`container ${navStyles.navigation}`}>
            <div className={`${navStyles.languages}`}>
                    <div className={`${navStyles.singleLanguage}`} onClick={langIsEng}>
                        <Image src="/united-kingdom.png" width={30} height={30} alt="englishLogo" />
                    </div>
                    <div className={`${navStyles.singleLanguage}`} onClick={langIsNor}>
                        <Image src="/norway.png" width={30} height={30} alt="norwegianLogo" />
                    </div>
            </div>
            <div className={`${navStyles.logo} row`}>
                <div className={`${navStyles.logoContainer} col-12`}>
                    <Image src="/LOGO.png" width={200} height={200} alt="logo"/>
                </div>
            </div>
            <nav className={`${navStyles.menu} row`}>
                <div className={`${navStyles.menuItem} col-2`}>
                   <Link href="/" passHref><p>{isNor ? text.nor.navigation.home : text.eng.navigation.home}</p></Link>
                </div>
                <div className={`${navStyles.menuItem} col-3 ${navStyles.dropdown}`}>
                    <p>Stall Kolbj&#216;rnrud Hestepensjonat</p>
                    <div className={navStyles.dropdownContent}>
                        <Link href="/stall-kolbjornrud-hestepensjonat/about" passHref><p>{isNor ? text.nor.navigation.kolbjornrud.about : text.eng.navigation.kolbjornrud.about}</p></Link>
                        <Link href="/stall-kolbjornrud-hestepensjonat/offer" passHref><p>{isNor ? text.nor.navigation.kolbjornrud.offer : text.eng.navigation.kolbjornrud.offer}</p></Link>
                        <Link href="/stall-kolbjornrud-hestepensjonat/gallery" passHref><p>{isNor ? text.nor.navigation.kolbjornrud.gallery : text.eng.navigation.kolbjornrud.gallery}</p></Link>
                    </div>
                </div>
                <div className={`${navStyles.menuItem} col-3 ${navStyles.dropdown}`}>
                    <p>Solberg G&#8491;rd</p>
                    <div className={navStyles.dropdownContent}>
                        <Link href="/solberg-gard/about" passHref><p>{isNor ? text.nor.navigation.solberg.about : text.eng.navigation.solberg.about}</p></Link>
                        <Link href="/solberg-gard/offer" passHref><p>{isNor ? text.nor.navigation.solberg.offer : text.eng.navigation.solberg.offer}</p></Link>
                        <Link href="/solberg-gard/gallery" passHref><p>{isNor ? text.nor.navigation.solberg.gallery : text.eng.navigation.solberg.gallery}</p></Link>
                    </div>
                </div>
                <div className={`${navStyles.menuItem} col-2`}>
                    <Link href="/news" passHref><p>{isNor ? text.nor.navigation.news : text.eng.navigation.news}</p></Link>
                </div>
                <div className={`${navStyles.menuItem} col-2`}>
                    <Link href="/contact" passHref><p>{isNor ? text.nor.navigation.contact : text.eng.navigation.contact}</p></Link>
                </div>
            </nav>
        </div>

    )
}