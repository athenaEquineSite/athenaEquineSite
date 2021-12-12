import styles from '../../../../../styles/EditPost.module.scss';
import { server, deployHookURL, jwtSecret } from '../../../../../utils/env';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutate } from 'restful-react';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '../../../../../utils/dbConnect';
import { verify } from 'jsonwebtoken';
import User from '../../../../../models/User';
import Post from '../../../../../models/Post';

const EditPost = ({ post }) => {
    console.log(post);

    const [existingImage, setExistingImage] = useState(true);
    const [updatedImage, setUpdatedImage] = useState();
    const [uploadStatus, setUploadStatus] = useState({
        message: 'Not uploaded',
        success: false
    });
    const [inputStatus, setInputStatus] = useState({
        message: 'No file',
        success: false
    });

    useEffect(() => {
        if (document.body.classList.contains('solbergBackground')) {
            document.body.classList.remove('solbergBackground')
        }
        if (document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')
        }
    });

    const { mutate: uploadForm } = useMutate({
        verb: 'PATCH',
        path: 'api/posts/update'
    });

    const router = useRouter();

    const handleInputChange = (event) => {
        const file = event.target.files[0];

        const maximumFileSize = 500 * 1024;

        if(file && (file.size > maximumFileSize)) {
            setUpdatedImage(null);
            setInputStatus({
                ...uploadStatus,
                message: 'File is too big, it needs to be less than 500 KB.',
                success: false
            });
            if(uploadStatus.success) {
                setUploadStatus({
                    ...uploadStatus,
                    message: "Not uploaded",
                    success: false
                })
            }
            return;
        }

        if(!file) { 
            setUpdatedImage(null) 
            setInputStatus({
                ...inputStatus,
                message: 'No file',
                success: false
            });
            setUploadStatus({
                ...uploadStatus,
                message: "Not uploaded",
                success: false
            })
            return;
        };

        setUpdatedImage(file); 
        setInputStatus({
            ...inputStatus,
            message: 'File ready to upload',
            success: true
        });
        setUploadStatus({
            ...uploadStatus,
            message: "Not uploaded",
            success: false
        });        
    }

    const handleDelete = async (id) => {
        const res = await fetch(`${server}/api/posts/deleteImage`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await res.json();

        setExistingImage(false);
        
        router.push(`/aeas/posts/${post.postId}`);
    }

    const handleUpdateForm = async (event) => {
        event.preventDefault();
        let formTextUpdatedData;
        
        if(post.cloudinaryId) {
            formTextUpdatedData = {
                postId: post.postId,
                eng: {
                    title: event.target.titleUpdateEnglish.value,
                    postBody: event.target.postBodyUpdateEnglish.value
                },
                nor: {
                    title: event.target.titleUpdateNorwegian.value,
                    postBody: event.target.postBodyUpdateNorwegian.value
                },
                cloudinaryId: post.cloudinaryId,
                cloudinaryUrl: post.cloudinaryUrl
            }
        }
        formTextUpdatedData = {
            postId: post.postId,
            eng: {
                title: event.target.titleUpdateEnglish.value,
                postBody: event.target.postBodyUpdateEnglish.value
            },
            nor: {
                title: event.target.titleUpdateNorwegian.value,
                postBody: event.target.postBodyUpdateNorwegian.value
            }
        }

        const formData = new FormData();
        formData.append('formTextUpdatedData', JSON.stringify(formTextUpdatedData));

        if(updatedImage) {
            formData.append('image', updatedImage);
            formData.append('selection', 'Post_Image');
        }


        const uploadedForm = await uploadForm(formData);
        console.log(uploadedForm)
        if(uploadedForm.success) {
            setUploadStatus({
                ...uploadStatus,
                message: uploadedForm.message,
                success: uploadedForm.success
            });
            setUpdatedImage(null);
        }

        const deploy = await fetch(`${deployHookURL}`, {
            method: 'POST'
        });
        
        router.push('/aeas/dashboard');
    }

    return (
        <div className={`${styles.editPostWrapper}`}>
            <Link href="/aeas/posts"><a className={`${styles.goBack}`}>Go Back</a></Link>
            <form className={`${styles.editForm}`}>
                {post.cloudinaryId && existingImage ? 
                    <div className={`${styles.addPostPictureWrapper}`}>
                        <h3>Image preview: </h3>
                        <Image src={post.cloudinaryUrl} width={100} height={100} alt="previewImage"/>
                        <button onClick={() => handleDelete(post.cloudinaryId)} className={`${styles.deleteBtn}`}><span>DELETE</span></button>
                    </div> 
                : null}
                <div className={`${styles.formLanguage}`}>
                    <h3>English Version</h3>
                    <label htmlFor="titleEnglish">Title: </label>
                    <input type="text" value={post.eng.title} id="titleEnglish" disabled />
                    <label htmlFor="postBodyEnglish">Post text: </label>
                    <textarea name="postBodyEng" id="postBodyEnglish" cols={30} rows={10} value={post.eng.postBody} disabled></textarea>
                </div>
                <div className={`${styles.formLanguage}`}>
                    <h3>Norwegian Version</h3>
                    <label htmlFor="titleNorwegian">Title: </label>
                    <input type="text" value={post.nor.title} id="titleNorwegian" disabled />
                    <label htmlFor="postBodyNorwegian">Post text: </label>
                    <textarea name="postBodyNor" id="postBodyNorwegian" cols={30} rows={10} value={post.nor.postBody} disabled></textarea>
                </div>
            </form>
            <form onSubmit={handleUpdateForm} className={`${styles.editForm} ${styles.updateForm}`}>
                <div className={`${styles.addPostPictureWrapper}`}>
                    <label htmlFor="postImage">Change/Add image: </label>
                    <input onChange={handleInputChange} accept=".jpg, .png, .jpeg" type="file" id="postImage" placeholder="Choose file"/>
                </div>
                {inputStatus.success ? <h3 className={`${styles.uploadInfoTrue}`}>{inputStatus.message}</h3> : <h3 className={`${styles.uploadInfoFalse}`}>{inputStatus.message}</h3>}
                <div className={`${styles.editForm}`}>
                    <div className={`${styles.formLanguage}`}>
                        <h3>English Version</h3>
                        <label htmlFor="titleUpdateEnglish">Title: </label>
                        <input type="text" placeholder={post.eng.title} id="titleUpdateEnglish" required />
                        <label htmlFor="postBodyUpdateEnglish">Post text: </label>
                        <textarea name="postBodyUpdateEng" id="postBodyUpdateEnglish" cols={30} rows={10} placeholder={post.eng.postBody} required></textarea>
                    </div>
                    <div className={`${styles.formLanguage}`}>
                        <h3>Norwegian Version</h3>
                        <label htmlFor="titleUpdateNorwegian">Title: </label>
                        <input type="text" placeholder={post.nor.title} id="titleUpdateNorwegian" required/>
                        <label htmlFor="postBodyUpdateNorwegian">Post text: </label>
                        <textarea name="postBodyUpdateNor" id="postBodyUpdateNorwegian" cols={30} rows={10} placeholder={post.nor.postBody} required></textarea>
                    </div>
                </div>
                <button type="submit">Update Post</button>
            </form>
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

export default EditPost;