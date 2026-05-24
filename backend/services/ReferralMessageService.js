import ReferralMessageRepository from '../repositories/ReferralMessageRepository.js';
import ReferralRepository from '../repositories/ReferralRepository.js';

class ReferralMessageService {

  // enviar mensaje
  async sendMessage(data, userId) {

    try {

      if (!data.referralId) {
        throw new Error('referralId is required');
      }

      if (!data.message || data.message.trim().length === 0) {
        throw new Error('message is required');
      }

      const referral = await ReferralRepository.findById(data.referralId);

      if (!referral) {
        throw new Error('Referral not found');
      }

      const message = await ReferralMessageRepository.create({
        referralId: data.referralId,
        message: data.message,
        userId
      });

      return message;

    } catch (error) {
      throw new Error(`Error sending referral message: ${error.message}`);
    }
  }

  // obtener chat completo
  async getMessagesByReferralId(referralId) {

    try {

      if (!referralId) {
        throw new Error('referralId is required');
      }

      return await ReferralMessageRepository.getByReferralId(referralId);

    } catch (error) {
      throw new Error(`Error fetching referral messages: ${error.message}`);
    }
  }

  // eliminar mensaje (soft delete si paranoid)
  async deleteMessage(id, userId) {

    try {

      const message = await ReferralMessageRepository.getById(id);

      if (!message) {
        throw new Error('Message not found');
      }

      // opcional: validar autor
      if (message.userId !== userId) {
        throw new Error('Not authorized to delete this message');
      }

      return await ReferralMessageRepository.delete(id);

    } catch (error) {
      throw new Error(`Error deleting message: ${error.message}`);
    }
  }
}

export default new ReferralMessageService();