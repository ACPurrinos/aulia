// repositories/DocumentRepository.js

import {
  Document,
  Student,
  Intervention,
  User
} from '../models/index.js';

class DocumentRepository {

  async create(documentData) {

    try {

      return await Document.create(documentData);

    } catch (error) {

      throw new Error(`Error creating document: ${error.message}`);
    }
  }

  async getById(id) {

    try {

      return await Document.findByPk(id, {
        include: [
          {
            model: Student,
            attributes: ['id'],
            include: [
              {
                model: User,
                attributes: [
                  'id',
                  'firstName',
                  'lastName'
                ]
              }
            ]
          },
          {
            model: Intervention,
            required: false
          },
          {
            model: User,
            as: 'uploader',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          }
        ]
      });

    } catch (error) {

      throw new Error(`Error fetching document: ${error.message}`);
    }
  }

  async getByStudentId(studentId) {

    try {

      return await Document.findAll({
        where: {
          studentId
        },
        include: [
          {
            model: User,
            as: 'uploader', // --> Andi!!! revisar alias
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          }
        ],
        order: [
          ['documentDate', 'DESC'],
          ['createdAt', 'DESC']
        ]
      });

    } catch (error) {

      throw new Error(`Error fetching student documents: ${error.message}`);
    }
  }

  async getByInterventionId(interventionId) {

    try {

      return await Document.findAll({
        where: {
          interventionId
        },
        include: [
          {
            model: User,
            as: 'uploader', // acá también
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          }
        ],
        order: [
          ['createdAt', 'DESC']
        ]
      });

    } catch (error) {

      throw new Error(`Error fetching intervention documents: ${error.message}`);
    }
  }

  async update(id, updateData) {

    try {

      const document = await Document.findByPk(id);

      if (!document) {
        return null;
      }

      return await document.update(updateData);

    } catch (error) {

      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  async delete(id) {

    try {

      const document = await Document.findByPk(id);

      if (!document) {
        return false;
      }

      await document.destroy();

      return true;

    } catch (error) {

      throw new Error(`Error deleting document: ${error.message}`);
    }
  }
}

export default new DocumentRepository();