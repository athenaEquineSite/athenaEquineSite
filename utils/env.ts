//import dotenv from 'dotenv';
//dotenv.config();


export const server = process.env.NODE_ENV !== 'development' ? 'https://stadninanxt.vercel.app' : 'http://localhost:3000';
export const jwtSecret = process.env.JWT_SECRET;
export const mongoUri = process.env.MONGO_URI;