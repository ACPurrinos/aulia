import ReferralHistoryRepository from '../repositories/ReferralHistoryRepository.js';

class ReferralHistoryService {

  async registerHistory(historyData) {

    try {

      return await ReferralHistoryRepository.create(historyData);

    } catch (error) {
      throw new Error(`Error registering referral history: ${error.message}`);
    }
  }

  async getReferralTimeline(referralId) {

    try {

      return await ReferralHistoryRepository.getByReferralId(referralId);

    } catch (error) {
      throw new Error(`Error fetching referral timeline: ${error.message}`);
    }
  }

}

export default new ReferralHistoryService();