import { connect } from 'mongoose';

let uri = process.env.MONGO_URI

let cachedClient = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

const dbConnect = async () => {
    if (cachedClient) {
        console.log('Cashed connection')
        return cachedClient 
      }
    
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

      const client = await connect(uri);
        
      cachedClient = client
    
      return client
}

export default dbConnect;