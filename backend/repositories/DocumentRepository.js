import { Document, Student, Intervention, User } from '../models/index.js';

class DocumentRepository {

  // 1. Registrar un nuevo documento (cuando suben un archivo)
  async create(documentData) {
    return await Document.create(documentData);
  }

  // 2. Buscar un documento específico por su ID (útil para cuando lo quieren descargar)
  async getById(id) {
    return await Document.findByPk(id);
  }

  // 3. Traer todos los documentos de la carpeta de un alumno
  async getByStudentId(studentId) {
    return await Document.findAll({
      where: { studentId },
      order: [['createdAt', 'DESC']] // Los más nuevos arriba
    });
  }

  // 4. Traer los documentos adjuntos a una intervención específica
  async getByInterventionId(interventionId) {
    return await Document.findAll({
      where: { interventionId },
      order: [['createdAt', 'DESC']]
    });
  }

  // 5. Eliminar un documento del sistema (Borrado físico o lógico)
  // Nota: Generalmente en escuelas se borra el registro de la BD si se equivocaron de archivo
  async delete(id) {
    const document = await Document.findByPk(id);
    if (!document) return false;
    await document.destroy();
    return true;
  }
}

export default new DocumentRepository();