
const EditPost = ({post}) => {
    return (
        <div>{post.postId}</div>
    )
}

export const getServerSideProps = (context) => {
    return {
        props: {post: JSON.parse(context.query.data)}
    }
}

export default EditPost;