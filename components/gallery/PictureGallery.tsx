import Image from 'next/image';

const PictureGallery = ({image}) => {
    return (
        <div>
            <Image alt="" src={image.cloudinaryUrl} width={100} height={100}/>
        </div>
    )
}

export default PictureGallery;