import DocumentRepository from '../repositories/DocumentRepository.js';

class DocumentService {

  // 1. Adjuntar un documento a una intervención o legajo
  async uploadDocument(documentData) {
    if (!documentData.fileUrl) {
      throw new Error('La URL o ruta del archivo es obligatoria.');
    }
    return await DocumentRepository.create(documentData);
  }

  // 2. NUEVO: Buscar y obtener un documento específico para poder "verlo"
  async getDocumentById(id) {
    const document = await DocumentRepository.getById(id);
    if (!document) {
      throw new Error('El documento solicitado no existe.');
    }
    return document; // Acá viaja la fileUrl que el frontend va a usar para abrir el archivo
  }

  // 3. Eliminar un documento del sistema
  async deleteDocument(id) {
    const success = await DocumentRepository.delete(id);
    if (!success) throw new Error('El documento no existe o no pudo ser eliminado.');
    return { message: 'Documento eliminado con éxito.' };
  }
}

export default new DocumentService();