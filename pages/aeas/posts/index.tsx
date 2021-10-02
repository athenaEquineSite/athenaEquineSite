import PostList from '../../../components/PostList';

const posts = ({posts}) => {

    // paginacja na wszystkie posty w PostList
    return (
        <div>
            <PostList posts={posts}/>
        </div>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(`http://localhost:3000/api/posts`);
    const posts = await res.json();

    return {
        props: {
            posts
        }
    }
} 

export default posts;