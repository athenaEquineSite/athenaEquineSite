import styles from '../../styles/Gallery/Gallery.module.scss';
import ImageSt2 from "../../models/ImageSt2";
import { useState, useContext, useEffect } from 'react';
import dbConnect from "../../utils/dbConnect";
import ImageList from '../../components/gallery/ImageList';
import { TextContext } from '../../context/TextContext';
import { useLang } from '../../context/LanguageProvider';

const Stable2Gallery = ({stable2Img}) => {

    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
            return;
        }
        document.body.classList.add('solbergBackground')
    });

    const [imageSt2, setimageSt2] = useState(stable2Img);
    const text = useContext(TextContext);
    const isNor = useLang();

    return (
        <div className={styles.galleryContainer}>
            <div className={`${styles.galleryHeaderWrapper}`}>
                <h1 className={`${styles.galleryTitle}`}>{isNor ? text.nor.solberg.gallery.title : text.eng.solberg.gallery.title}</h1>
            </div>
            <ImageList images={imageSt2} />
        </div>
    )
}

export default Stable2Gallery;


export const getServerSideProps = async () => {
    await dbConnect();
    const stable1Img = await ImageSt2.find({});

    return {
        props: {
            stable2Img: JSON.parse(JSON.stringify(stable1Img)),
        }
    }
}