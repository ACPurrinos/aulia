import ReferralMessageService from '../services/ReferralMessageService.js';

class ReferralMessageController {

  // POST /referrals/:id/messages
  async sendMessage(req, res) {
    try {
      const referralId = req.params.id;

      const message = await ReferralMessageService.sendMessage(
        {
          referralId,
          message: req.body.message
        },
        req.user.id
      );

      return res.status(201).json(message);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // GET /referrals/:id/messages
  async getMessages(req, res) {
    try {
      const messages = await ReferralMessageService.getMessagesByReferralId(
        req.params.id
      );

      return res.json(messages);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // DELETE /messages/:id
  async deleteMessage(req, res) {
    try {
      const result = await ReferralMessageService.deleteMessage(
        req.params.id,
        req.user.id
      );

      return res.json({
        success: result
      });

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

export default new ReferralMessageController();