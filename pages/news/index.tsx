import NewsList from '../../components/NewsList';
import dbConnect from '../../utils/dbConnect';
import Post from '../../models/Post';
import styles from '../../styles/News.module.scss';

function Newses({news}) {

   
    return (
        <div className={`container ${styles.newsContainer}`}>
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