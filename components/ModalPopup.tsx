import styles from '../styles/ModalPopup.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import text from '../utils/textContent.json';
import { useLang } from '../context/LanguageProvider';

const ModalPopup = ({show, closeModal}) => {

    const isNor = useLang();
    
    const onClose = (e: any) => {
        closeModal && closeModal(e)
    }
        
    if(!show){
        return null;    
    }
        
    return (
        <div className={styles.modal}>
            <div className={styles.popup}>
                <div className={styles.upperPopup}></div>
                <div className={styles.middlePopup}>
                    <div className={styles.leftBar}></div>
                    <div className={styles.centerInfo}>
                        <div className={styles.imageWrapper}>
                            <Image src='/cian.jpg' alt='cian' layout='fill'/>
                        </div>
                        <div className={styles.infoWrapper}>
                            <h3 className={styles.infoTitle}>{isNor ? text.nor.popup.title : text.eng.popup.title}</h3>
                            <p className={styles.infoText}>{isNor ? text.nor.popup.desc : text.eng.popup.desc}</p>
                        </div>
                    </div>
                    <div className={styles.rightBar}></div>
                </div>
                <div className={styles.bottomPopup}>
                    <Link href='https://www.facebook.com/groups/1776223782587627/?ref=share'>
                        <a target='_blank' onClick={onClose}>
                            <h3 className={styles.facebookLink}>{isNor ? text.nor.popup.more : text.eng.popup.more}</h3>
                        </a>
                    </Link>
                </div>
            </div>
            <button className={styles.btn} onClick={onClose}>X</button>
        </div>
    )
}

export default ModalPopup;