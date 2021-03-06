import styles from '../../styles/Gallery/Gallery.module.scss';
import ImageSt1 from "../../models/ImageSt1";
import { useState, useContext, useEffect } from 'react';
import dbConnect from "../../utils/dbConnect";
import ImageList from '../../components/gallery/ImageList';
import { TextContext } from '../../context/TextContext';
import { useLang } from '../../context/LanguageProvider';

const Stable1Gallery = ({stable1Img}) => {

    const [imageSt1, setimageSt1] = useState(stable1Img);
    const text = useContext(TextContext);
    const isNor = useLang();

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

    return (
        <div className={styles.galleryContainer}>
            <div className={`${styles.galleryHeaderWrapper}`}>
                <h1 className={`${styles.galleryTitle}`}>{isNor ? text.nor.kolbjornrud.gallery.title : text.eng.kolbjornrud.gallery.title}</h1>
            </div>
            <ImageList images={imageSt1}/>
        </div>
    )
}

export default Stable1Gallery;


export const getStaticProps = async () => {
    await dbConnect();
    const stable1Img = await ImageSt1.find({});

    return {
        props: {
            stable1Img: JSON.parse(JSON.stringify(stable1Img)),
        }
    }
}