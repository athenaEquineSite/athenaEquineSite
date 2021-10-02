import { NextApiRequest, NextApiResponse } from "next";
import Post from '../../../models/Post';
import dbConnect from '../../../utils/dbConnect';


export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        await dbConnect();

        const posts = await Post.find({});
        return res.status(200).json(posts);
    }
    return res.status(405).json({message: 'Only GET request accepted.'})
}