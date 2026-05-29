import {Document, CaseFile, Student, Intervention, User, Course} from '../models/index.js';

class DocumentRepository {

  async create(documentData) {
    try {
      return await Document.create(documentData);
    } catch (error) {
      throw new Error(
        `Error creating document: ${error.message}`
      );
    }
  }

  async findById(id) {
    try {
      return await Document.findByPk(id, {
        include: [
          {
            model: CaseFile,
            include: [
              {
                model: Student,
                attributes: [
                  'id',
                  'birthDate'
                ],
                include: [
                  {
                    model: User,
                    attributes: [
                      'id',
                      'firstName',
                      'lastName'
                    ]
                  },

                  {
                    model: Course,
                    attributes: [
                      'id',
                      'level',
                      'grade',
                      'academicYear',
                      'division'
                    ]
                  }
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
      throw new Error(
        `Error fetching document ${id}: ${error.message}`
      );
    }
  }

  async findByCaseFileId(caseFileId) {
    try {
      return await Document.findAll({
        where: {
          caseFileId
        },
        include: [
          {
            model: User,
            as: 'uploader',
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
      throw new Error(
        `Error fetching case file documents: ${error.message}`
      );
    }
  }

  async findByInterventionId(interventionId) {

    try {
      return await Document.findAll({
        where: {
          interventionId
        },
        include: [
          {
            model: User,
            as: 'uploader',
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
      throw new Error(
        `Error fetching intervention documents: ${error.message}`
      );
    }
  }

  async update(id, updateData) {
    try {
      const document =
        await Document.findByPk(id);
      if (!document) {
        return null;
      }
      return await document.update(updateData);
    } catch (error) {
      throw new Error(
        `Error updating document ${id}: ${error.message}`
      );
    }
  }

  // Soft delete por paranoid
  async archive(id) {

    try {
      const document =
        await Document.findByPk(id);
      if (!document) {
        return false;
      }

      await document.destroy();
      return true;
    } catch (error) {

      throw new Error(
        `Error archiving document ${id}: ${error.message}`
      );
    }
  }
}

export default new DocumentRepository();