import { Referral, Student, User, CaseFile, Course } from '../models/index.js';

class ReferralRepository {

  async create(referralData, options) {
    try {
      return await Referral.create(referralData, options);
    } catch (error) {
      throw new Error(
        `Error creating referral: ${error.message}`
      );
    }
  }

  
  async findAllByTeacher(teacherId, options = {}) {
    try {
      return await Referral.findAll({
        ...options,
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
          },

          {
            model: User,
            as: 'referrer',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          },

          {
            model: CaseFile,
            attributes: [
              'id',
              'status',
              'priority'
            ],
            required: false
          },
        ],

        order: [
          ['createdAt', 'DESC']
        ], 
        where: {referrerId: teacherId}
      });

    } catch (error) {
      throw new Error(
        `Error fetching referrals: ${error.message}`
      );
    }
  }

  async findById(id, options) {
    try {
      return await Referral.findByPk(id, {
        ...options,
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
          },

          {
            model: User,
            as: 'referrer',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          },

          {
            model: User,
            as: 'reviewer',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ],
            required: false
          },

          {
            model: CaseFile,
            attributes: [
              'id',
              'status',
              'priority'
            ],
            required: false
          }
        ]
      });

    } catch (error) {
      throw new Error(
        `Error fetching referral ${id}: ${error.message}`
      );
    }
  }

  async update(id, updateData, options) {
    try {
      const referral = await Referral.findByPk(id, options);

      if (!referral) {
        return null;
      }

      return await referral.update(updateData, options);

    } catch (error) {
      throw new Error(
        `Error updating referral ${id}: ${error.message}`
      );
    }
  }

  async archive(id, options) {
    try {
      const referral = await Referral.findByPk(id, options);

      if (!referral) {
        return false;
      }

      await referral.destroy(options);

      return true;

    } catch (error) {
      throw new Error(
        `Error archiving referral ${id}: ${error.message}`
      );
    }
  }
}

export default new ReferralRepository();