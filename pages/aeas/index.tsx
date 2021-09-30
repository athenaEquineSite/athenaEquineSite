import stylesLogin from '../../styles/Dashboard/Login.module.scss';
import { useRouter } from 'next/router';

const Login = () => {

    const router = useRouter();

    const loginUser = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:3000/api/login', {
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
    const {auth} = ctx.req.cookies;
    if(auth) {
        return {
            redirect: {
                destination: '/aeas/dashboard',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

export default Login;