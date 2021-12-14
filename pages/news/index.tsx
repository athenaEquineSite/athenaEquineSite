import NewsList from '../../components/NewsList';
import dbConnect from '../../utils/dbConnect';
import Post from '../../models/Post';
import styles from '../../styles/News.module.scss';
import { TextContext } from '../../context/TextContext';
import { useContext, useEffect, useState } from 'react';
import { useLang } from '../../context/LanguageProvider';
import Pagination from '../../components/Pagination';

function Newses({news}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(10);


  useEffect(() => {
    if(document.body.classList.contains('solbergBackground')) {
      document.body.classList.remove('solbergBackground')    
    }
    if(document.body.classList.contains('kolbjornrudBackground')) {
      document.body.classList.remove('kolbjornrudBackground')    
    }
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const lastNewsIndex = currentPage * newsPerPage;
  const firstNewsIndex = lastNewsIndex - newsPerPage;
  const currentNews = news.slice(firstNewsIndex, lastNewsIndex);

  const text = useContext(TextContext);
  const isNor = useLang();
   
    return (
        <div className={`container ${styles.newsContainer}`}>
          <div className={`${styles.newsHeaderWrapper}`}>
            <h1 className={`${styles.newsTitle}`}>{isNor ? text.nor.news.title : text.eng.news.title}</h1>
          </div>
          <NewsList posts={currentNews}/>
          <Pagination newsPerPage={newsPerPage} totalNews={news.length} paginate={paginate}/>
        </div>
    )
}

export const getStaticProps = async () => {
  await dbConnect();
  const posts = await Post.find({});
  const news = JSON.parse(JSON.stringify(posts))
    return {
      props: {
        news: news,
      }
    }
  }

export default Newses;