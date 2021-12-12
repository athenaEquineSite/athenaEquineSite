import styles from '../../styles/Gallery/Gallery.module.scss';
import Picture from './Picture';


const ImageContainer = ({images, handleDelete}) => {
    return (
        <div className={`${styles.viewImagesContainer}`}>
            {images.map((image) => (
                <Picture key={image.id} handleDelete={handleDelete} image={image}/>
            )
        )}
        </div>
    )
}

export default ImageContainer;