import InterventionService from '../services/InterventionService.js';

class InterventionController {

  async create(req, res) {
    try {
      const intervention = await InterventionService.createIntervention(
        req.body,
        req.user.id
      );

      return res.status(201).json(intervention);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const intervention = await InterventionService.getById(req.params.id);
      return res.json(intervention);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getByStudent(req, res) {
  try {
    const data = await InterventionService.getByStudent(req.params.studentId);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

  async getByCaseFile(req, res) {
    try {
      const data = await InterventionService.getByCaseFile(req.params.caseFileId);
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getByProfessional(req, res) {
    try {
      const data = await InterventionService.getByProfessional(req.user.id);
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new InterventionController();