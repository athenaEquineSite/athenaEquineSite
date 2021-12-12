import styles from '../../styles/Gallery/Gallery.module.scss';
import Image from 'next/image';

const Picture = ({image, handleDelete}) => {
    return (
        <div className={`${styles.viewPictureWrapper}`}>
            <Image alt="" src={image.cloudinaryUrl} width={120} height={120}/>
            <button onClick={() => handleDelete(image.cloudinaryId)} className={`${styles.deleteBtn}`}><span>DELETE</span></button>
        </div>
    )
}

export default Picture;