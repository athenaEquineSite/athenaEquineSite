import dbConnect from '../../utils/dbConnect';
import Post from '../../models/Post';
import styles from '../../styles/News.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useLang } from '../../context/LanguageProvider';

function News({news}) {
    const isNor = useLang();

    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
          document.body.classList.remove('solbergBackground')    
        }
        if(document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')    
        }
      });

    return (
        <div className={`${styles.newsFullWrapper}`}>
            <Link href="/news"><a className={`goBack`}>Go Back</a></Link>
            <div className={`${styles.newsFullHeaderWrapper}`}>
                <h1 className={`${styles.newsFullTitle}`}>{isNor ? news.nor.title : news.eng.title}</h1>
                <h5 className={`${styles.newsFullDate}`}>{(new Date(news.date)).toDateString()}</h5>
            </div>
            <div className={`${styles.newsFullBodyWrapper}`}>
                {news.cloudinaryId ? <div className={`${styles.imageContainer}`}><div className={`${styles.imageWrapper}`}><Image src={news.cloudinaryUrl} width={news.imageDimensions.width/4} height={news.imageDimensions.height/4} alt="news_image" objectFit="fill" /></div></div> : null}
                <p className={`${styles.newsFullBody}`}>{isNor ? news.nor.postBody : news.eng.postBody}</p>
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