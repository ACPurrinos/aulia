import ReferralMessageRepository from '../repositories/ReferralMessageRepository.js';

import ReferralRepository from '../repositories/ReferralRepository.js';

class ReferralMessageService {

  async sendMessage(messageData, userId) {

    try {

      const referral = await ReferralRepository.getById(
        messageData.referralId
      );

      if (!referral) {
        throw new Error('Referral not found.');
      }

      return await ReferralMessageRepository.create({
        referralId: messageData.referralId,
        userId,
        message: messageData.message
      });

    } catch (error) {

      throw new Error(
        `Error sending message: ${error.message}`
      );

    }
  }

  async getConversation(referralId) {

    try {

      const referral = await ReferralRepository.getById(
        referralId
      );

      if (!referral) {
        throw new Error('Referral not found.');
      }

      return await ReferralMessageRepository.getByReferralId(
        referralId
      );

    } catch (error) {

      throw new Error(
        `Error fetching conversation: ${error.message}`
      );

    }
  }

  async deleteMessage(messageId, userId) {

    try {

      const message = await ReferralMessageRepository.getById(
        messageId
      );

      if (!message) {
        throw new Error('Message not found.');
      }

      // solo el autor puede borrar
      if (message.userId !== userId) {
        throw new Error('Unauthorized action.');
      }

      await ReferralMessageRepository.delete(messageId);

      return {
        success: true,
        message: 'Message deleted successfully.'
      };

    } catch (error) {

      throw new Error(
        `Error deleting message: ${error.message}`
      );

    }
  }
}

export default new ReferralMessageService();