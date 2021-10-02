import { NextApiRequest, NextApiResponse } from "next";

export default async function updatePost(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "PATCH") {
        
    }
    return res.status(405).json({message: "Only PATCH method allowed."});
}