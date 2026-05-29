import ReferralHistoryRepository from '../repositories/ReferrealHistoryRepository.js';
import ReferralRepository from '../repositories/ReferralRepository.js';

class ReferralHistoryService {

  // registrar evento del sistema
  async registerHistory(data) {
    try {
      if (!data.referralId) {
        throw new Error('referralId is required');
      }
      if (!data.action) {
        throw new Error('action is required');
      }
      if (!data.changedBy) {
        throw new Error('changedBy is required');
      }

      // validar referral existe
      const referral = await ReferralRepository.findById(data.referralId);
      if (!referral) {
        throw new Error('Referral not found');
      }

      const history = await ReferralHistoryRepository.create(data);
      return history;
    } catch (error) {
      throw new Error(`Error registering referral history: ${error.message}`);
    }
  }

  // obtener historial completo
  async getHistoryByReferralId(referralId) {
    try {
      if (!referralId) {
        throw new Error('referralId is required');
      }
      return await ReferralHistoryRepository.findByReferralId(referralId);
    } catch (error) {
      throw new Error(`Error fetching referral history: ${error.message}`);
    }
  }
}

export default new ReferralHistoryService();