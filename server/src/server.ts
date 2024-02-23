import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import connectDB from './lib/db/db';
import userRouter from './router/userRouter';


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const port = 3000 || process.env.PORT;

app.use('/api/users/', userRouter);

const dbURI = process.env.MONGO_ALTAS_URL;

if (!dbURI) {
    throw new Error('MongoDB URI is not defined');
}

// Define an async function to connect to the database
const connectToDatabase = async () => {
    try {
        await connectDB(dbURI);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
};

// Connect to the database
connectToDatabase();

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});