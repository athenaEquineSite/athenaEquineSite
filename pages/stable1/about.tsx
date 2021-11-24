import text from '../../utils/textContent.json';
import styles from '../../styles/Kolbjornrud.module.scss';

function About() {
    return (
        <div className={`${styles.kolbjornrudAboutWrapper}`}>
            <h1 className={`${styles.kolbjornrudAboutTitle}`}>{text.eng.kolbjornrud.about.title}</h1>
            <p>{text.eng.kolbjornrud.about.description}</p>
        </div>
    )
}

export default About;