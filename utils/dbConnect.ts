import { connect } from 'mongoose';

const dbConnect = async () => {

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
}

export default dbConnect;