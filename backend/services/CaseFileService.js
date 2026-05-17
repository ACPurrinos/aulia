import CaseFileRepository from '../repositories/CaseFileRepository.js';

import {
  CaseFileStatus,
  CaseFilePriority
} from '../enums/index.js';

class CaseFileService {

  async openCaseFile(caseFileData) {

    try {

      const existingCase =
        await CaseFileRepository.getOpenByStudentId(
          caseFileData.studentId
        );

      if (existingCase) {
        throw new Error(
          'El estudiante ya tiene un legajo abierto.'
        );
      }

      return await CaseFileRepository.create({
        ...caseFileData,
        status: CaseFileStatus.OPEN,
        priority:
          caseFileData.priority ||
          CaseFilePriority.MEDIUM
      });

    } catch (error) {
      throw new Error(`Error opening case file: ${error.message}`);
    }
  }

  async getCaseHistory(id) {

    try {

      const caseFile =
        await CaseFileRepository.getFullHistoryById(id);

      if (!caseFile) {
        throw new Error('Legajo no encontrado.');
      }

      return caseFile;

    } catch (error) {
      throw new Error(`Error fetching history: ${error.message}`);
    }
  }

  async closeCase(id) {

    try {

      const closedCase =
        await CaseFileRepository.closeCase(id);

      if (!closedCase) {
        throw new Error('No se pudo cerrar el legajo.');
      }

      return closedCase;

    } catch (error) {
      throw new Error(`Error closing case file: ${error.message}`);
    }
  }

  async updatePriority(id, priority) {

    try {

      const updatedCase =
        await CaseFileRepository.update(id, {
          priority
        });

      if (!updatedCase) {
        throw new Error('Legajo no encontrado.');
      }

      return updatedCase;

    } catch (error) {
      throw new Error(`Error updating priority: ${error.message}`);
    }
  }
}

export default new CaseFileService();