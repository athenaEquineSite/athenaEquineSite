import styles from '../../styles/Kolbjornrud.module.scss';
import { TextContext } from '../../context/TextContext';
import { useContext, useEffect } from 'react';
import { useLang } from '../../context/LanguageProvider';

function About() {

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
    const isNor = useLang();

    return (
        <div className={`${styles.kolbjornrudAboutWrapper}`}>
            <h1 className={`${styles.kolbjornrudAboutTitle}`}>{isNor ? text.nor.kolbjornrud.about.title : text.eng.kolbjornrud.about.title}</h1>
            <p>{isNor ? text.nor.kolbjornrud.about.description : text.eng.kolbjornrud.about.description}</p>
        </div>
    )
}

export default About;