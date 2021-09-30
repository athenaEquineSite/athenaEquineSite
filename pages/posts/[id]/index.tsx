const post = ({post}) => {
    return (
        <>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </>
    )
}

export const getStaticProps = async (context) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);

    const post = await res.json();

    return {
        props: {
            post
        }
    }
} 

export const getStaticPaths = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    const posts = await res.json();

    const ids = posts.map(post => post.id);
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}

export default post;