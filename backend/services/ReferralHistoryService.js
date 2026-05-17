import ReferralHistoryRepository from '../repositories/ReferralHistoryRepository.js';

class ReferralHistoryService {

  async registerHistory({
    referralId,
    action,
    oldStatus,
    newStatus,
    comment,
    changedBy
  }) {

    try {

      return await ReferralHistoryRepository.create({
        referralId,
        action,
        oldStatus,
        newStatus,
        comment,
        changedBy
      });

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