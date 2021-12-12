import News from './News';
import styles from '../styles/News.module.scss';

const NewsList = ({posts}) => {
    return (
        <div className={`${styles.newsList}`}>
        {posts.reverse().map((post) => (
            <News key={post.postId} news={post}/>
        ))}
        </div>
    )
}

export default NewsList;