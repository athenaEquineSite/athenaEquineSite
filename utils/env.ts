
export const server = process.env.NODE_ENV !== 'development' ? 'https://athena-equine-site.vercel.app' : 'http://localhost:3000';
export const jwtSecret = process.env.JWT_SECRET;
export const googleKey = process.env.NEXT_PUBLIC_API_KEY;
export const mongoUri = process.env.MONGO_URI;
export const deployHookURL = process.env.NEXT_PUBLIC_DEPLOY_HOOK_URL;

//https://ahtena-aquine.herokuapp.com
