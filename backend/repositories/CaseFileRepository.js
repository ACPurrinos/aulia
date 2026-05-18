import {
  CaseFile,
  Student,
  Course,
  Referral,
  Intervention,
  User
} from '../models/index.js';

import {
  CaseFileStatus
} from '../enums/index.js';

class CaseFileRepository {

  async create(caseFileData) {

    try {

      return await CaseFile.create(caseFileData);

    } catch (error) {

      throw new Error(
        `Error creating case file: ${error.message}`
      );
    }
  }

  async getById(id) {

    try {

      return await CaseFile.findByPk(id);

    } catch (error) {

      throw new Error(
        `Error fetching case file: ${error.message}`
      );
    }
  }

  async getByStudentId(studentId) {

    try {

      return await CaseFile.findOne({
        where: { studentId }
      });

    } catch (error) {

      throw new Error(
        `Error fetching student case file: ${error.message}`
      );
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
                attributes: [
                  'id',
                  'level',
                  'grade',
                  'division'
                ]
              }
            ]
          },

          {
            model: Intervention,

            include: [
              {
                model: User,
                attributes: [
                  'id',
                  'firstName',
                  'lastName'
                ]
              }
            ],

            separate: true,

            order: [
              ['interventionDate', 'DESC']
            ]
          }

        ]

      });

    } catch (error) {

      throw new Error(
        `Error fetching case file history: ${error.message}`
      );
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
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          }
        ],

        order: [
          ['updatedAt', 'DESC']
        ]

      });

    } catch (error) {

      throw new Error(
        `Error fetching open case files: ${error.message}`
      );
    }
  }

  async update(id, updateData) {

    try {

      const caseFile =
        await CaseFile.findByPk(id);

      if (!caseFile) {
        return null;
      }

      return await caseFile.update(updateData);

    } catch (error) {

      throw new Error(
        `Error updating case file: ${error.message}`
      );
    }
  }

  async delete(id) {

    try {

      const caseFile =
        await CaseFile.findByPk(id);

      if (!caseFile) {
        return false;
      }

      await caseFile.destroy();

      return true;

    } catch (error) {

      throw new Error(
        `Error deleting case file: ${error.message}`
      );
    }
  }
}

export default new CaseFileRepository();