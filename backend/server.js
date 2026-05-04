import 'dotenv/config';
import app from './app.js'
import { sequelize } from './models/index.js';
import seedRoles from './seeders/seedRoles.js';


// --- 7. Lanzamiento ---
const PORT = process.env.PORT || 3000;

// --- 5. Conexión y Sincronización ---
const startDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('---');
        console.log('✅ Conexión exitosa a PostgreSQL.');

        // Usamos alter: true para proteger tus datos de aquí en adelante
        await sequelize.sync({ alter: true });
        console.log('✅ Modelos sincronizados.');

        // Ejecutamos la función de carga inicial
        await seedRoles();

        const [results] = await sequelize.query("SELECT current_database();");
        console.log(`Base de Datos Activa: ${results[0].current_database}`);
        console.log('---');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor Aulia corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ ERROR AL INICIAR LA BASE DE DATOS:', error.message);
    }
};

startDatabase();