import express from 'express';
import { startDatabase } from './data/helper_db.js'
import referralRoutes from './routes/referralRoutes.js';
import interventionRoutes from './routes/interventionsRoutes.js';
import documentRoutes from './routes/documentRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = { id: 2 };
  next();
});

// --- Rutas ---
app.get('/', (req, res) => {
  res.send('Aulia API 🚀 - Sistema de Gestión Escolar listo.');
});

app.use('/referrals', referralRoutes);
app.use('/interventions', interventionRoutes);
app.use('/documents', documentRoutes);

app.listen(PORT, async () => {  
  try {
    await startDatabase();
    console.log(`🚀 Servidor Aulia corriendo en http://localhost:${PORT}`);
  } 
  catch (error) { 
    console.error('Error al iniciar el servidor: ', error);
  }
});


