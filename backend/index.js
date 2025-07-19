import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import entryRoutes from './routes/entries.js';

dotenv.config();

const app = express();
app.use(cors());    
app.use(express.json());

app.use('/api/entries', entryRoutes);

// MongoDB connection and server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB error:', err));
