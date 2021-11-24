import React from 'react';
import { Nav } from '../components/Nav';
import { NavMobile } from '../components/NavMobile';
import { Footer } from '../components/Footer';
import styles from '../styles/Layout.module.scss';
import { Loader } from './Loader';

export const Layout = ({children, loading}) => {

    return (
        <div className={`${styles.layoutBody}`}>
            <Nav />
            <NavMobile />
            <div className={`container ${styles.mainPage}`}>
                {loading && <Loader />}
                    <main className={`${styles.main}`}>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    )
}