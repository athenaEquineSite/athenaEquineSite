import dbConnect from '../../../../utils/dbConnect';
import Post from '../../../../models/Post';

function PostPage({post}) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    await dbConnect();

    const post = await Post.findOne({postId: context.params.id});
    const posts = await JSON.parse(JSON.stringify(post));

    return {
        props: {
            post: posts
        }
    }
} 

export default PostPage;
