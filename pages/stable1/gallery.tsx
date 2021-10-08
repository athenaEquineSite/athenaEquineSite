import ImageSt1 from "../../models/ImageSt1";
import { useState } from 'react';
import dbConnect from "../../utils/dbConnect";
import ImageList from '../../components/gallery/ImageList';

const Stable1Gallery = ({stable1Img}) => {

    const [imageSt1, setimageSt1] = useState(stable1Img);
    console.log(imageSt1);

    return (
        <div>
            <ImageList images={imageSt1}/>
        </div>
    )
}

export default Stable1Gallery;


export const getServerSideProps = async () => {
    await dbConnect();
    const stable1Img = await ImageSt1.find({});

    return {
        props: {
            stable1Img: JSON.parse(JSON.stringify(stable1Img)),
        }
    }
}