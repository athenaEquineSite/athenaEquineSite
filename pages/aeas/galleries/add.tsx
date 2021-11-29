import { useState, useEffect } from 'react';
import { useMutate } from 'restful-react';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '../../../utils/env';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

function Upload() {
    const [image, setImage] = useState();
    const [selection, setSelection] = useState('stable1');

    const { mutate: uploadImage } = useMutate({
        verb: 'POST',
        path: 'api/gallery/upload'
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
        setImage(event.target.files[0]);     
    }

    const handleSelect = event => {
        setSelection(event.target.value);
    }
    
    const handleUpload = async () => {

        if(!image) return;

        if(!selection) return;

        const formData = new FormData();
        formData.append('image', image);
        formData.append('selection', selection);

        const uploadedImage = await uploadImage(formData);
        console.log(uploadedImage)
    }

    return (
        <div>
            <select onChange={handleSelect} defaultValue="stable1" name="chooseStable" id="chooseStable">
                <option value="stable1">Stable1</option>
                <option value="stable2">Stable2</option>
            </select>
            <input onChange={handleChange} accept=".jpg, .png, .jpeg" type="file" placeholder="Choose file"/>
            <div>
                <button onClick={handleUpload} disabled={!image}>Upload</button>
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