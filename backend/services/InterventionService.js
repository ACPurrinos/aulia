import InterventionRepository from '../repositories/InterventionRepository.js';
import CaseFileRepository from '../repositories/CaseFileRepository.js';

class InterventionService {

  // CREAR intervención
  async createIntervention(data, userId) {

    try {

      // VALIDACIONES BÁSICAS (negocio)
      if (!data.caseFileId) {
        throw new Error('CaseFileId is required');
      }

      if (!data.type) {
        throw new Error('Intervention type is required');
      }

      if (!data.description || data.description.trim().length === 0) {
        throw new Error('Description is required');
      }

      // verificar que el legajo exista
      const caseFile = await CaseFileRepository.findById(data.caseFileId);

      if (!caseFile) {
        throw new Error('CaseFile not found');
      }

      // crear intervención
      const intervention = await InterventionRepository.create({
        ...data,
        professionalId: userId
      });

      return intervention;

    } catch (error) {
      throw new Error(`Error creating intervention: ${error.message}`);
    }
  }

  // OBTENER por ID (detalle completo)
  async getById(id) {

    try {

      const intervention = await InterventionRepository.findById(id);

      if (!intervention) {
        throw new Error('Intervention not found');
      }

      return intervention;

    } catch (error) {
      throw new Error(`Error fetching intervention: ${error.message}`);
    }
  }

  // LISTAR por CaseFile
  async getByCaseFile(caseFileId) {

    try {

      if (!caseFileId) {
        throw new Error('CaseFileId is required');
      }

      return await InterventionRepository.findByCaseFileId(caseFileId);

    } catch (error) {
      throw new Error(`Error fetching interventions: ${error.message}`);
    }
  }

  async getByStudent(studentId) {
  const caseFile = await CaseFileRepository.getByStudentId(studentId);

  if (!caseFile) {
    throw new Error('CaseFile not found for student');
  }

  return await InterventionRepository.findByCaseFileId(caseFile.id);
}

  // LISTAR por profesional
  async getByProfessional(userId) {

    try {

      if (!userId) {
        throw new Error('UserId is required');
      }

      return await InterventionRepository.findByProfessionalId(userId);

    } catch (error) {
      throw new Error(`Error fetching professional interventions: ${error.message}`);
    }
  }
}

export default new InterventionService();