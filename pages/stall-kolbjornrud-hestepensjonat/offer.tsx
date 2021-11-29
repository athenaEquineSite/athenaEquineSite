import styles from '../../styles/Offer.module.scss';
import { LevelOffer } from '../../components/offer/LevelOffer';
import { useContext, useEffect } from 'react';
import { TextContext } from '../../context/TextContext';
import { useLang } from '../../context/LanguageProvider';

const OfferStable1 = () => {

    useEffect(() => {
        const body = document.body;
        if(body.classList.contains('solbergBackground')) {
            body.classList.remove('solbergBackground');
        }
        if(body.classList.contains('kolbjornrudBackground')) {
            return;
        }
        body.classList.add('kolbjornrudBackground')
    });

    const text = useContext(TextContext);
    const isLangNor = useLang();
    return (
        <div className={`${styles.offerWrapper}`}>
            <h1 className={`${styles.offerHeader}`}>{isLangNor ? text.nor.kolbjornrud.offer.title : text.eng.kolbjornrud.offer.title}</h1>
            <div className={`${styles.offerBodyWrapper}`}>
                <p className={`${styles.offerDescription}`}>{isLangNor ? text.nor.kolbjornrud.offer.description : text.eng.kolbjornrud.offer.description}</p>
                <div className={`${styles.levelsWrapper}`}>
                    <LevelOffer title={isLangNor ? text.nor.kolbjornrud.offer.basicList.title : text.eng.kolbjornrud.offer.basicList.title} list={isLangNor ? text.nor.kolbjornrud.offer.basicList.list : text.eng.kolbjornrud.offer.basicList.list} price={isLangNor ? text.nor.kolbjornrud.offer.basicList.price : text.eng.kolbjornrud.offer.basicList.price} />
                    <LevelOffer title={isLangNor ? text.nor.kolbjornrud.offer.mediumList.title : text.eng.kolbjornrud.offer.mediumList.title} list={isLangNor ? text.nor.kolbjornrud.offer.mediumList.list : text.eng.kolbjornrud.offer.mediumList.list} price={isLangNor ? text.nor.kolbjornrud.offer.mediumList.price : text.eng.kolbjornrud.offer.mediumList.price} />
                    <LevelOffer title={isLangNor ? text.nor.kolbjornrud.offer.premiumList.title : text.eng.kolbjornrud.offer.premiumList.title} list={isLangNor ? text.nor.kolbjornrud.offer.premiumList.list : text.eng.kolbjornrud.offer.premiumList.list} price={isLangNor ? text.nor.kolbjornrud.offer.premiumList.price : text.eng.kolbjornrud.offer.premiumList.price} />
                </div>
                <div className={`${styles.offerStallUses}`}>
                    <h3 className={`${styles.offerStallUsesTitle}`}>{isLangNor ? text.nor.kolbjornrud.offer.usage.title : text.eng.kolbjornrud.offer.usage.title}</h3>
                    <ul>
                    {(isLangNor ? text.nor.kolbjornrud.offer.usage.list : text.eng.kolbjornrud.offer.usage.list).map((element, index) => <li key={index}><p>{element}</p></li>)}
                    </ul>
                    <p>{isLangNor ? text.nor.kolbjornrud.offer.rest : text.eng.kolbjornrud.offer.rest}</p>
                </div>
            </div>
        </div>
    )
}

export default OfferStable1;