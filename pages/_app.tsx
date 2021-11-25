import { Layout } from '../components/Layout';
import { useState } from 'react';
import '../styles/Global/style.global.scss';
import Router from 'next/router';
import NProgress from 'nprogress';
import { TextContext } from '../context/TextContext';
import text from '../utils/textContent.json';
import { LanguageProvider } from '../context/LanguageProvider';

function MyApp({ Component, pageProps }) {
  
  const [loading, setLoading] = useState(false);
  const [isEng, setIsEng] = useState(true);
  

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', (url)=> {
    setLoading(false);
    NProgress.done();
  });
  
  return (
    <LanguageProvider>
      <TextContext.Provider value={text}>
        <Layout loading={loading}>
            <Component {...pageProps} />
        </Layout>
      </TextContext.Provider>
    </LanguageProvider>
  )
}

export default MyApp;
