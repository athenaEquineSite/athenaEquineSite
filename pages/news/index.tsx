import text from '../../utils/textContent.json';
import NewsList from '../../components/NewsList';
import dbConnect from '../../utils/dbConnect';
import Post from '../../models/Post';
import styles from '../../styles/News.module.scss';

function Newses({news}) {

   
    return (
        <div className={`container ${styles.newsContainer}`}>
          <div className={`${styles.newsHeaderWrapper}`}>
            <h1 className={`${styles.newsTitle}`}>{text.eng.news.title}</h1>
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