import { ReferralHistory, User } from '../models/index.js';

class ReferralHistoryRepository {

  async create(historyData) {
    try {
      return await ReferralHistory.create(historyData);
    } catch (error) {
      throw new Error(`Error creating referral history: ${error.message}`);
    }
  }

  async getByReferralId(referralId) {
    try {
      return await ReferralHistory.findAll({
        where: { referralId },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          }
        ],
        order: [['createdAt', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Error fetching referral history: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      return await ReferralHistory.findByPk(id);
    } catch (error) {
      throw new Error(`Error fetching referral history item: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const history = await ReferralHistory.findByPk(id);

      if (!history) return false;

      await history.destroy();

      return true;

    } catch (error) {
      throw new Error(`Error deleting referral history: ${error.message}`);
    }
  }
}

export default new ReferralHistoryRepository();
