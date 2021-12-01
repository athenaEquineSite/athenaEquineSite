import styles from '../../../styles/EditPost.module.scss';
import { server, deployHookURL } from '../../../utils/env';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EditPost = ({ post }) => {
    useEffect(() => {
        if (document.body.classList.contains('solbergBackground')) {
            document.body.classList.remove('solbergBackground')
        }
        if (document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')
        }
    });

    const router = useRouter();

    const handleUpdateForm = async (event) => {
        event.preventDefault();
        const udpdatePost = await fetch(`${server}/api/posts/update`, {
            body: JSON.stringify({
                postId: post.postId,
                eng: {
                    title: event.target.titleUpdateEnglish.value,
                    postBody: event.target.postBodyUpdateEnglish.value
                },
                nor: {
                    title: event.target.titleUpdateNorwegian.value,
                    postBody: event.target.postBodyUpdateNorwegian.value
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH'    
        });
        const deploy = await fetch(`${deployHookURL}`, {
            method: 'GET'
        });
        router.push('/aeas/dashboard');
    }

    return (
        <div className={`${styles.editPostWrapper}`}>
            <Link href="/aeas/dashboard"><a>Go Back</a></Link>
            <form className={`${styles.viewForm}`}>
                <div>
                    <h3>English Version</h3>
                    <label htmlFor="titleEnglish">Title: </label>
                    <input type="text" value={post.eng.title} id="titleEnglish" disabled />
                    <label htmlFor="postBodyEnglish">Post text: </label>
                    <textarea name="postBodyEng" id="postBodyEnglish" cols={30} rows={10} value={post.eng.postBody} disabled></textarea>
                </div>
                <div>
                    <h3>Norwegian Version</h3>
                    <label htmlFor="titleNorwegian">Title: </label>
                    <input type="text" value={post.nor.title} id="titleNorwegian" disabled />
                    <label htmlFor="postBodyNorwegian">Post text: </label>
                    <textarea name="postBodyNor" id="postBodyNorwegian" cols={30} rows={10} value={post.nor.postBody} disabled></textarea>
                </div>
            </form>
            <form onSubmit={handleUpdateForm} className={`${styles.updateForm}`}>
                <div>
                    <h3>English Version</h3>
                    <label htmlFor="titleUpdateEnglish">Title: </label>
                    <input type="text" placeholder={post.eng.title} id="titleUpdateEnglish" required/>
                    <label htmlFor="postBodyUpdateEnglish">Post text: </label>
                    <textarea name="postBodyUpdateEng" id="postBodyUpdateEnglish" cols={30} rows={10} placeholder={post.eng.postBody} required></textarea>
                </div>
                <div>
                    <h3>Norwegian Version</h3>
                    <label htmlFor="titleUpdateNorwegian">Title: </label>
                    <input type="text" placeholder={post.nor.title} id="titleUpdateNorwegian" required/>
                    <label htmlFor="postBodyUpdateNorwegian">Post text: </label>
                    <textarea name="postBodyUpdateNor" id="postBodyUpdateNorwegian" cols={30} rows={10} placeholder={post.nor.postBody} required></textarea>
                </div>
                <button type="submit">Update Post</button>
            </form>
        </div>
    )
}

export const getServerSideProps = (context) => {
    return {
        props: { post: JSON.parse(context.query.data) }
    }
}

export default EditPost;