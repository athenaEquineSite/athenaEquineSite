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

export const getStaticProps = async (context) => {
    await dbConnect();

    const post = await Post.findOne({postId: context.params.id});
    const posts = await JSON.parse(JSON.stringify(post));

    return {
        props: {
            post: posts
        }
    }
} 

export const getStaticPaths = async () => {
    await dbConnect();
    const posts = await Post.find({});
    const postss = await JSON.parse(JSON.stringify(posts))

    const ids = postss.map(post => post.postId);
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}

export default PostPage;