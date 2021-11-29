import styles from '../../styles/Solberg.module.scss';
import { TextContext } from '../../context/TextContext';
import { useContext, useEffect } from 'react';
import { useLang } from '../../context/LanguageProvider';

function About() {

    useEffect(() => {
        const body = document.body;
        if(body.classList.contains('kolbjornrudBackground')) {
            body.classList.remove('kolbjornrudBackground');
        }
        if(document.body.classList.contains('solbergBackground')) {
            return;
        }
        document.body.classList.add('solbergBackground')
    });

    const text = useContext(TextContext);
    const isNor = useLang();

    return (
        <div className={`${styles.solbergAboutWrapper}`}>
            <h1 className={`${styles.solbergAboutTitle}`}>{isNor ? text.nor.solberg.about.title : text.eng.solberg.about.title}</h1>
            <p>{isNor ? text.nor.solberg.about.description : text.eng.solberg.about.description}</p>
        </div>
    )
}

export default About;