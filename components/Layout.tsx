import React from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import styles from '../styles/Layout.module.scss';

export const Layout = ({children}) => {
    return (
        <div className={`${styles.layoutBody}`}>
            <Nav />
            <div className={`container ${styles.mainPage}`}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    )
}