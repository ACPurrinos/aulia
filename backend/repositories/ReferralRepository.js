import { Referral, Student, User, CaseFile } from '../models/index.js';

class ReferralRepository {

  async create(referralData) {
    try {
      return await Referral.create(referralData);

    } catch (error) {
      throw new Error(`Error creating referral: ${error.message}`);
    }
  }

  async getAll() {
    try {

      return await Referral.findAll({
        include: [
          {
            model: Student,
            attributes: ['id'],
            include: [
              {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
              }
            ]
          },
          {
            model: User,
            as: 'referrer',
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: CaseFile,
            attributes: ['id', 'status'],
            required: false
          }
        ],
        order: [['createdAt', 'DESC']]
      });

    } catch (error) {
      throw new Error(`Error fetching referrals: ${error.message}`);
    }
  }

  async getById(id) {
    try {

      return await Referral.findByPk(id, {
        include: [
          {
            model: Student,
            attributes: ['id'],
            include: [
              {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
              }
            ]
          },
          {
            model: User,
            as: 'referrer',
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: User,
            as: 'reviewer',
            attributes: ['id', 'firstName', 'lastName'],
            required: false
          },
          {
            model: CaseFile,
            attributes: ['id', 'status'],
            required: false
          }
        ]
      });

    } catch (error) {
      throw new Error(`Error fetching referral: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {

      const referral = await Referral.findByPk(id);

      if (!referral) {
        return null;
      }

      return await referral.update(updateData);

    } catch (error) {
      throw new Error(`Error updating referral: ${error.message}`);
    }
  }

  async delete(id) {
    try {

      const referral = await Referral.findByPk(id);

      if (!referral) {
        return false;
      }

      await referral.destroy();

      return true;

    } catch (error) {
      throw new Error(`Error deleting referral: ${error.message}`);
    }
  }
}

export default new ReferralRepository();