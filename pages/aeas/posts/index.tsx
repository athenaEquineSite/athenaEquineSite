import styles from '../../../styles/Dashboard/Post.module.scss';
import PostList from '../../../components/PostList';
import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/Post';
import { verify } from 'jsonwebtoken';
import { jwtSecret, server, deployHookURL } from '../../../utils/env';
import User from '../../../models/User';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Posts({posts}) {

    const [postData, setPostData] = useState(posts);

    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
          document.body.classList.remove('solbergBackground')    
        }
        if(document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')    
        }
      });

      const router = useRouter();
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
        const deploy = await fetch(`${deployHookURL}`, {
            method: 'GET'
        });
        router.reload();        
    }

    // paginacja na wszystkie posty w PostList
    return (
        
        <div>
            <Link href="/aeas/dashboard"><a className={`${styles.goBack}`}>Go Back</a></Link>
            <PostList posts={postData} onDelete={handleDeleteButton}/>
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
