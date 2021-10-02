import { server } from '../../../../utils/env';

const post = ({post}) => {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/posts/${context.params.id}`);

    const post = await res.json();

    return {
        props: {
            post
        }
    }
} 

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/posts`);

    const posts = await res.json();

    const ids = posts.map(post => post.postId);
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}

export default post;