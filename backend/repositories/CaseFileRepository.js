import {
  CaseFile,
  Student,
  Referral,
  Intervention,
  Course
} from '../models/index.js';

import { CaseFileStatus } from '../enums/index.js';

class CaseFileRepository {

  async create(caseFileData) {

    try {

      return await CaseFile.create(caseFileData);

    } catch (error) {
      throw new Error(`Error creating case file: ${error.message}`);
    }
  }

  async getById(id) {

    try {

      return await CaseFile.findByPk(id);

    } catch (error) {
      throw new Error(`Error fetching case file: ${error.message}`);
    }
  }

  async getFullHistoryById(id) {

    try {

      return await CaseFile.findByPk(id, {
        include: [
          {
            model: Student,
            attributes: [
              'id',
              'firstName',
              'lastName',
              'birthDate'
            ],
            include: [
              {
                model: Course,
                attributes: ['level', 'grade', 'division']
              }
            ]
          },

          {
            model: Referral,
            attributes: [
              'id',
              'category',
              'description',
              'status'
            ]
          },

          {
            model: Intervention,
            separate: true,
            order: [['createdAt', 'DESC']]
          }
        ]
      });

    } catch (error) {
      throw new Error(`Error fetching case file history: ${error.message}`);
    }
  }

  async getAllOpen() {

    try {

      return await CaseFile.findAll({
        where: {
          status: CaseFileStatus.OPEN
        },

        include: [
          {
            model: Student,
            attributes: ['id', 'firstName', 'lastName']
          }
        ],

        order: [
          ['priority', 'DESC'],
          ['updatedAt', 'DESC']
        ]
      });

    } catch (error) {
      throw new Error(`Error fetching open case files: ${error.message}`);
    }
  }

  async getOpenByStudentId(studentId) {

    try {

      return await CaseFile.findOne({
        where: {
          studentId,
          status: CaseFileStatus.OPEN
        }
      });

    } catch (error) {
      throw new Error(`Error fetching student case file: ${error.message}`);
    }
  }

  async update(id, updateData) {

    try {

      const caseFile = await CaseFile.findByPk(id);

      if (!caseFile) return null;

      return await caseFile.update(updateData);

    } catch (error) {
      throw new Error(`Error updating case file: ${error.message}`);
    }
  }

  async closeCase(id) {

    try {

      const caseFile = await CaseFile.findByPk(id);

      if (!caseFile) return null;

      return await caseFile.update({
        status: CaseFileStatus.CLOSED
      });

    } catch (error) {
      throw new Error(`Error closing case file: ${error.message}`);
    }
  }
}

export default new CaseFileRepository();