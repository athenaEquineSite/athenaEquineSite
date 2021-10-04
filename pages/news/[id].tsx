import dbConnect from '../../utils/dbConnect';
import Post from '../../models/Post';

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
    const post = await Post.findOne({postId: context.params.id});
    const news = await JSON.parse(JSON.stringify(post));
    
    return {
        props: {
            news: news
        }
    }
} 

export const getStaticPaths = async () => {
    await dbConnect();
    const posts = await Post.find({});
    const news = JSON.parse(JSON.stringify(posts));
    
    const ids = news.map(news => news.postId);
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}

export default News;