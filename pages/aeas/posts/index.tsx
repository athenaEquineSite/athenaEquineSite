import PostList from '../../../components/PostList';
import { server } from '../../../utils/env';
import dbConnect from '../../../utils/dbConnect';

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
    const res = await fetch(`${server}/api/posts`);
    const posts = await res.json();

    return {
        props: {
            posts
        }
    }
} 

export default Posts;