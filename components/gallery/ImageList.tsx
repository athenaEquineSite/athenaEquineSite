import PictureGallery from './PictureGallery';

const ImageList = ({images}) => {
    return (
        <div>
            {images.map((image) => (
                <PictureGallery key={image.id} image={image}/>
            )
        )}
        </div>
    )
}

export default ImageList;