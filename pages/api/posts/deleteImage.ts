import { NextApiRequest, NextApiResponse } from "next";
import Post from '../../../models/Post';

import { cloudinaryDelete } from '../../../utils/cloudinary';

export default async function deleteImage(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "DELETE") {
        const {postId, id } = JSON.parse(req.body);
        if(!id) throw new Error('No pic to delete.');
        if(!postId) throw new Error('No post');

        const deletedPost = await Post.findOne({postId: postId});
        deletedPost.cloudinaryId = undefined;
        deletedPost.cloudinaryUrl = undefined;
        await deletedPost.save();

        const cloudResult = await cloudinaryDelete(id);

        return res.json({message: 'Delete succesfull'});

    }
    return res.status(405).json({message: "Only DELETE method allowed."});
}