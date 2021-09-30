import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.auth!, process.env.JWT_SECRET, async (err, decoded) => {
        if(!err && decoded) {
            return await fn(req,res);
        }

        return res.status(401).json({message: `You're not authenticated`});
    })
    
}