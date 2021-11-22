import Link from 'next/link';
import styles from '../styles/News.module.scss';

const News = ({news}) => {
    return (
        <Link href="/news/[id]" as={`/news/${news.postId}`}>
            <a className={`${styles.news}`}>
                <h3 className={`${styles.newsTitle}`}>{news.title}</h3>
                <p className={`${styles.newsDate}`}>{(new Date(news.date)).toDateString()}</p>
                <p className={`${styles.newsDescription}`}>{(news.body).length > 100 ? news.body.substr(0, 100) + '...' : news.body}</p>
            </a>
        </Link>
    )
}

export default News;