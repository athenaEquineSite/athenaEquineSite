import stylesLogin from '../../styles/Dashboard/Login.module.scss';
import { useRouter } from 'next/router';
import { verify } from 'jsonwebtoken';
import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';
import { server } from '../../utils/env';

function Login() {

    const router = useRouter();

    const loginUser = async (event) => {
        event.preventDefault();
        await dbConnect();
        const res = await fetch(`${server}/api/login`, {
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const result = await res.json();
        if(result) {
            router.push('/aeas/dashboard');
        }
        event.target.reset();
        
    }
    
    return (
        
        <div className={stylesLogin.login}>
            <form onSubmit={loginUser}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" placeholder="Username" required/>
                
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password" required/>
                
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    await dbConnect();
    const {auth} = ctx.req.cookies;

    if(auth) {
        const match = await verify(auth, process.env.JWT_SECRET);
        const user = await User.findOne({userId: match.sub});
        if(user) {
            return {
                redirect: {
                    destination: '/aeas/dashboard',
                    permanent: false
                }
            }
        }
    }
    return {
        props: {}
    }
}

export default Login;