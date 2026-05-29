import {
  ReferralMessage,
  User
} from '../models/index.js';

class ReferralMessageRepository {

  async create(messageData) {

    try {

      return await ReferralMessage.create(messageData);

    } catch (error) {

      throw new Error(
        `Error creating referral message: ${error.message}`
      );
    }
  }

  async findByReferralId(referralId) {

    try {

      return await ReferralMessage.findAll({

        where: { referralId },

        include: [
          {
            model: User,
            as: 'sender',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          }
        ],

        order: [
          ['createdAt', 'ASC']
        ]

      });

    } catch (error) {

      throw new Error(
        `Error fetching referral messages: ${error.message}`
      );
    }
  }

  async findById(id) {

    try {

      return await ReferralMessage.findByPk(id, {

        include: [
          {
            model: User,
            as: 'sender',
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
        `Error fetching referral message: ${error.message}`
      );
    }
  }

  async archive(id) {

    try {

      const message =
        await ReferralMessage.findByPk(id);

      if (!message) {
        return false;
      }

      await message.destroy();

      return true;

    } catch (error) {

      throw new Error(
        `Error archiving referral message: ${error.message}`
      );
    }
  }
}

export default new ReferralMessageRepository();
