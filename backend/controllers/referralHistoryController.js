import ReferralHistoryService from '../services/ReferralHistoryService.js';

class ReferralHistoryController {

  async create(req, res) {
    try {
      const data = {
        ...req.body,
        changedBy: req.user?.id // importante: sale del middleware
      };

      const history = await ReferralHistoryService.registerHistory(data);

      return res.status(201).json(history);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async getByReferral(req, res) {
    try {
      const { referralId } = req.params;
      const filters = req.query;

      const history = await ReferralHistoryService.getHistoryByReferralId(
        referralId,
        filters
      );

      return res.json(history);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const history = await ReferralHistoryService.getById(req.params.id);
      return res.json(history);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

export default new ReferralHistoryController();