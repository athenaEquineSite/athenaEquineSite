import { server } from '../../../utils/env';
import { useRouter } from 'next/router';
import { verify } from 'jsonwebtoken';
import { jwtSecret, deployHookURL } from '../../../utils/env';
import User from '../../../models/User';
import { useEffect } from 'react';
import Link from 'next/link';


function AddPost() {
    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
          document.body.classList.remove('solbergBackground')    
        }
        if(document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')    
        }
      });

    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault();
        const addPost = await fetch(`${server}/api/posts/add`, {
            body: JSON.stringify({
                eng: {
                    title: event.target.titleEn.value,
                    postBody: event.target.bodyEn.value
                },
                nor: {
                    title: event.target.titleNo.value,
                    postBody: event.target.bodyNo.value
                }
                
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const deploy = await fetch(`${deployHookURL}`, {
            method: 'GET'
        });
        router.push('/aeas/dashboard');
    }
    return (
        <div>
            <Link href="/aeas/dashboard"><a>Go Back</a></Link>
            <form onSubmit={handleForm}>
                <div>
                    <h3>Add post in english: </h3>
                    <label htmlFor="titleEn">Title: </label>
                    <input type="text" id="titleEn" name="titleEn" required/>
                    
                    <label htmlFor="bodyEn">Body: </label>
                    <textarea id="bodyEn" name="bodyEn" cols={30} rows={10} placeholder="Type post body ..." required></textarea>
                </div>
                <div>
                    <h3>Add post in norwegian: </h3>
                    <label htmlFor="titleNo">Title: </label>
                    <input type="text" id="titleNo" name="titleNo" required/>
                    
                    <label htmlFor="bodyNo">Body: </label>
                    <textarea id="bodyNo" name="bodyNo" cols={30} rows={10} placeholder="Type post body ..." required></textarea>
                </div>

                
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
