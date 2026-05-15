import { Role } from '../models/index.js';
import { UserRoles } from '../constants/index.js'; // Traemos las constantes

const seedRoles = async () => {
  try {
    const rolesCount = await Role.count();

    if (rolesCount === 0) {
      // Object.values(UserRoles) convierte tu objeto en un array: 
      // ['Admin', 'Gabinete', 'Preceptor', ...]
      const rolesToCreate = Object.values(UserRoles).map(roleName => ({
        name: roleName
      }));

      // Ahora bulkCreate recibe la lista automática
      await Role.bulkCreate(rolesToCreate);

      console.log('✅ Roles iniciales creados con éxito desde las constantes.');
    }
  } catch (error) {
    console.error('❌ Error al sembrar roles:', error.message);
  }
};

export default seedRoles;