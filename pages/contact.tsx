import text from '../utils/textContent.json';
import styles from '../styles/Contact.module.scss';


function Contact() {
    return (
        <div>
            <div className={`${styles.contactHeaderWrapper}`}>
                <h1 className={`${styles.contactTitle}`}>{text.eng.contact.title}</h1>
            </div>
            <div className={`${styles.contactBodyWrapper}`}>
                <p className={`${styles.contactCompanyName}`}>Athena Equine AS</p>
                <p>Sluppenveien 125</p>
                <p>1860 Trøgstad</p>
                <p>Norge</p>
                <p className={`${styles.elizabethPhone}`}><span>Elizabeth Hernes </span>98446191</p>
                <p className={`${styles.kamilaPhone}`}><span>Kamila Derewianska </span>41424473</p>
            </div>
        </div>
    )
}

export default Contact;