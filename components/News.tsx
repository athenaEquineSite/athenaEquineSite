import Link from 'next/link';
import styles from '../styles/News.module.scss';
import { useLang } from '../context/LanguageProvider';

const News = ({news}) => {
    
    const isNor = useLang();

    const handleTitleCut = (postBody) => {
        return postBody.length > 100 ? postBody.substr(0, 100) + '...' : postBody;
    }

    return (
        <Link href="/news/[id]" as={`/news/${news.postId}`}>
            <a className={`${styles.news}`}>
                <h3 className={`${styles.newsTitle}`}>{isNor ? news.nor.title : news.eng.title}</h3>
                <p className={`${styles.newsDate}`}>{(new Date(news.date)).toDateString()}</p>
                <p className={`${styles.newsDescription}`}>{isNor ? handleTitleCut(news.nor.postBody) : handleTitleCut(news.eng.postBody)}</p>
            </a>
        </Link>
    )
}

export default News;