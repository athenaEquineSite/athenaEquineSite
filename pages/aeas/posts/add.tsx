import styles from '../../../styles/Dashboard/Post.module.scss';
import { useRouter } from 'next/router';
import { verify } from 'jsonwebtoken';
import { jwtSecret, deployHookURL, server } from '../../../utils/env';
import User from '../../../models/User';
import { useEffect, useState } from 'react';
import { useMutate } from 'restful-react';
import Link from 'next/link';


const AddPost = () => {

    const [postImage, setPostImage] = useState();
    const [uploadStatus, setUploadStatus] = useState({
        message: 'Not uploaded',
        success: false
    });
    const [inputStatus, setInputStatus] = useState({
        message: 'No file',
        success: false
    });

    const base = server;
    const { mutate: uploadForm } = useMutate({
        verb: 'POST',
        path: 'api/posts/add',
        base
    });

    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
          document.body.classList.remove('solbergBackground')    
        }
        if(document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')    
        }
      });

    const router = useRouter();

    const handleChange = (event) => {
        const file = event.target.files[0];
        const maximumFileSize = 500 * 1024;
        if(file && (file.size > maximumFileSize)) {
            setPostImage(null);
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
            setPostImage(null) 
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
        setPostImage(file); 
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

    const handleForm = async (event) => {
        event.preventDefault();

        const formTextData = {
            eng: {
                title: event.target.titleEn.value,
                postBody: event.target.bodyEn.value
            },
            nor: {
                title: event.target.titleNo.value,
                postBody: event.target.bodyNo.value
            }
        };

        const formData = new FormData();
        formData.append('formTextData', JSON.stringify(formTextData));
        
        if(postImage) {
            formData.append('image', postImage);
            formData.append('selection', 'Post_Image');
        }

        const uploadedForm = await uploadForm(formData);
        if(uploadedForm.success) {
            setUploadStatus({
                ...uploadStatus,
                message: uploadedForm.message,
                success: uploadedForm.success
            });
            setPostImage(null);
        }

        const deploy = await fetch(`${deployHookURL}`, {
            method: 'GET'
        });
        
        router.push('/aeas/dashboard');
    }
    return (
        <div className={`${styles.addPost}`}>
            <Link href="/aeas/dashboard"><a className={`${styles.goBack}`}>Go Back</a></Link>
            
            
            <form onSubmit={handleForm}>
                <div className={`${styles.addPostPictureWrapper}`}>
                    <label htmlFor="postImage">Add post image: </label>
                    <input onChange={handleChange} accept=".jpg, .png, .jpeg" type="file" id="postImage" placeholder="Choose file"/>
                </div>
                {inputStatus.success ? <h3 className={`${styles.uploadInfoTrue}`}>{inputStatus.message}</h3> : <h3 className={`${styles.uploadInfoFalse}`}>{inputStatus.message}</h3>}
                <div className={`${styles.formTextData}`}>
                    <div className={`${styles.formLangWrapper}`}>
                        <h3>Add post in english: </h3>
                        <label htmlFor="titleEn">Title: </label>
                        <input type="text" id="titleEn" name="titleEn" required/>
                        
                        <label htmlFor="bodyEn">Body: </label>
                        <textarea id="bodyEn" name="bodyEn" cols={30} rows={10} placeholder="Type post body ..." required></textarea>
                    </div>
                    <div className={`${styles.formLangWrapper}`}>
                        <h3>Add post in norwegian: </h3>
                        <label htmlFor="titleNo">Title: </label>
                        <input type="text" id="titleNo" name="titleNo" required/>
                        
                        <label htmlFor="bodyNo">Body: </label>
                        <textarea id="bodyNo" name="bodyNo" cols={30} rows={10} placeholder="Type post body ..." required></textarea>
                    </div>
                </div>
                

                
                <button type="submit">Submit Post</button>
            </form>
            {uploadStatus.success ? <h3 className={`${styles.uploadInfoTrue}`}>{uploadStatus.message}</h3> : <h3 className={`${styles.uploadInfoFalse}`}>{uploadStatus.message}</h3>}
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