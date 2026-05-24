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

  async getByReferralId(referralId) {

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
              'lastName',
              'role'  /* role no es atributo del User, REVISAR */
            ]
          }
        ],
        order: [['createdAt', 'ASC']]
      });
    } catch (error) {
      throw new Error(
        `Error fetching referral messages: ${error.message}`
      );
    }
  }

  async getById(id) {
    try {
      return await ReferralMessage.findByPk(id);
    } catch (error) {
      throw new Error(
        `Error fetching referral message: ${error.message}`
      );

    }
  }

  async delete(id) {
    try {
      const message = await ReferralMessage.findByPk(id);
      if (!message) {
        return false;
      }
      await message.destroy();
      return true;
    } catch (error) {
      throw new Error(
        `Error deleting referral message: ${error.message}`
      );

    }
  }
}

export default new ReferralMessageRepository();
