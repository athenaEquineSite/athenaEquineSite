import { server } from '../../utils/env';

const news = ({news}) => {
    return (
        <div>
            <h1>{news.title}</h1>
            <p>{news.body}</p>
        </div>
    )
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/posts/${context.params.id}`);

    const news = await res.json();

    return {
        props: {
            news
        }
    }
} 

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/posts`);

    const newses = await res.json();

    const ids = newses.map(news => news.postId);
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}

export default news;