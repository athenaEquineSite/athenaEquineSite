import Post from '../components/Post';
import styles from '../styles/Dashboard/PostList.module.scss';
import Link from 'next/link';

const PostList = ({posts, onDelete}) => {

    return (
        <div className={styles.postList}>
            {posts.map((post) => (
                <div key={post.postId} className={`${styles.post} row`}>
                    <div className={`col-4`}>
                        <Post  post={post}/>
                    </div>
                    <Link href={{
                        pathname: "/aeas/posts/edit",
                        query: { data: JSON.stringify(post) }
                        }} >
                            <a className={`${styles.editPost} col-4`}>Edit Post</a>
                    </Link>
                    <button onClick={() => onDelete(post.postId)} className={`col-4`}>Delete</button>  
                </div>
                
            ))}
        </div>
    )
}

export default PostList;