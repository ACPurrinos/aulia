import CaseFileRepository
  from '../repositories/CaseFileRepository.js';

import {
  CaseFileStatus
} from '../enums/index.js';

class CaseFileService {

  async createCaseFile(caseFileData) {

    try {

      const existingCaseFile =
        await CaseFileRepository.getByStudentId(
          caseFileData.studentId
        );

      if (existingCaseFile) {
        throw new Error(
          'El alumno ya posee un legajo.'
        );
      }

      return await CaseFileRepository.create(
        caseFileData
      );

    } catch (error) {

      throw new Error(
        `Error creating case file: ${error.message}`
      );
    }
  }

  async getCaseFileById(id) {

    try {

      const caseFile =
        await CaseFileRepository.getById(id);

      if (!caseFile) {
        throw new Error(
          'Legajo no encontrado.'
        );
      }

      return caseFile;

    } catch (error) {

      throw new Error(
        `Error fetching case file: ${error.message}`
      );
    }
  }

  async getStudentCaseFile(studentId) {

    try {

      const caseFile =
        await CaseFileRepository.getByStudentId(
          studentId
        );

      if (!caseFile) {
        throw new Error(
          'El alumno no posee legajo.'
        );
      }

      return caseFile;

    } catch (error) {

      throw new Error(
        `Error fetching student case file: ${error.message}`
      );
    }
  }

  async getCaseFileHistory(id) {

    try {

      const caseFile =
        await CaseFileRepository.getFullHistoryById(id);

      if (!caseFile) {
        throw new Error(
          'Legajo no encontrado.'
        );
      }

      return caseFile;

    } catch (error) {

      throw new Error(
        `Error fetching case history: ${error.message}`
      );
    }
  }

  async getOpenCaseFiles() {

    try {

      return await CaseFileRepository.getAllOpen();

    } catch (error) {

      throw new Error(
        `Error fetching open case files: ${error.message}`
      );
    }
  }

  async updateCaseFile(id, updateData) {

    try {

      const updatedCaseFile =
        await CaseFileRepository.update(
          id,
          updateData
        );

      if (!updatedCaseFile) {
        throw new Error(
          'No se pudo actualizar el legajo.'
        );
      }

      return updatedCaseFile;

    } catch (error) {

      throw new Error(
        `Error updating case file: ${error.message}`
      );
    }
  }

  async closeCaseFile(id) {

    try {

      const caseFile =
        await CaseFileRepository.getById(id);

      if (!caseFile) {
        throw new Error(
          'Legajo no encontrado.'
        );
      }

      if (
        caseFile.status ===
        CaseFileStatus.CLOSED
      ) {
        throw new Error(
          'El legajo ya está cerrado.'
        );
      }

      return await CaseFileRepository.update(
        id,
        {
          status: CaseFileStatus.CLOSED
        }
      );

    } catch (error) {

      throw new Error(
        `Error closing case file: ${error.message}`
      );
    }
  }

  async reopenCaseFile(id) {

    try {

      const caseFile =
        await CaseFileRepository.getById(id);

      if (!caseFile) {
        throw new Error(
          'Legajo no encontrado.'
        );
      }

      if (
        caseFile.status ===
        CaseFileStatus.OPEN
      ) {
        throw new Error(
          'El legajo ya está abierto.'
        );
      }

      return await CaseFileRepository.update(
        id,
        {
          status: CaseFileStatus.OPEN
        }
      );

    } catch (error) {

      throw new Error(
        `Error reopening case file: ${error.message}`
      );
    }
  }
}

export default new CaseFileService();