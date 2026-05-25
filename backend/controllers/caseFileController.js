import CaseFileService from '../services/CaseFileService.js';

class CaseFileController {

  async create(req, res) {

    try {
      const { studentId } = req.body;
      // Validación básica
      if (!studentId) {
        return res.status(400).json({
          message: 'studentId is required'
        });
      }

      const caseFile =
        await CaseFileService.createCaseFile(
          studentId,
          { transaction: null }
        );

      return res.status(201).json(caseFile);

    } catch (error) {

      if (
        error.message.includes('already exists')
      ) {
        return res.status(409).json({
          message: error.message
        });
      }

      return res.status(500).json({
        message: error.message
      });
    }
  }

  // obtiene o crea por studentId
  async getById(req, res) {

    try {
      const { studentId } = req.params;
      if (!studentId) {
        return res.status(400).json({
          message: 'studentId is required'
        });
      }

      const caseFile =
        await CaseFileService.getOrCreateByStudent(
          studentId
        );

      return res.json(caseFile);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async close(req, res) {

    try {

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message: 'caseFile id is required'
        });
      }

      const result =
        await CaseFileService.closeCaseFile(id);

      if (!result) {
        return res.status(404).json({
          message: 'CaseFile not found'
        });
      }

      return res.json(result);

    } catch (error) {

      return res.status(500).json({
        message: error.message
      });
    }
  }

  async reopen(req, res) {

    try {

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message: 'caseFile id is required'
        });
      }

      const result =
        await CaseFileService.reopenCaseFile(
          id,
          req.user?.id
        );

      if (!result) {
        return res.status(404).json({
          message: 'CaseFile not found'
        });
      }

      return res.json(result);

    } catch (error) {

      return res.status(500).json({
        message: error.message
      });
    }
  }

  async getCaseFileById(req, res) {

  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'caseFile id is required'
      });
    }
    const caseFile =
      await CaseFileService.getById(id);
    if (!caseFile) {
      return res.status(404).json({
        message: 'CaseFile not found'
      });
    }
    return res.json(caseFile);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}
}

export default new CaseFileController();