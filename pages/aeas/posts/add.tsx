import { server } from '../../../utils/env';
import { useRouter } from 'next/router';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '../../../utils/env';
import User from '../../../models/User';

function AddPost() {

    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault();
        const addPost = await fetch(`${server}/api/posts/add`, {
            body: JSON.stringify({
                title: event.target.title.value,
                body: event.target.body.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        router.push('/aeas/dashboard');
    }
    return (
        <div>
            <form onSubmit={handleForm}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" required/>
                
                <label htmlFor="body">Body: </label>
                <textarea id="body" name="body" cols={30} rows={10} placeholder="Type post body ..." required></textarea>
                
                <button type="submit">Submit Post</button>
            </form>
        </div>
    )
}

export const getServerSideProps = async (context) => {
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

    return {
        props: {}
    }
}

export default AddPost;
