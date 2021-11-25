import styles from '../../styles/Offer.module.scss';

export const LevelOffer = ({title, list, price}) => {
    return (
        <div className={`${styles.levelOffer}`}>
            <h3 className={`${styles.levelTitle}`}>{title}</h3>
            <ul className={`${styles.offerList}`}>
                {list.map((element, index) => <li key={index}><p>{element}</p></li>)}
            </ul>
            <h2 className={`${styles.levelOfferPrice}`}>{price}</h2>  
        </div>
    )
}