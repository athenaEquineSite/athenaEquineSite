import styles from '../styles/Dashboard/PostList.module.scss';
import Post from '../components/Post';
import EditPost from '../components/EditPost';
import Link from 'next/link';

const PostList = ({posts, onDelete}) => {

    return (
        <div className={styles.postList}>
            {posts.reverse().map((post) => (
                <div key={post.postId} className={`${styles.post} row`}>
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