import { Layout } from '../components/Layout';
import { useState } from 'react';
import '../styles/Global/style.global.scss';
import Router, { createRouter } from 'next/router';
import NProgress from 'nprogress';


function MyApp({ Component, pageProps }) {
  
  const [loading, setLoading] = useState(false);
  

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', (url)=> {
    setLoading(false);
    NProgress.done();
  });
  
  return (
      <Layout loading={loading}>
          <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp;
