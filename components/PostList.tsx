import Post from '../components/Post';

const PostList = ({posts}) => {
    return (
        <div>
            {posts.map((post) => (
                <Post key={post.postId} post={post} />
            ))}
        </div>
    )
}

export default PostList;