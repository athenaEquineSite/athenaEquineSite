import { server } from '../../utils/env';
import dbConnect from '../../utils/dbConnect';
import useEffect from 'react';

function News({news}) {
    return (
        <div>
            <h1>{news.title}</h1>
            <p>{news.body}</p>
        </div>
    )
}

export const getStaticProps = async (context) => {
    await dbConnect();
    const res = await fetch(`${server}/api/posts/${context.params.id}`);

    const news = await res.json();

    return {
        props: {
            news
        }
    }
} 

export const getStaticPaths = async () => {
    await dbConnect();
    const res = await fetch(`${server}/api/posts`);

    const newses = await res.json();

    const ids = newses.map(news => news.postId);
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}

export default News;