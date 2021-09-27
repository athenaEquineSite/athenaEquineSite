import React from 'react';
import { Nav } from '../components/Nav';
import styles from '../styles/Layout.module.scss';

export const Layout = ({children}) => {
    return (
        <>
        <Nav />
        <div className="container main-page">
            <main>
                {children}
            </main>
        </div>
        </>
    )
}