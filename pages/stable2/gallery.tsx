import ImageSt2 from "../../models/ImageSt2";
import { useState } from 'react';
import dbConnect from "../../utils/dbConnect";
import ImageList from '../../components/gallery/ImageList';

const Stable2Gallery = ({stable2Img}) => {

    const [imageSt2, setimageSt2] = useState(stable2Img);
    console.log(imageSt2);

    return (
        <div>
            <ImageList images={imageSt2}/>
        </div>
    )
}

export default Stable2Gallery;


export const getServerSideProps = async () => {
    await dbConnect();
    const stable1Img = await ImageSt2.find({});

    return {
        props: {
            stable2Img: JSON.parse(JSON.stringify(stable1Img)),
        }
    }
}