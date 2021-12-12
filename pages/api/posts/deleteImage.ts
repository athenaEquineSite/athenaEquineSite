import { NextApiRequest, NextApiResponse } from "next";
import Post from '../../../models/Post';

import { cloudinaryDelete } from '../../../utils/cloudinary';

export default async function deleteImage(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "DELETE") {
        const id = req.body.id;
        if(!id) throw new Error('No post to delete.');

        const deletedPost = await Post.findOne({cloudinaryId: id}).exec();
        deletedPost.cloudinaryId = undefined;
        deletedPost.cloudinaryUrl = undefined;
        await deletedPost.save();

        const cloudResult = await cloudinaryDelete(id);

        return res.json(deletedPost);

    }
    return res.status(405).json({message: "Only DELETE method allowed."});
}