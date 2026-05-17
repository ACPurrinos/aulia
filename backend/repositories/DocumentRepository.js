import { Document } from '../models/index.js';

class DocumentRepository {

  // Crear documento
  async create(documentData) {
    try {
      return await Document.create(documentData);
    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  }

  // Buscar documento por ID
  async getById(id) {
    try {
      return await Document.findByPk(id);
    } catch (error) {
      throw new Error(`Error fetching document: ${error.message}`);
    }
  }

  // Obtener todos los documentos de un estudiante
  async getByStudentId(studentId) {
    try {

      return await Document.findAll({
        where: { studentId },
        order: [['createdAt', 'DESC']]
      });
    } catch (error) {
      throw new Error(`Error fetching student documents: ${error.message}`);
    }
  }

  // Obtener documentos vinculados a una intervención
  async getByInterventionId(interventionId) {
    try {
      return await Document.findAll({
        where: { interventionId },
        order: [['createdAt', 'DESC']]
      });
    } catch (error) {
      throw new Error(`Error fetching intervention documents: ${error.message}`);
    }
  }

  // Actualizar documento
  async update(id, updateData) {
    try {

      const document = await Document.findByPk(id);
      if (!document) {
        return null;
      }
      return await document.update(updateData);
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  // Eliminar documento
  async delete(id) {
    try {

      const document = await Document.findByPk(id);
      if (!document) {
        return false;
      }

      await document.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  }
}

export default new DocumentRepository();