import PostList from '../../../components/PostList';
import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/Post';
import { verify } from 'jsonwebtoken';
import { jwtSecret, server } from '../../../utils/env';
import User from '../../../models/User';

function Posts({posts}) {

    const handleDeleteButton = async (postId) => {
        
        const res = await fetch(`${server}/api/posts/delete`, {
            method: "DELETE",
            body: JSON.stringify({
                postId: postId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });        
    }

    // paginacja na wszystkie posty w PostList
    return (
        <div>
            <PostList posts={posts} onDelete={handleDeleteButton}/>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    await dbConnect();

    const {auth} = context.req.cookies;

    if(!auth) {
        return {
            redirect: {
                destination: '/aeas',
                permanent: false
            }
        }
    }
    const match = await verify(auth, jwtSecret);
    const user = await User.findOne({userId: match.sub});
    if(!user) {
        return {
            redirect: {
                destination: '/aeas',
                permanent: false
            }
        }
    }
    
    const posts = await Post.find({});
    const post = JSON.parse(JSON.stringify(posts));

    return {
        props: {
            posts: post
        }
    }
} 

export default Posts;
