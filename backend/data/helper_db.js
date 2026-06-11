import '../models/index.js';
import 'dotenv/config';
import { sequelize } from '../models/index.js';
import seedRoles from '../helpers/seedRoles.js';

const isProduction = process.env.NODE_ENV === 'production';

export const startDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('---');
        console.log('Conexión exitosa a PostgreSQL.');

        // Si no es entorno de producción sincronizamos y hacemos el semillado
        if (!isProduction) {
            console.log('Modo Desarrollo: Sincronizando modelos...');
            await sequelize.sync({ alter: true });
            console.log('Modelos sincronizados.');
            await seedRoles();
        } else {
            console.log('Modo Producción: Sincronización automática desactivada. Usa migraciones si es necesario.');
        }

        // 3. Mostrar base de datos activa
        const [results] = await sequelize.query("SELECT current_database();");
        console.log(`Base de Datos Activa: ${results[0].current_database}`);
        
    } catch (error) {
        console.error('Error crítico en la base de datos:', error);
        if (isProduction) {
            throw error; 
        }
    }
};
