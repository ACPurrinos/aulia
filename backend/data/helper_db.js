import '../models/index.js';
import 'dotenv/config';
import { sequelize } from '../models/index.js';
import seedRoles from '../helpers/seedRoles.js';


// --- Conexión y Sincronización ---
export const startDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('---');
        console.log('Conexión exitosa a PostgreSQL.');

        // Usamos alter: true para proteger tus datos de aquí en adelante
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados.');

        // Ejecutamos la función de carga inicial
        await seedRoles();

        const [results] = await sequelize.query("SELECT current_database();");
        console.log(`Base de Datos Activa: ${results[0].current_database}`);
        console.log('---');
    } catch (error) {
        console.error(error);
    }
};

