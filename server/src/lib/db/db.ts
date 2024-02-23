import mongoose from 'mongoose';



const connectDB = async (uri: string) => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected...');
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
