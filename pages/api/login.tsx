import { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors';
import dbConnect from "../../utils/dbConnect"
import User from '../../models/User';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';
import { jwtSecret } from '../../utils/env';

async function login(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods:['GET', 'POST', 'DELETE', 'PATCH'],
    origin: '*',
    optionSuccessStatus: 200
});

  if (req.method === 'POST') {
    await dbConnect();
    const { username, password } = req.body;
    
    if(username === null || undefined) return res.status(404).json({ message: "You need to pass a username." });
    if(password === null || undefined) return res.status(404).json({message: 'No password, pass the password.'});

    const searchedUser = await User.findOne({ username });
    console.log(searchedUser)

    if (!searchedUser) return res.status(404).json({ message: "No such user." });

    const match = await compare(password, searchedUser.password);
    console.log(match)

    if (match) {
      const claims = { sub: searchedUser.userId }
      const jwt = sign(claims, jwtSecret, { expiresIn: '1h' });

      res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'none',
        maxAge: 3600,
        path: '/'
      }));

      return res.status(201).json({match});

    } else return res.status(405).json({ message: "Something went wrong." });
  }
  else {
    res.status(405).json({ message: 'Not a POST method, only POST method supported.' });
  }
}

export default login;