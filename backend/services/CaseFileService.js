import sequelize from '../data/db.js';

import CaseFileRepository from '../repositories/CaseFileRepository.js';
import StudentRepository from '../repositories/StudentRepository.js';
import { CaseFileStatus } from '../enums/index.js';

class CaseFileService {

  // crear legajo manual (si lo necesitás)
  async createCaseFile(studentId, options = {}) {
  const t = options.transaction || await sequelize.transaction();

  const isExternalTransaction = !!options.transaction;

  try {
    const student =
        await StudentRepository.findStudentById(
          studentId
        );
        if (!student) {
        throw new Error('Student not found');
      }
    const existing = await CaseFileRepository.getByStudentId(
      studentId,
      { transaction: t }
    );

    if (existing) {
      throw new Error('CaseFile already exists for this student');
    }

    const caseFile = await CaseFileRepository.create(
      {
        studentId,
        status: CaseFileStatus.OPEN
      },
      { transaction: t }
    );

    if (!isExternalTransaction) {
      await t.commit();
    }

    return caseFile;

  } catch (error) {
    if (!isExternalTransaction) {
      await t.rollback();
    }
    throw new Error(`Error creating case file: ${error.message}`);
  }
}

  // obtener o crear 
  async getOrCreateByStudent(studentId, options = {}) {
  try {
    const student =
        await StudentRepository.findStudentById(
          studentId
        );

      if (!student) {
        throw new Error('Student not found');
      }
    let caseFile = await CaseFileRepository.getByStudentId(
      studentId,
      options
    );

    if (!caseFile) {
      caseFile = await CaseFileRepository.create(
        {
          studentId,
          status: CaseFileStatus.OPEN
        },
        options
      );
    }

    return caseFile;

  } catch (error) {
    throw new Error(`Error getting/creating case file: ${error.message}`);
  }
}

  // reabrir legajo
  async reopenCaseFile(caseFileId, userId) {
    try {
      const caseFile = await CaseFileRepository.findById(caseFileId);
      if (!caseFile) {
        throw new Error('CaseFile not found');
      }

      if (caseFile.status === CaseFileStatus.OPEN) {
        return caseFile;
      }

      return await CaseFileRepository.update(caseFileId, {
        status: CaseFileStatus.OPEN
      });
    } catch (error) {
      throw new Error(`Error reopening case file: ${error.message}`);
    }
  }

  // cerrar legajo
  async closeCaseFile(caseFileId) {
    try {
      const caseFile = await CaseFileRepository.findById(caseFileId);

      if (!caseFile) {
        throw new Error('CaseFile not found');
      }
      return await CaseFileRepository.update(caseFileId, {
        status: CaseFileStatus.CLOSED
      });

    } catch (error) {
      throw new Error(`Error closing case file: ${error.message}`);
    }
  }

   async getById(id) {

    try {
      const caseFile =
        await CaseFileRepository.findById(id);
      if (!caseFile) {
        throw new Error('CaseFile not found');
      }
      return caseFile;
    } catch (error) {
      throw new Error(
        `Error fetching case file: ${error.message}`
      );
    }
  }}

export default new CaseFileService();