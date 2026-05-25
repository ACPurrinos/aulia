import CaseFileService from '../services/CaseFileService.js';

class CaseFileController {

  async create(req, res) {
    try {
      const { studentId } = req.body;

      const caseFile = await CaseFileService.createCaseFile(
        studentId,
        { transaction: null }
      );

      return res.status(201).json(caseFile);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const caseFile = await CaseFileService.getOrCreateByStudent(req.params.studentId);
      return res.json(caseFile);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async close(req, res) {
    try {
      const result = await CaseFileService.closeCaseFile(req.params.id);
      return res.json(result);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async reopen(req, res) {
    try {
      const result = await CaseFileService.reopenCaseFile(
        req.params.id,
        req.user?.id
      );

      return res.json(result);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

export default new CaseFileController();