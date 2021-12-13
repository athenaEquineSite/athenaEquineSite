import stylesDash from '../../styles/Dashboard/Dashboard.module.scss';
import { verify } from 'jsonwebtoken';
import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { server, jwtSecret } from '../../utils/env';
import { useEffect } from 'react';

function Dashboard() {
    const router = useRouter();

    const logOut = async () => {
        const res = await fetch(`${server}/api/logout`, { method: "POST", headers: {'Access-Control-Allow-Origin': '*'} });
        router.push('/aeas');
    }

    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
          document.body.classList.remove('solbergBackground')    
        }
        if(document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')    
        }
      });

    return (
        <div className={`${stylesDash.dashboard} row`}>
            <div className={`col-1`}>
                <button onClick={logOut}>Log Out</button>
            </div>
            <div className={`${stylesDash.postGallContainer} col-5`}>
                <h2>POSTS</h2>
                <Link href="/aeas/posts">
                    <a>View Posts</a>
                </Link>
                <Link href="/aeas/posts/add">
                    <a>Create</a>
                </Link>
            </div>
            <div className={`${stylesDash.postGallContainer} col-5`}>
                <h2>Galleries</h2>
                <Link href="/aeas/galleries">
                    <a>View</a>
                </Link>
                <Link href="/aeas/galleries/add">
                    <a>Add</a>
                </Link>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    await dbConnect();
    
    const {auth} = ctx.req.cookies;

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
    
    return {
        props: {
            test: 2
        }
    }
}

export default Dashboard;
