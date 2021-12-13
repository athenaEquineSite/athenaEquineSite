import styles from '../../../styles/Gallery/Gallery.module.scss';
import { useState, useEffect } from 'react';
import { useMutate } from 'restful-react';
import { verify } from 'jsonwebtoken';
import { jwtSecret, server } from '../../../utils/env';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';
import Link from 'next/link';

function Upload() {
    const [image, setImage] = useState();
    const [selection, setSelection] = useState('Stall_Kolbjornrud_Hestepensjonat');
    const [uploadStatus, setUploadStatus] = useState({
        message: 'Not uploaded',
        success: false
    });
    const [inputStatus, setInputStatus] = useState({
        message: 'No file',
        success: false
    })
    const base = server;
    const { mutate: uploadImage } = useMutate({
        verb: 'POST',
        path: 'api/gallery/upload',
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

    const handleChange = (event) => {
        const file = event.target.files[0];
        const maximumFileSize = 500 * 1024;
        if(file && (file.size > maximumFileSize)) {
            setImage(null);
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
        setImage(event.target.files[0]);
        setInputStatus({
            ...inputStatus,
            message: 'File ready to upload',
            success: true
        });
        setUploadStatus({
            ...uploadStatus,
            message: "Not uploaded",
            success: false
        })
    }

    const handleSelect = event => {
        setSelection(event.target.value);
    }
    
    const handleUpload = async () => {
        try {
            if(!image) return;

            if(!selection) return;
    
            const formData = new FormData();
            formData.append('image', image);
            formData.append('selection', selection);
    
            const uploadedImage = await uploadImage(formData);
            if(uploadedImage.success) {
                setUploadStatus({
                    ...uploadStatus,
                    message: uploadedImage.message,
                    success: uploadedImage.success
                });
                setImage(null);
            }
        }
        catch(err) {
            setUploadStatus({
                ...uploadStatus,
                message: err.data.message,
                success: err.data.success
            });
        }
    }

    return (
        <div className={`${styles.addImage}`}>
            <Link href="/aeas/dashboard"><a className={`${styles.goBack}`}>Go Back</a></Link>
            <select onChange={handleSelect} defaultValue="Stall_Kolbjornrud_Hestepensjonat" name="chooseStable" id="chooseStable">
                <option value="Stall_Kolbjornrud_Hestepensjonat">Stall Kolbjornrud Hestepensjonat</option>
                <option value="Solberg_Gard">Solberg Gard</option>
            </select>
            <input onChange={handleChange} accept=".jpg, .png, .jpeg" type="file" placeholder="Choose file"/>
            <div>
                <button onClick={handleUpload} disabled={!image}>Upload</button>
            </div>
            <div>
                <h2 className={`${styles.uploadInfo}`}>If status below is <span>Not uploaded</span> it means upload didn&apos;t finish or even it didn&apos;t started. ;)</h2>
                {inputStatus.success ? <h3 className={`${styles.uploadInfoTrue}`}>{inputStatus.message}</h3> : <h3 className={`${styles.uploadInfoFalse}`}>{inputStatus.message}</h3>}
                {uploadStatus.success ? <h3 className={`${styles.uploadInfoTrue}`}>{uploadStatus.message}</h3> : <h3 className={`${styles.uploadInfoFalse}`}>{uploadStatus.message}</h3>}
            </div>
            
        </div>
    )
}


export const getServerSideProps = async (context) => {
    const {auth} = context.req.cookies;
    await dbConnect();
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

export default Upload;