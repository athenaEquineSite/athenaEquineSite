import { NextApiRequest, NextApiResponse } from "next";
import ImageSt1 from '../../../models/ImageSt1';
import ImageSt2 from '../../../models/ImageSt2';
import { cloudinaryDelete } from '../../../utils/cloudinary';

export default async function deleteImage(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "DELETE") {
        const id = req.body.id;
        if(!id) throw new Error('No post to delete.');

        let deletedPost = {};
        if(id.includes('stable1')) {
            deletedPost = await ImageSt1.findOneAndDelete({cloudinaryId: id});
        }  else if(id.includes('stable2')) {
            deletedPost = await ImageSt2.findOneAndDelete({cloudinaryId: id});
        }

        const cloudResult = await cloudinaryDelete(id);

        return res.json(deletedPost);

    }
    return res.status(405).json({message: "Only DELETE method allowed."});
}