import { NextApiRequest, NextApiResponse } from "next";
import Post from '../../../models/Post';

export default async function updatePost(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "PATCH") {
        const dataToUpdate = req.body;
        const { postId, eng, nor } = dataToUpdate;
        if(!postId) throw new Error("No post to update.");
        const updatePost = await Post.findOneAndUpdate({postId: postId}, {
            eng: {
                title: eng.title,
                postBody: eng.postBody
            },
            nor: {
                title: nor.title,
                postBody: nor.postBody
            }
        });
        return res.status(200).json(updatePost);
    }
    return res.status(405).json({message: "Only PATCH method allowed."});
}