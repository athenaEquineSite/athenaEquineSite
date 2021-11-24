import dbConnect from '../../utils/dbConnect';
import Post from '../../models/Post';
import styles from '../../styles/News.module.scss';
import Link from 'next/link';

function News({news}) {
    return (
        <div className={`${styles.newsFullWrapper}`}>
            <div className={`${styles.newsFullHeaderWrapper}`}>
                <Link href="/news"><a className={`${styles.goBack}`}>Go Back</a></Link>
                <h1 className={`${styles.newsFullTitle}`}>{news.title}</h1>
                <h5 className={`${styles.newsFullDate}`}>{(new Date(news.date)).toDateString()}</h5>
            </div>
            <div className={`${styles.newsFullBodyWrapper}`}>
                <p className={`${styles.newsFullBody}`}>{news.body}</p>
            </div>
            
        </div>
    )
}

export const getStaticProps = async (context) => {
    await dbConnect();
    const post = await Post.findOne({postId: context.params.id});
    const news = await JSON.parse(JSON.stringify(post));
    
    return {
        props: {
            news: news
        }
    }
} 

export const getStaticPaths = async () => {
    await dbConnect();
    const posts = await Post.find({});
    const news = JSON.parse(JSON.stringify(posts));
    
    const ids = news.map(news => news.postId);
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}

export default News;