import InterventionRepository from '../repositories/InterventionRepository.js';
import CaseFileRepository from '../repositories/CaseFileRepository.js';

class InterventionService {

  // Registrar intervención
  async registerIntervention(interventionData) {

    if (!interventionData.caseFileId) {
      throw new Error('El legajo es obligatorio.');
    }

    if (!interventionData.professionalId) {
      throw new Error('El profesional es obligatorio.');
    }

    if (!interventionData.description) {
      throw new Error('La descripción es obligatoria.');
    }

    // Verificamos que exista el legajo
    const caseFile = await CaseFileRepository.getById(
      interventionData.caseFileId
    );

    if (!caseFile) {
      throw new Error('El legajo no existe.');
    }

    // Verificamos que esté abierto
    if (caseFile.status === 'Cerrado') {
      throw new Error(
        'No se pueden registrar intervenciones en un legajo cerrado.'
      );
    }

    return await InterventionRepository.create(interventionData);
  }

  // Obtener intervención por ID
  async getInterventionById(id) {

    const intervention = await InterventionRepository.getById(id);

    if (!intervention) {
      throw new Error('Intervención no encontrada.');
    }

    return intervention;
  }

  // Obtener intervenciones de un legajo
  async getCaseInterventions(caseFileId) {

    return await InterventionRepository.getByCaseFileId(caseFileId);
  }

  // Obtener intervenciones de un profesional
  async getProfessionalInterventions(professionalId) {

    return await InterventionRepository.getByProfessionalId(professionalId);
  }

  // Actualizar intervención
  async updateIntervention(id, updateData) {

    const updatedIntervention = await InterventionRepository.update(
      id,
      updateData
    );

    if (!updatedIntervention) {
      throw new Error('No se pudo actualizar la intervención.');
    }

    return updatedIntervention;
  }

  // Eliminar intervención
  async deleteIntervention(id) {

    const deleted = await InterventionRepository.delete(id);

    if (!deleted) {
      throw new Error('Intervención no encontrada.');
    }

    return {
      success: true,
      message: 'Intervención eliminada correctamente.'
    };
  }
}

export default new InterventionService();