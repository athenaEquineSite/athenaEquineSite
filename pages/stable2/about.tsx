import text from '../../utils/textContent.json';
import styles from '../../styles/Solberg.module.scss';


function About() {
    return (
        <div className={`${styles.solbergAboutWrapper}`}>
            <h1 className={`${styles.solbergAboutTitle}`}>{text.eng.solberg.about.title}</h1>
            <p>{text.eng.solberg.about.description}</p>
        </div>
    )
}

export default About;