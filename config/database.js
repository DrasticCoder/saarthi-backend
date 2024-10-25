import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        console.log(`🛢️  Mongodb connected with ${connection.host} 🛢️`);
    } catch (error) {
        console.log('Failed to connect with DB', error);
    }
}