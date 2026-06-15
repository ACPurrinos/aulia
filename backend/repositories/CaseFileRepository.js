import { CaseFile, Student } from '../models/index.js';
import { Op } from 'sequelize';
import { CaseFileStatus } from '../enums/index.js';

class CaseFileRepository {

  async create(data, options) {
    try {
      return await CaseFile.create(data, options);
    } catch (error) {
      throw new Error(`Error creating case file: ${error.message}`);
    }
  }

  async findById(id, options) {
    try {
      return await CaseFile.findByPk(id, options);
    } catch (error) {
      throw new Error(`Error fetching case file: ${error.message}`);
    }
  }

  async findAll(page = 1){
        try {
            const PAGE_LIMIT = 10;

            const offset = (page - 1) * PAGE_LIMIT;
            
            return await CaseFile.findAndCountAll({
                limit: PAGE_LIMIT,
                offset: offset,
                order: [['createdAt', 'DESC']],
                where: { status: "Abierto" }
            });
        } catch (error) {
            console.log('Find Error: ', error);
            throw error;
        }      
    }

  async getByStudentId(studentId, options) {
    try {
      return await CaseFile.findOne({
        where: { studentId },
        ...options
      });
    } catch (error) {
      throw new Error(`Error fetching student case file: ${error.message}`);
    }
  }
  

  async update(id, updateData, options) {
    try {
      const caseFile = await CaseFile.findByPk(id, options);

      if (!caseFile) return null;

      return await caseFile.update(updateData, options);

    } catch (error) {
      throw new Error(`Error updating case file: ${error.message}`);
    }
  }

  async archive(id, options) {
    try {
      const caseFile = await CaseFile.findByPk(id, options);

      if (!caseFile) return false;

      await caseFile.destroy(options);

      return true;

    } catch (error) {
      throw new Error(`Error archiving case file: ${error.message}`);
    }
  }
}

export default new CaseFileRepository();