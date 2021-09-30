import Link from 'next/link';

const Post = ({post}) => {
    return (
        <Link href="posts/[id]" as={`/posts/${post.id}`}>
            <a>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </a>
        </Link>
    )
}

export default Post;