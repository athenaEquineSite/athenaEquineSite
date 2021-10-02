import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const isVerified = await verify(req.cookies.auth, process.env.JWT_SECRET);

    if(isVerified) {
        return await fn(req,res);
    }
        return res.status(401).json({message: `You're not authenticated`});
}