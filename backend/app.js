import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import { startDatabase } from './data/helper_db.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import teacherAssignmentRoutes from './routes/teacherAssignmentRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import checkInRoutes from './routes/checkInRoutes.js';
import authRoutes from './routes/autRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import interventionRoutes from './routes/interventionsRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import caseFileRoutes from './routes/caseFileRoutes.js';
import referralHistoryRoutes from './routes/referralHistoryRoutes.js';
import referralMessageRoutes from './routes/referralMessageRoutes.js';

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

app.use((req, res, next) => {
  req.user = { id: 2 };
  next();
});

// --- Rutas ---
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: "Welcome to the API" 
  });
});

app.use('/api/login', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/assignment', teacherAssignmentRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/checkIn', checkInRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/interventions', interventionRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/casefiles', caseFileRoutes);
app.use('/api/referral-history', referralHistoryRoutes);
app.use('/api/referrals', referralMessageRoutes);


app.listen(PORT, async () => {  
  try {
    await startDatabase();
    console.log(`Aulia corriendo en http://localhost:${PORT}`);
  } 
  catch (error) { 
    console.error('Error al iniciar el servidor: ', error);
  }
});


