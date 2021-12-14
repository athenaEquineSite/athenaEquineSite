import styles from '../styles/Dashboard/PostList.module.scss';
import Post from '../components/Post';
import EditPost from '../components/EditPost';
import { IPost } from './NewsList';

const PostList = ({posts, onDelete}) => {

    const sortWithDate = (posts: IPost[]) => {
        return posts.sort((a, b) => {
            const date1 = new Date(a.date);
            const date2 = new Date(b.date);
            return date2.getTime() - date1.getTime();
        })
    }

    const sortedPosts = sortWithDate(posts);

    return (
        <div className={styles.postList}>
            {sortedPosts.reverse().map((post, i) => (
                <div key={i} className={`${styles.post} row`}>
                    <div className={`col-4`}>
                        <Post  post={post}/>
                    </div>
                    <div className={`col-4`}>
                        <EditPost  post={post}/>
                    </div>
                    <button onClick={() => onDelete(post.postId)} className={`col-4 ${styles.deleteBtn}`}><span>Delete</span></button>  
                </div>
                
            ))}
        </div>
    )
}

export default PostList;