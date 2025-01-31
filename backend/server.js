import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js'

// Load environment variables at the top
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow only specific origins

// API endpoints
app.use('/api/user', userRouter)

// Start Server
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
