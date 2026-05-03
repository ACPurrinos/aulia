import 'dotenv/config';
import express from 'express';
import sequelize from './config/db.js';

// --- 1. Importación de Modelos ---
// En ES Modules es obligatorio agregar el .js en rutas locales
import User from './models/User.js';
import Role from './models/Role.js';
import Student from './models/Student.js';
import FamilyMember from './models/FamilyMember.js';
import CheckIn from './models/CheckIn.js';
import Referral from './models/Referral.js';
import CaseFile from './models/CaseFile.js';
import Intervention from './models/Intervention.js';
import Alert from './models/Alert.js';
import Document from './models/Document.js';
import Subject from './models/Subject.js';
import Course from './models/Course.js';

const app = express();

// --- 2. Middleware ---
app.use(express.json());

// --- 3. Definición de Relaciones (Associations) ---
Role.hasMany(User);
User.belongsTo(Role);

Course.hasMany(Student);
Student.belongsTo(Course);
Student.hasMany(FamilyMember);
FamilyMember.belongsTo(Student);

Student.hasMany(CheckIn);
CheckIn.belongsTo(Student);
Course.hasMany(CheckIn); 
CheckIn.belongsTo(Course);
Student.hasMany(Alert);
Alert.belongsTo(Student);

User.hasMany(Referral);
Referral.belongsTo(User);
Student.hasMany(Referral);
Referral.belongsTo(Student);

Student.hasMany(CaseFile);
CaseFile.belongsTo(Student);
CaseFile.hasMany(Intervention);
Intervention.belongsTo(CaseFile);
User.hasMany(Intervention);
Intervention.belongsTo(User);

Student.hasMany(Document);
Document.belongsTo(Student);
Intervention.hasMany(Document);
Document.belongsTo(Intervention);

const TeacherAssignment = sequelize.define('TeacherAssignment', {}, { timestamps: false });
User.belongsToMany(Subject, { through: TeacherAssignment });
Subject.belongsToMany(User, { through: TeacherAssignment });
User.belongsToMany(Course, { through: TeacherAssignment });
Course.belongsToMany(User, { through: TeacherAssignment });
Subject.belongsToMany(Course, { through: TeacherAssignment });
Course.belongsToMany(Subject, { through: TeacherAssignment });

// --- 4. Función de Semillado (Seed) usando el modelo Role ---
const seedRoles = async () => {
  try {
    // Verificamos si ya existen registros para no duplicar
    const rolesCount = await Role.count(); 
    if (rolesCount === 0) {
      await Role.bulkCreate([
        { name: 'Admin' },
        { name: 'Gabinete' },
        { name: 'Preceptor' },
        { name: 'Docente' },
        { name: 'Directivo' }
      ]);
      console.log('🌱 Roles iniciales creados con éxito.');
    }
  } catch (error) {
    console.error('❌ Error al sembrar roles:', error.message);
  }
};

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
  } catch (error) {
    console.error('❌ ERROR AL INICIAR LA BASE DE DATOS:', error.message);
  }
};

startDatabase();

// --- 6. Rutas ---
app.get('/', (req, res) => {
  res.send('Aulia API 🚀 - Sistema de Gestión Escolar listo.');
});

// --- 7. Lanzamiento ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Aulia corriendo en http://localhost:${PORT}`);
});