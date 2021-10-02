import { NextApiRequest, NextApiResponse } from "next";
import Post from '../../../models/Post';
import dbConnect from "../../../utils/dbConnect";
import { PostModel } from '../../../models/postModel';

export default async function addPost(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        await dbConnect();

        const { title, body } = req.body;
        
        if(title.length === 0) throw new Error("Title cannot be empty.");
        if(body.length === 0) throw new Error("Body cannot be empty.");

        const newPost = new PostModel(title, body).showPost();

        const postToDb = await Post.create(newPost);

        res.status(200).json(postToDb);
    }
    return res.status(405).json({message: "Only POST method accepted."});
}