import Link from 'next/link';

const News = ({news}) => {
    return (
        <Link href="/news/[id]" as={`/news/${news.postId}`}>
            <a>
                <h3>{news.title}</h3>
                <p>{(news.body).length > 100 ? news.body.substr(0, 100) + '...' : news.body}</p>
            </a>
        </Link>
    )
}

export default News;