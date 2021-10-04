import { connect } from 'mongoose';

let uri = process.env.MONGO_URI

let cachedClient = null;


const dbConnect = async () => {
  /*
  if(cachedClient.conn) return cachedClient.conn
  if(!cachedClient.promise) {
    const conn: any = {}
    const opts = {
      useNewUrlParser: true,
      useInifiedTopology: true
    }
    cachedClient.promise = connect(uri)
      .then((client) => {
        conn.client = client;
        cachedClient.conn = conn;
      })
  }  
  await cachedClient.promise
  return cachedClient.conn;
  */
  if (cachedClient) {
        console.log('Already connected')
        return cachedClient 
      }
    
      const client = await connect(uri);
        
      cachedClient = client
      return client
      
}

export default dbConnect;