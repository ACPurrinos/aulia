import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
   
    define: {
      freezeTableName: true // Evita la pluralización automática (ej: Role se queda como Role)
    }
  }
);

export default sequelize;