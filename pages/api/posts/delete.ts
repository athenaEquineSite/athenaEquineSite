import { NextApiRequest, NextApiResponse } from "next";
import Post from '../../../models/Post';

export default async function deletePost(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "DELETE") {
        const id = req.body.postId;
        if(!id) throw new Error('No post to delete.');

        const deletedPost = await Post.findOneAndDelete({postId: id});
        return res.json(deletedPost);

    }
    return res.status(405).json({message: "Only DELETE method allowed."});
}