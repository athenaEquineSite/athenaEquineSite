import News from './News';
import styles from '../styles/News.module.scss';

const NewsList = ({posts}) => {
    const sortedPosts = posts.reverse();
    return (
        <div className={`${styles.newsList}`}>
        {sortedPosts.map((post) => (
            <News key={post.postId} news={post}/>
        ))}
        </div>
    )
}

export default NewsList;