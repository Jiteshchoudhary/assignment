import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import { AppDataSource } from './config/database';
import { connectRedis } from './config/redis.config';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import analyticsRoutes from './routes/analytics.routes';


const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/task', taskRoutes);
app.use('/analytics', analyticsRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';
    res.status(status).json({ success: false, data: null, message });
});


const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("PostgreSQL Connected");
        await connectRedis();

        server.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    } catch (error) {
        console.error("❌ Startup Error:", error);
    }
};

startServer();