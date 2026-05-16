import { CaseFile, Student, Referral, Intervention, Course } from '../models/index.js';

class CaseFileRepository {
  
  // 1. Abrir un nuevo legajo (cuando el gabinete acepta una derivación)
  async create(caseFileData) {
    return await CaseFile.create(caseFileData);
  }

  // 2. Traer un legajo COMPLETO con toda la información histórica
  async getFullHistoryById(id) {
    return await CaseFile.findByPk(id, {
      include: [
        { 
          model: Student, 
          attributes: ['id', 'firstName', 'lastName', 'birthDate'],
          include: [{ model: Course, attributes: ['level', 'grade', 'division'] }]
        },
        { 
          model: Referral, 
          attributes: ['id', 'category', 'description', 'status'] 
        },
        { 
          model: Intervention,
          // Ordenamos las intervenciones de la más nueva a la más vieja
          separate: true, 
          order: [['interventionDate', 'DESC']]
        }
      ]
    });
  }

  // 3. Traer todos los legajistas abiertos (para el panel de control del gabinete)
  async getAllOpen() {
    return await CaseFile.findAll({
      where: { status: 'Abierto' }, // Usando el valor de su CaseFileStatus enum
      include: [
        { model: Student, attributes: ['id', 'firstName', 'lastName'] }
      ],
      order: [['priority', 'ASC'], ['updatedAt', 'DESC']] // Primero los de prioridad Alta
    });
  }

  // 4. Buscar si un estudiante ya tiene un legajo abierto
  // Evita que abran dos carpetas para el mismo alumno al mismo tiempo
  async getOpenByStudentId(studentId) {
    return await CaseFile.findOne({
      where: { 
        studentId, 
        status: 'Abierto' 
      }
    });
  }

  // 5. Actualizar el legajo (por ejemplo, cambiar la prioridad de Media a Alta)
  async update(id, updateData) {
    const caseFile = await CaseFile.findByPk(id);
    if (!caseFile) return null;
    return await caseFile.update(updateData);
  }

  // 6. Cerrar el legajo (cuando se finaliza el acompañamiento del alumno)
  async closeCase(id) {
    const caseFile = await CaseFile.findByPk(id);
    if (!caseFile) return null;
    return await caseFile.update({ status: 'Cerrado' });
  }
}

export default new CaseFileRepository();