import { connect } from 'mongoose';


let uri = process.env.MONGO_URI

let cachedClient = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

const dbConnect = async () => {
/*
    try {
        await connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('MongoDB connected.');
    }
    catch(err) {
        console.log(err.message);
    }
    */

    if (cachedClient) {
        console.log('Cashed connection')
        return cachedClient 
      }
    
      const client = await connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        
      cachedClient = client
    
      return client
}

export default dbConnect;