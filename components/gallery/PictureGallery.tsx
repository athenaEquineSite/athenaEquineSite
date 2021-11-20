import Modal from './Modal';
import { useState } from 'react';
import styles from '../../styles/Gallery/Gallery.module.scss';
import Image from 'next/image';

const PictureGallery = ({image}) => {

    const [show, setShow] = useState(false);

    const showModal = (event) => {
        setShow(!show);
    }

    const closeModal = (e) => setShow(false);

    return (
        <div className={styles.image} onClick={e => showModal(e)}>
            <Image alt="" src={image.cloudinaryUrl} width={400} height={400}/>
            <Modal show={show} closeModal={closeModal} image={image}/>
        </div>
    )
}

export default PictureGallery;