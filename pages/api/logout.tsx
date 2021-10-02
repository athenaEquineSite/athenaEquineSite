import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

export default  async function logOut(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        res.setHeader('Set-Cookie', cookie.serialize('auth', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: -1,
            path: '/'
          }));
        res.end();
    }
    else {
        res.status(405).json({ message: 'Not a POST method, only POST method supported.' });
    }
}