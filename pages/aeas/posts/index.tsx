import PostList from '../../../components/PostList';
import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/Post';

function Posts({posts}) {

    // paginacja na wszystkie posty w PostList, zmiana adresu url w każdym fetch(zamiast localhost ustawic wedlug development i production zmienna)
    return (
        <div>
            <PostList posts={posts}/>
        </div>
    )
}

export const getStaticProps = async () => {
    await dbConnect();
    const posts = await Post.find({});
    const post = JSON.parse(JSON.stringify(posts));

    return {
        props: {
            posts: post
        }
    }
} 

export default Posts;