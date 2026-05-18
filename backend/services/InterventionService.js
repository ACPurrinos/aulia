// services/InterventionService.js

import InterventionRepository from '../repositories/InterventionRepository.js';
import CaseFileRepository from '../repositories/CaseFileRepository.js';

import {
  CaseFileStatus
} from '../enums/index.js';

class InterventionService {

  async registerIntervention(interventionData) {

    try {

      if (!interventionData.caseFileId) {
        throw new Error('El legajo es obligatorio.');
      }

      if (!interventionData.professionalId) {
        throw new Error('El profesional es obligatorio.');
      }

      if (!interventionData.type) {
        throw new Error('El tipo de intervención es obligatorio.');
      }

      if (!interventionData.description) {
        throw new Error('La descripción es obligatoria.');
      }

      const caseFile = await CaseFileRepository.getById(
        interventionData.caseFileId
      );

      if (!caseFile) {
        throw new Error('El legajo no existe.');
      }

      if (caseFile.status === CaseFileStatus.CLOSED) {
        throw new Error(
          'No se pueden registrar intervenciones en un legajo cerrado.'
        );
      }

      return await InterventionRepository.create(interventionData);

    } catch (error) {

      throw new Error(`Error registering intervention: ${error.message}`);
    }
  }

  async getInterventionById(id) {

    try {

      const intervention = await InterventionRepository.getById(id);

      if (!intervention) {
        throw new Error('Intervención no encontrada.');
      }

      return intervention;

    } catch (error) {

      throw new Error(`Error fetching intervention: ${error.message}`);
    }
  }

  async getCaseInterventions(caseFileId) {

    try {

      return await InterventionRepository.getByCaseFileId(caseFileId);

    } catch (error) {

      throw new Error(`Error fetching case interventions: ${error.message}`);
    }
  }

  async getProfessionalInterventions(professionalId) {

    try {

      return await InterventionRepository.getByProfessionalId(professionalId);

    } catch (error) {

      throw new Error(`Error fetching professional interventions: ${error.message}`);
    }
  }

  async updateIntervention(id, updateData) {

    try {

      const updatedIntervention =
        await InterventionRepository.update(
          id,
          updateData
        );

      if (!updatedIntervention) {
        throw new Error('No se pudo actualizar la intervención.');
      }

      return updatedIntervention;

    } catch (error) {

      throw new Error(`Error updating intervention: ${error.message}`);
    }
  }

  async deleteIntervention(id) {

    try {

      const deleted = await InterventionRepository.delete(id);

      if (!deleted) {
        throw new Error('Intervención no encontrada.');
      }

      return {
        success: true,
        message: 'Intervención eliminada correctamente.'
      };

    } catch (error) {

      throw new Error(`Error deleting intervention: ${error.message}`);
    }
  }
}

export default new InterventionService();