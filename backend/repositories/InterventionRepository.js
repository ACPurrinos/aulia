// repositories/InterventionRepository.js

import {
  Intervention,
  CaseFile,
  Student,
  User,
  Document
} from '../models/index.js';

class InterventionRepository {

  async create(interventionData) {
    try {
      return await Intervention.create(interventionData);
    } catch (error) {
      throw new Error(`Error creating intervention: ${error.message}`);
    }
  }

  async getById(id) {
    try {

      return await Intervention.findByPk(id, {
        include: [
          {
            model: User,
            as: 'professional',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          },
          {
            model: Document
          },
          {
            model: CaseFile,
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
              }
            ]
          }
        ]
      });

    } catch (error) {
      throw new Error(`Error fetching intervention: ${error.message}`);
    }
  }

  async getByCaseFileId(caseFileId) {
    try {

      return await Intervention.findAll({
        where: {
          caseFileId
        },
        include: [
          {
            model: User,
            as: 'professional',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          }
        ],
        order: [
          ['interventionDate', 'DESC']
        ]
      });
    } catch (error) {
      throw new Error(`Error fetching case interventions: ${error.message}`);
    }
  }

  async getByProfessionalId(professionalId) {
    try {

      return await Intervention.findAll({
        where: {
          professionalId
        },
        include: [
          {
            model: CaseFile,
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
              }
            ]
          }
        ],
        order: [
          ['interventionDate', 'DESC']
        ]
      });
    } catch (error) {
      throw new Error(`Error fetching professional interventions: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const intervention = await Intervention.findByPk(id);
      if (!intervention) {
        return null;
      }
      return await intervention.update(updateData);
    } catch (error) {
      throw new Error(`Error updating intervention: ${error.message}`);
    }
  }

  async delete(id) {
    try {

      const intervention = await Intervention.findByPk(id);
      if (!intervention) {
        return false;
      }
      await intervention.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error deleting intervention: ${error.message}`);
    }
  }
}

export default new InterventionRepository();