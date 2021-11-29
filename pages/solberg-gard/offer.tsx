import styles from '../../styles/Offer.module.scss';
import { LevelOffer } from '../../components/offer/LevelOffer';
import { useContext, useEffect } from 'react';
import { TextContext } from '../../context/TextContext';
import { useLang } from '../../context/LanguageProvider';

const OfferStable2 = () => {

    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
            return;
        }
        document.body.classList.add('solbergBackground')
    });

    const text = useContext(TextContext);
    const isLangNor = useLang();

    return (
        <div id="solberg" className={`${styles.offerWrapper}`}>
        <h1 className={`${styles.offerHeader}`}>{isLangNor ? text.nor.solberg.offer.title : text.eng.solberg.offer.title}</h1>
        <div className={`${styles.offerBodyWrapper}`}>
            <div className={`${styles.levelsWrapper} ${styles.gridColumnOne}`}>
                <LevelOffer title={isLangNor ? text.nor.solberg.offer.liveryPack.title : text.eng.solberg.offer.liveryPack.title} list={isLangNor ? text.nor.solberg.offer.liveryPack.list : text.eng.solberg.offer.liveryPack.list} price={isLangNor ? text.nor.solberg.offer.liveryPack.price : text.eng.solberg.offer.liveryPack.price} />
            </div>
            <div className={`${styles.offerStallUses} ${styles.moreMarginTopInPTag}`}>
                <p>{isLangNor ? text.nor.solberg.offer.otherPack.otherOfferOne : text.eng.solberg.offer.otherPack.otherOfferOne}</p>
                <p>{isLangNor ? text.nor.solberg.offer.otherPack.otherOfferTwo : text.eng.solberg.offer.otherPack.otherOfferTwo}</p>
                <p>{isLangNor ? text.nor.solberg.offer.otherPack.otherOfferThree : text.eng.solberg.offer.otherPack.otherOfferThree}</p>
                <p>{isLangNor ? text.nor.solberg.offer.otherPack.otherOfferFour : text.eng.solberg.offer.otherPack.otherOfferFour}</p>
            </div>
        </div>
    </div>
    )
}

export default OfferStable2;