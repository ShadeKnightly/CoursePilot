import express from 'express';
//import routes from './routes'
import config from './config/config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { poolPromise } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://127.0.0.1:5000', 'http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
}));
app.use('/course/auth', courseRoutes);
app.use('/user/auth', userRoutes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

