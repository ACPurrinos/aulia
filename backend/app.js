import express from 'express';
import { startDatabase } from './data/helper_db.js'

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// --- Rutas ---
app.get('/', (req, res) => {
  res.send('Aulia API 🚀 - Sistema de Gestión Escolar listo.');
});

app.listen(PORT, async () => {  
  try {
    await startDatabase();
    console.log(`🚀 Servidor Aulia corriendo en http://localhost:${PORT}`);
  } 
  catch (error) { 
    console.error('Error al iniciar el servidor: ', error);
  }
});


