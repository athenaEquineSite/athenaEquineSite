import styles from '../../styles/Gallery/Modal.module.scss';
import Image from 'next/image';

const Modal = ({show, closeModal, image}) => {
    
    const onClose = e => {
        closeModal && closeModal(e)
    }
        
    if(!show){
        return null;    
    }
        
    return (
        <div className={styles.modal}>
            <div className={styles.image}>
                <Image src={image.cloudinaryUrl} width={600} height={600} alt="Large img"/>
            </div>
            <button className={styles.btn} onClick={onClose}>X</button>
        </div>
    )
}

export default Modal;