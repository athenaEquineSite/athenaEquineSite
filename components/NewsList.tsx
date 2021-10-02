import News from './News';
const NewsList = ({posts}) => {
    return (
        <div>
        {posts.map((post) => (
            <News key={post.postId} news={post} />
        ))}
        </div>
    )
}

export default NewsList;