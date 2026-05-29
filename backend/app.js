import express from 'express';
import { startDatabase } from './data/helper_db.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import teacherAssignmentRoutes from './routes/teacherAssignmentRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import checkInRoutes from './routes/checkInRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import interventionRoutes from './routes/interventionsRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import caseFileRoutes from './routes/caseFileRoutes.js';
import referralHistoryRoutes from './routes/referralHistoryRoutes.js';
import referralMessageRoutes from './routes/referralMessageRoutes.js';



const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = { id: 2 };
  next();
});

// --- Rutas ---
app.get('/', (req, res) => {
  res.send('Aulia API - Sistema de Gestión Escolar listo.');
});

app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/assignment', teacherAssignmentRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/checkIn', checkInRoutes);

app.use('/referrals', referralRoutes);
app.use('/interventions', interventionRoutes);
app.use('/documents', documentRoutes);
app.use('/casefiles', caseFileRoutes);
app.use('/referral-history', referralHistoryRoutes);
app.use('/referrals', referralMessageRoutes);

app.listen(PORT, async () => {  
  try {
    await startDatabase();
    console.log(`Servidor Aulia corriendo en http://localhost:${PORT}`);
  } 
  catch (error) { 
    console.error('Error al iniciar el servidor: ', error);
  }
});


