import { FamilyMember, Student } from '../models/index.js';

class FamilyMemberRepository {

  // 1. Vincular un nuevo familiar a un estudiante
  async create(familyMemberData) {
    return await FamilyMember.create(familyMemberData);
  }

  // 2. Traer todos los familiares asociados a un alumno específico
  //  para armar la sección "Grupo Familiar" en la ficha del alumno
  async getByStudentId(studentId) {
    return await FamilyMember.findAll({
      where: { studentId },
      order: [
        // Podríamos priorizar que los Tutores Legales salgan primero en la lista
        ['relationship', 'ASC'], 
        ['lastName', 'ASC']
      ]
    });
  }

  // 3. Buscar un familiar específico por su ID (para editar su teléfono o email)
  async getById(id) {
    return await FamilyMember.findByPk(id);
  }

  // 4. Actualizar los datos de contacto de un familiar
  async update(id, updateData) {
    const familyMember = await FamilyMember.findByPk(id);
    if (!familyMember) return null;
    return await familyMember.update(updateData);
  }

  // 5. Eliminar un familiar del registro de un alumno
  async delete(id) {
    const familyMember = await FamilyMember.findByPk(id);
    if (!familyMember) return false;
    await familyMember.destroy();
    return true;
  }
}

export default new FamilyMemberRepository();