import { Layout } from '../components/Layout';
import { useState } from 'react';
import '../styles/Global/style.global.scss';
import Router from 'next/router';
import NProgress from 'nprogress';
import { TextContext } from '../context/TextContext';
import text from '../utils/textContent.json';
import { LanguageProvider } from '../context/LanguageProvider';
import ModalPopup from '../components/ModalPopup';

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);

  // modal functions start

  const [show, setShow] = useState(true);
  const closeModal = (e) => setShow(false);

  // modal functions end

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
    NProgress.done();
  });

  return (
    <LanguageProvider>
      <TextContext.Provider value={text}>
        <ModalPopup show={show} closeModal={closeModal} />
        <Layout loading={loading}>
          <Component {...pageProps} />
        </Layout>
      </TextContext.Provider>
    </LanguageProvider>
  ) 
  /*
  return (
    <h1>Error: Not Found</h1>
  ) */
}

export default MyApp;
