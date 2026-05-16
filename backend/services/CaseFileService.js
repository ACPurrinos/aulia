import CaseFileRepository from '../repositories/CaseFileRepository.js';

class CaseFileService {
  
  // Abrir un legajo asegurándonos de que el alumno no tenga ya uno abierto
  // sólo puede tener un case file abierto a la vez, epro puede recibir multiples derivaciones
  async openCaseFile(caseFileData) {
    const existingCase = await CaseFileRepository.getOpenByStudentId(caseFileData.studentId);
    
    if (existingCase) {
      throw new Error('El estudiante ya tiene un legajo abierto en el gabinete.');
    }

    return await CaseFileRepository.create({
      ...caseFileData,
      status: 'Abierto' // Aseguramos que arranque abierto
    });
  }

  // Traer la historia clínica/pedagógica completa para la psicopedagoga
  async getStudentHistory(id) {
    const history = await CaseFileRepository.getFullHistoryById(id);
    if (!history) throw new Error('Legajo no encontrado.');
    return history;
  }

  // Cerrar el caso cuando el alumno recibe el alta o egresa
  async closeStudentCase(id) {
    const closedCase = await CaseFileRepository.closeCase(id);
    if (!closedCase) throw new Error('No se pudo cerrar el legajo.');
    return closedCase;
  }
}

export default new CaseFileService();