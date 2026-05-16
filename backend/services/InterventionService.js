import InterventionRepository from '../repositories/InterventionRepository.js';
import CaseFileRepository from '../repositories/CaseFileRepository.js';

class InterventionService {

  async registerIntervention(interventionData) {
    // Verificamos que el legajo exista y esté abierto antes de actuar
    const caseFile = await CaseFileRepository.getFullHistoryById(interventionData.caseFileId);
    if (!caseFile) {
      throw new Error('No se puede registrar la intervención porque el legajo no existe.');
    }
    if (caseFile.status === 'Cerrado') {
      throw new Error('No se pueden agregar intervenciones a un legajo cerrado.');
    }

    return await InterventionRepository.create(interventionData);
  }

  // Traer la bitácora de intervenciones de un legajo
  async getInterventionsByCase(caseFileId) {
    return await InterventionRepository.getByCaseFileId(caseFileId);
  }
}

export default new InterventionService();