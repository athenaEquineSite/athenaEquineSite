import stylesDash from '../../styles/Dashboard/Dashboard.module.scss';
import { verify } from 'jsonwebtoken';
import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Dashboard = ({test}) => {
    const router = useRouter();

    const logOut = async () => {
        await fetch('http://localhost:3000/api/logout', { method: "POST" });
        router.push('/aeas');
    }

    return (
        <div className={`${stylesDash.dashboard} row`}>
            <div className={`col-1`}>
                <button onClick={logOut}>Log Out</button>
            </div>
            <div className={`${stylesDash.postContainer} col-3`}>
                <h2>POSTS</h2>
                <Link href="/aeas/posts">
                    <a>View Posts</a>
                </Link>
                <Link href="/aeas/posts/add">
                    <a>Create</a>
                </Link>
            </div>
            <div className={`${stylesDash.galleriesContainer} col-3 row`}>
                <h2 className={`col-4`}>Stable1 Gallery</h2>
                <div className={`col-8`}>
                    <Link href="/aeas/galleries/stable1">
                        <a>View</a>
                    </Link>
                    <Link href="/aeas/galleries/stable1/add">
                        <a>Add</a>
                    </Link>
                </div>

            </div>
            <div className={`${stylesDash.galleriesContainer} col-3`}>
            <h2>Stable2 Gallery</h2>
                <Link href="/aeas/galleries/stable2">
                    <a>View</a>
                </Link>
                <Link href="/aeas/galleries/stable2/add">
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
    const match = await verify(auth, process.env.JWT_SECRET);
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