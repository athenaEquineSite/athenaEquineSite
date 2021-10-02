import Link from 'next/link';

const Post = ({post}) => {
    return (
        <Link href="/aeas/posts/[id]" as={`/aeas/posts/${post.postId}`}>
            <a>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </a>
        </Link>
    )
}

export default Post;