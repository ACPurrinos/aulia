import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import authRoutes from '../routes/autRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
    origin: 'https://aulia-frontend.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/api/login', authRoutes);

export default app;