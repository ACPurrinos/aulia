import { Role } from '../models/index.js';

const seedRoles = async () => {
  try {
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

export default seedRoles;