// services/DocumentService.js

import DocumentRepository from '../repositories/DocumentRepository.js';

class DocumentService {

  async uploadDocument(documentData) {

    try {

      if (!documentData.fileName) {
        throw new Error('El nombre del archivo es obligatorio.');
      }

      if (!documentData.storageKey) {
        throw new Error('La clave de almacenamiento es obligatoria.');
      }

      if (!documentData.fileSize) {
        throw new Error('El tamaño del archivo es obligatorio.');
      }

      if (!documentData.studentId) {
        throw new Error('El alumno es obligatorio.');
      }

      if (!documentData.uploadedBy) {
        throw new Error('El usuario que sube el archivo es obligatorio.');
      }

      return await DocumentRepository.create(documentData);

    } catch (error) {

      throw new Error(`Error uploading document: ${error.message}`);
    }
  }

  async getDocumentById(id) {

    try {

      const document = await DocumentRepository.getById(id);

      if (!document) {
        throw new Error('Documento no encontrado.');
      }

      return document;

    } catch (error) {

      throw new Error(`Error fetching document: ${error.message}`);
    }
  }

  async getStudentDocuments(studentId) {

    try {

      return await DocumentRepository.getByStudentId(studentId);

    } catch (error) {

      throw new Error(`Error fetching student documents: ${error.message}`);
    }
  }

  async getInterventionDocuments(interventionId) {

    try {

      return await DocumentRepository.getByInterventionId(interventionId);

    } catch (error) {

      throw new Error(`Error fetching intervention documents: ${error.message}`);
    }
  }

  async updateDocument(id, updateData) {

    try {

      const updatedDocument =
        await DocumentRepository.update(
          id,
          updateData
        );

      if (!updatedDocument) {
        throw new Error('Documento no encontrado.');
      }

      return updatedDocument;

    } catch (error) {

      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  async deleteDocument(id) {

    try {

      const deleted = await DocumentRepository.delete(id);

      if (!deleted) {
        throw new Error('Documento no encontrado.');
      }

      return {
        success: true,
        message: 'Documento eliminado correctamente.'
      };

    } catch (error) {

      throw new Error(`Error deleting document: ${error.message}`);
    }
  }
}

export default new DocumentService();