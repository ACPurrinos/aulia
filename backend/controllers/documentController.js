import DocumentService from '../services/DocumentService.js';

class DocumentController {

  async create(req, res) {
    try {
      const document = await DocumentService.createDocument(
        req.body,
        req.user.id
      );

      return res.status(201).json(document);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const document = await DocumentService.getDocumentById(req.params.id);
      return res.json(document);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getByCaseFile(req, res) {
    try {
      const documents = await DocumentService.getByCaseFile(req.params.caseFileId);
      return res.json(documents);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getByIntervention(req, res) {
    try {
      const documents = await DocumentService.getByIntervention(req.params.interventionId);
      return res.json(documents);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const document = await DocumentService.updateDocument(
        req.params.id,
        req.body
      );

      return res.json(document);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await DocumentService.deleteDocument(req.params.id);
      return res.json({ success: result });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new DocumentController();