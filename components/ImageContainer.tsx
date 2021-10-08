import Picture from './Picture';

const ImageContainer = ({images, handleDelete}) => {
    return (
        <div>
            {images.map((image) => (
                <Picture key={image.id} handleDelete={handleDelete} image={image}/>
            )
        )}
        </div>
    )
}

export default ImageContainer;