import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config({ path: `./.env` })

const mongoDB = process.env.MONGODB_URL;

export const dbConnect = async () => {
    try {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB successfully!');
    } catch (err) {
        throw err;
    }

    mongoose.connection.on('disconnected', () => {
        console.log('Mongo DB Disconnected!');
    });
    mongoose.connection.on('connected', () => {
        console.log('Mongo DB Connected!');
    });
}