import DocumentRepository from '../repositories/DocumentRepository.js';
import CaseFileRepository from '../repositories/CaseFileRepository.js';
import InterventionRepository from '../repositories/InterventionRepository.js';

class DocumentService {

  // CREAR DOCUMENTO
  async createDocument(data, userId) {

    try {

      if (!data.fileName) {
        throw new Error('fileName is required');
      }
      if (!data.storageKey) {
        throw new Error('storageKey is required');
      }
      if (!data.caseFileId) {
        throw new Error('caseFileId is required');
      }
      if (!data.fileSize || data.fileSize <= 0) {
        throw new Error('fileSize must be greater than 0');
      }

      // validar CaseFile
      const caseFile = await CaseFileRepository.findById(data.caseFileId);
      if (!caseFile) {
        throw new Error('CaseFile not found');
      }
      // si viene interventionId, validar
      if (data.interventionId) {
        const intervention = await InterventionRepository.findById(
          data.interventionId
        );
        if (!intervention) {
          throw new Error('Intervention not found');
        }
      }

      // crear documento
      const document = await DocumentRepository.create({
        ...data,
        uploadedByUserId: userId 
      });
      return document;

    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  }
  // OBTENER POR ID
  async getDocumentById(id) {
    try {
      const document = await DocumentRepository.findById(id);
      if (!document) {
        throw new Error('Document not found');
      }
      return document;
    } catch (error) {
      throw new Error(`Error fetching document: ${error.message}`);
    }
  }

  // DOCUMENTOS POR CASEFILE
  async getByCaseFile(caseFileId) {
    try {
      if (!caseFileId) {
        throw new Error('caseFileId is required');
      }
      return await DocumentRepository.findByCaseFileId(caseFileId);
    } catch (error) {
      throw new Error(`Error fetching documents by casefile: ${error.message}`);
    }
  }

  // DOCUMENTOS POR INTERVENCIÓN
  async getByIntervention(interventionId) {
    try {
      if (!interventionId) {
        throw new Error('interventionId is required');
      }
      return await DocumentRepository.findByInterventionId(interventionId);

    } catch (error) {
      throw new Error(`Error fetching intervention documents: ${error.message}`);
    }
  }

  // ACTUALIZAR METADATA 
  async updateDocument(id, data) {
    try {
      const document = await DocumentRepository.findById(id);
      if (!document) {
        throw new Error('Document not found');
      }
      return await DocumentRepository.update(id, data);
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  // ELIMINAR DOCUMENTO (soft delete)
  async deleteDocument(id) {
    try {
      const document = await DocumentRepository.findById(id);
      if (!document) {
        throw new Error('Document not found');
      }
      return await DocumentRepository.archive(id);
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  }
}

export default new DocumentService();