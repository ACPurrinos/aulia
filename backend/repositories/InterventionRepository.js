import {Intervention, CaseFile, Student, User, Document} from '../models/index.js';

class InterventionRepository {

  async create(interventionData) {
    try {
      return await Intervention.create(
        interventionData
      );
    } catch (error) {
      throw new Error(
        `Error creating intervention: ${error.message}`
      );
    }
  }

  async findById(id) {
    try {
      console.log("DEBUG", Document.getTableName());
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
  model: Document,
  as: 'documents',
  required:false,
  attributes: [
    'id',
    'fileName',
    'category',
    'documentDate',
    'createdAt'
  ]
},

          {
            model: CaseFile,
            attributes: [
              'id',
              'status',
              'priority'
            ],
            include: [
              {
                model: Student,
                attributes: [
                  'id',
                  'birthDate',
                  'active'
                ],
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
      throw new Error(
        `Error fetching intervention ${id}: ${error.message}`
      );
    }
  }

  async findByCaseFileId(caseFileId) {
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

      throw new Error(
        `Error fetching case file interventions: ${error.message}`
      );
    }
  }

  async findByProfessionalId(professionalId) {
    try {

      return await Intervention.findAll({
        where: {
          professionalId
        },

        include: [
          {
            model: CaseFile,
            attributes: [
              'id',
              'status',
              'priority'
            ],
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

      throw new Error(
        `Error fetching professional interventions: ${error.message}`
      );
    }
  }

  async update(id, updateData) {
    try {

      const intervention =
        await Intervention.findByPk(id);

      if (!intervention) {
        return null;
      }

      return await intervention.update(
        updateData
      );

    } catch (error) {

      throw new Error(
        `Error updating intervention ${id}: ${error.message}`
      );
    }
  }

  // Soft delete por paranoid
  async archive(id) {
    try {
      const intervention =
        await Intervention.findByPk(id);
      if (!intervention) {
        return false;
      }
      await intervention.destroy();
      return true;
    } catch (error) {
      throw new Error(
        `Error archiving intervention ${id}: ${error.message}`
      );
    }
  }
}

export default new InterventionRepository();