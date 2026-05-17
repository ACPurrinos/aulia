import DocumentRepository from '../repositories/DocumentRepository.js';

class DocumentService {

  // Registrar/subir un nuevo documento
  async uploadDocument(documentData) {

    if (!documentData.fileName) {
      throw new Error('El nombre del documento es obligatorio.');
    }

    if (!documentData.storageKey) {
      throw new Error('La clave de almacenamiento es obligatoria.');
    }

    if (!documentData.studentId) {
      throw new Error('El documento debe estar asociado a un estudiante.');
    }

    if (!documentData.uploadedBy) {
      throw new Error('Debe especificarse qué usuario subió el documento.');
    }

    return await DocumentRepository.create(documentData);
  }

  // Obtener documento por ID
  async getDocumentById(id) {

    const document = await DocumentRepository.getById(id);

    if (!document) {
      throw new Error('Documento no encontrado.');
    }

    return document;
  }

  // Obtener todos los documentos de un estudiante
  async getStudentDocuments(studentId) {

    return await DocumentRepository.getByStudentId(studentId);
  }

  // Obtener documentos de una intervención
  async getInterventionDocuments(interventionId) {

    return await DocumentRepository.getByInterventionId(interventionId);
  }

  // Actualizar documento
  async updateDocument(id, updateData) {

    const updatedDocument = await DocumentRepository.update(id, updateData);

    if (!updatedDocument) {
      throw new Error('No se pudo actualizar el documento.');
    }

    return updatedDocument;
  }

  // Eliminar documento
  async deleteDocument(id) {

    const deleted = await DocumentRepository.delete(id);

    if (!deleted) {
      throw new Error('Documento no encontrado.');
    }

    return {
      success: true,
      message: 'Documento eliminado correctamente.'
    };
  }
}

export default new DocumentService();