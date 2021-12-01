import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/Post';

export default async function getPost(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        await dbConnect();
        const { id } = req.query;
        const searchedPost = await Post.findOne({postId: id});
        console.log('Post in api:'+ searchedPost)
        return res.json(searchedPost);
    }
    return res.status(405).json({message: "Only GET method accepted."})
}