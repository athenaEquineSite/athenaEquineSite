import styles from '../../../styles/Gallery/Gallery.module.scss';
import { verify } from 'jsonwebtoken';
import { useState } from 'react';
import { jwtSecret, server } from '../../../utils/env';
import User from '../../../models/User';
import ImageSt1 from '../../../models/ImageSt1';
import ImageSt2 from '../../../models/ImageSt2';
import ImageContainer from '../../../components/dashboard/ImageContainer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Gallery({stable1Img, stable2Img}) {

    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
          document.body.classList.remove('solbergBackground')    
        }
        if(document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')    
        }
      });

    const [stable1Images, setStable1Images] = useState(stable1Img);
    const [stable2Images, setStable2Images] = useState(stable2Img);

    const router = useRouter();

    const handleDelete = async (id) => {
        const res = await fetch(`${server}/api/gallery/delete`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        const result = await res.json();

        if((result.cloudinaryId).includes('Stall_Kolbjornrud_Hestepensjonat')) {
            const stable1 = stable1Images.filter(image => image.cloudinaryId !== id);
            setStable1Images(stable1);
        } else if((result.cloudinaryId).includes('Solberg_Gard')) {
            const stable2 = stable2Images.filter(image => image.cloudinaryId !== id);
            setStable2Images(stable2);
        }
        router.reload();
    }

    return (
        <div className={`row ${styles.viewImages}`}>
            <Link href="/aeas/dashboard"><a className={`goBack`}>Go Back</a></Link>
            <div>
                <h1>Stall Kolbjornrud Hestepensjonat</h1>
                <div>
                    <ImageContainer handleDelete={handleDelete} images={stable1Images}/>
                </div>
            </div>
            <div>
                <h1>Solberg Gard</h1>
                <div>
                    <ImageContainer handleDelete={handleDelete} images={stable2Images}/>
                </div>
            </div>
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

    const stable1Img = await ImageSt1.find({});
    const stable2Img = await ImageSt2.find({});

    return {
        props: {
            stable1Img: JSON.parse(JSON.stringify(stable1Img)),
            stable2Img: JSON.parse(JSON.stringify(stable2Img))
        }
    }
}
