import React from 'react';
import { Nav } from '../components/Nav';
import { NavMobile } from '../components/NavMobile';
import { Footer } from '../components/Footer';
import styles from '../styles/Layout.module.scss';
import { Loader } from './Loader';
import Head from 'next/head';

export const Layout = ({children, loading}) => {

    return (
        <div className={`${styles.layoutBody}`}>
            <Head>
                <meta name="description" content="Athena Equine As Site" />
                <title>ATHENA EQUINE AS</title>
            </Head>
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