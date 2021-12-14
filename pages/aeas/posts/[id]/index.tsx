import dbConnect from '../../../../utils/dbConnect';
import Post from '../../../../models/Post';
import styles from '../../../../styles/Dashboard/Post.module.scss';
import Link from 'next/link';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '../../../../utils/env';
import User from '../../../../models/User';
import { useEffect } from 'react';
import { useLang } from '../../../../context/LanguageProvider';

function PostPage({post}) {

    const isNor = useLang();

    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
          document.body.classList.remove('solbergBackground')    
        }
        if(document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')    
        }
      });

    return (
        <div className={`${styles.post} row`}>
            <div className={`${styles.titleContainer} row col-1`}>
                <Link href="/aeas/posts"><a className={styles.goBack}>Go back</a></Link>
                <h1 className={styles.title}>{isNor ? post.nor.title : post.eng.title}</h1>
            </div>
            <p className={`${styles.body} col-10`}>{isNor ? post.nor.postBody : post.eng.postBody}</p>
            <Link href="/aeas/posts"><a className={`goBack col-1`}>Go back</a></Link>
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
    const post = await Post.findOne({postId: context.params.id});
    const posts = await JSON.parse(JSON.stringify(post));

    return {
        props: {
            post: posts
        }
    }
} 

export default PostPage;
