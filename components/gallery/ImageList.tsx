import styles from '../../styles/Gallery/Gallery.module.scss';
import PictureGallery from './PictureGallery';


const ImageList = ({images}) => {
    return (
        <div className={`${styles.imageList}`}>
            {images.map((image) => (
                <div key={image.id} className={`${styles.imageItem}`}>
                    <PictureGallery image={image}/>
                </div>
                
            )
        )}
        </div>
    )
}

export default ImageList;