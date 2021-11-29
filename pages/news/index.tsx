import NewsList from '../../components/NewsList';
import dbConnect from '../../utils/dbConnect';
import Post from '../../models/Post';
import styles from '../../styles/News.module.scss';
import { TextContext } from '../../context/TextContext';
import { useContext, useEffect } from 'react';
import { useLang } from '../../context/LanguageProvider';

function Newses({news}) {

  useEffect(() => {
    if(document.body.classList.contains('solbergBackground')) {
      document.body.classList.remove('solbergBackground')    
    }
    if(document.body.classList.contains('kolbjornrudBackground')) {
      document.body.classList.remove('kolbjornrudBackground')    
    }
  });

  const text = useContext(TextContext);
  const isNor = useLang();
   
    return (
        <div className={`container ${styles.newsContainer}`}>
          <div className={`${styles.newsHeaderWrapper}`}>
            <h1 className={`${styles.newsTitle}`}>{isNor ? text.nor.news.title : text.eng.news.title}</h1>
          </div>
          <NewsList posts={news}/>
        </div>
    )
}

export const getStaticProps = async () => {
  await dbConnect();
  const posts = await Post.find({});
  const news = JSON.parse(JSON.stringify(posts))
  
    return {
      props: {
        news: news
      }
    }
  }

export default Newses;