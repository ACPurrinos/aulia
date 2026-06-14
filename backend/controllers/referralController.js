import ReferralService from '../services/ReferralService.js';

class ReferralController {

  async create(req, res) {
    try {
       
      const referral = await ReferralService.createReferral(
        req.body,
        req.user.id
      );

      return res.status(201).json(referral);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async accept(req, res) {
    try {
      const result = await ReferralService.acceptReferral(
        req.params.id,
        req.user.id,
        req.body.notes
      );

      return res.json(result);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async reject(req, res) {
    try {
      const result = await ReferralService.rejectReferral(
        req.params.id,
        req.user.id,
        req.body.notes
      );

      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async requestMoreInfo(req, res) {
    try {

      const result = await ReferralService.requestMoreInfo(
        req.params.id,
        req.user.id,
        req.body.notes
      );

      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async getAll(req, res) {
    try {
      const referrals = await ReferralService.getAllReferrals();
      return res.json(referrals);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async getAllByTeacher(req, res) {
    try {
      const id = req.params.id;
      const referrals = await ReferralService.getAllReferralsByTeacher({}, id);
      return res.json(referrals);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async getAll(req, res) {
    try {
      const referrals = await ReferralService.getAllReferrals();
      return res.json(referrals);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const referral = await ReferralService.getReferralById(
        req.params.id
      );
      return res.json(referral);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

export default new ReferralController();