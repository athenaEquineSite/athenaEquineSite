import { Layout } from '../components/Layout';
import '../styles/Global/style.global.scss'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
          <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp;
