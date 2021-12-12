import styles from '../styles/Dashboard/PostList.module.scss';
import Link from 'next/link';

const EditPost = ({post}) => {
    return (
        <Link href="/aeas/posts/edit/[id]" as={`/aeas/posts/edit/${post.postId}`} >
            <a className={`${styles.editPost} col-4`} ><span>Edit Post</span></a>
        </Link>
    )
}
export default EditPost;