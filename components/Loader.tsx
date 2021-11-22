import styles from '../styles/Loader.module.scss';


export const Loader = () => {
    return (
        <>
            <div className={`container ${styles.loaderContainer}`}>
                <div className={`${styles.loaderImageWrapper}`}>
                    <img src="/LOGO.png" alt="logoLoader"/>
                </div>
                <h5 className={`${styles.loaderText}`}>LOADING ...</h5>
            </div>
        </>
    )
}