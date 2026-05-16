import { Intervention, CaseFile, Student, User, Document, Alert } from '../models/index.js';

class InterventionRepository {

  // 1. Registrar una nueva intervención del gabinete
  async create(interventionData) {
    return await Intervention.create(interventionData);
  }

  // 2. Buscar una intervención específica con todo su detalle
  // (Útil si la psicopedagoga quiere ver el acta/informe detallado de una reunión puntual)
  async getById(id) {
    return await Intervention.findByPk(id, {
      include: [
        { 
          model: User, 
          attributes: ['id', 'firstName', 'lastName'] // El profesional que intervino
        },
        { 
          model: Document, 
          attributes: ['id', 'name', 'fileUrl'] // Los informes o actas firmadas adjuntas
        },
        {
          model: Alert,
          attributes: ['id', 'type', 'description'] // Alertas asociadas a esta acción
        }
      ]
    });
  }

  // 3. Traer todas las intervenciones realizadas dentro de un legajo (orden cronológico)
  async getByCaseFileId(caseFileId) {
    return await Intervention.findAll({
      where: { caseFileId },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] }
      ],
      order: [['interventionDate', 'DESC'], ['createdAt', 'DESC']] // Las más recientes primero
    });
  }

  // 4. Traer las intervenciones hechas por un profesional específico
  // (Sirve para que cada psicopedagoga vea su propia agenda o bitácora de trabajo)
  async getByProfessionalId(professionalId) {
    return await Intervention.findAll({
      where: { professionalId },
      include: [
        { 
          model: CaseFile, 
          include: [{ model: Student, attributes: ['id', 'firstName', 'lastName'] }] 
        }
      ],
      order: [['interventionDate', 'DESC']]
    });
  }

  // 5. Modificar una intervención (por ejemplo, ampliar la descripción o conclusiones del acta)
  async update(id, updateData) {
    const intervention = await Intervention.findByPk(id);
    if (!intervention) return null;
    return await intervention.update(updateData);
  }

  // 6. Eliminar un registro de intervención
  async delete(id) {
    const intervention = await Intervention.findByPk(id);
    if (!intervention) return false;
    await intervention.destroy();
    return true;
  }
}

export default new InterventionRepository();