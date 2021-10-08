import Image from 'next/image';

const Picture = ({image, handleDelete}) => {
    return (
        <div>
            <Image alt="" src={image.cloudinaryUrl} width={100} height={100}/>
            <button onClick={() => handleDelete(image.cloudinaryId)}>DELETE</button>
        </div>
    )
}

export default Picture;