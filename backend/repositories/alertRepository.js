import Alert from '../models/Alert.js';
import Student from '../models/Student.js'; 

class AlertRepository {
  
  // 1. Crear una nueva alerta (cuando un profe o el sistema detecta algo)
  async create(alertData) {
    return await Alert.create(alertData);
  }

  // 2. Traer TODAS las alertas (útil para el panel general del gabinete)
  async getAll() {
    return await Alert.findAll({
      order: [['createdAt', 'DESC']] // Las más recientes primero
    });
  }

  // 3. Buscar una alerta puntual por su ID
  async getById(id) {
    return await Alert.findByPk(id);
  }

  // 4. Traer las alertas de un estudiante específico
  async getByStudentId(studentId) {
    return await Alert.findAll({
      where: { studentId },
      order: [['createdAt', 'DESC']]
    });
  }

  // 5. Traer solo las alertas activas/no resueltas (las urgentes para el gabinete)
  async getUnresolved() {
    return await Alert.findAll({
      where: { isResolved: false },
      order: [['priority', 'ASC'], ['createdAt', 'DESC']] // ordenadas por prioridad
    });
  }

  // 6. Actualizar una alerta 
  async update(id, updateData) {
    const alert = await Alert.findByPk(id);
    if (!alert) return null;
    return await alert.update(updateData);
  }

  // 7. Resolver una alerta 
  async resolve(id) {
    const alert = await Alert.findByPk(id);
    if (!alert) return null;
    return await alert.update({ isResolved: true });
  }
}


export default new AlertRepository();