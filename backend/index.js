import app from './app.js';
import { startDatabase } from './data/helper_db.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await startDatabase();
        console.log(`Aulia corriendo en http://localhost:${PORT}`);
    }
    catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
});