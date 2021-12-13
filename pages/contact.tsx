import styles from '../styles/Contact.module.scss';
import { TextContext } from '../context/TextContext';
import { useContext, useEffect } from 'react';
import { useLang } from '../context/LanguageProvider';
import Map from '../components/Map';

function Contact() {

    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
          document.body.classList.remove('solbergBackground')    
        }
        if(document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')    
        }
      });

    const text = useContext(TextContext);
    const isNor = useLang();

    return (
        <div>
            <div className={`${styles.contactHeaderWrapper}`}>
                <h1 className={`${styles.contactTitle}`}>{isNor ? text.nor.contact.title : text.eng.contact.title}</h1>
            </div>
            <div className={`${styles.contactBodyWrapper}`}>
                <p className={`${styles.contactCompanyName}`}>Athena Equine AS</p>
                <p>Sluppenveien 125</p>
                <p>1860 Trøgstad</p>
                <p>Norge</p>
                <p className={`${styles.elizabethPhone}`}><span>Elizabeth Hernes </span>98446191</p>
                <p className={`${styles.kamilaPhone}`}><span>Kamila Derewianska </span>41424473</p>
            </div>
            <Map />

        </div>
    )
}

export default Contact;