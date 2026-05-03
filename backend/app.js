import express from 'express';

const app = express();

app.use(express.json());

// --- 6. Rutas ---
app.get('/', (req, res) => {
  res.send('Aulia API 🚀 - Sistema de Gestión Escolar listo.');
});

export default app;