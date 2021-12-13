import NextCors from 'nextjs-cors';

const withCors = async (handler) => {
    return async (req, res) => {
        await NextCors(req, res, {
            methods:['GET', 'POST', 'DELETE', 'PATCH'],
            origin: 'https://stadninanxt.vercel.app',
            optionSuccessStatus: 200
        });
    
        res.json({message: 'All good'});
    }
}

export default withCors;