import { server } from '../../../utils/env';
import dbConnect from '../../../utils/dbConnect';
import { useRouter } from 'next/router'

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
        const result = await addPost.json();
        router.push('/aeas/dashboard');
    }
    return (
        <div>
            <form onSubmit={handleForm}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" required/>
                
                <label htmlFor="body">Body: </label>
                <textarea id="body" name="body" cols={30} rows={10} placeholder="Type post body ..."></textarea>
                
                <button type="submit">Submit Post</button>
            </form>
        </div>
    )
}

export default AddPost;