import ReferralRepository from '../repositories/ReferralRepository.js';
import CaseFileRepository from '../repositories/CaseFileRepository.js';
import ReferralHistoryService from './ReferralHistoryService.js';

class ReferralService {

  // 1. Cuando un docente envía una nueva derivación desde su panel
  async createReferral(referralData, teacherId) {
    const newReferral = await ReferralRepository.create({
      ...referralData,
      status: 'Pendiente' // Toda derivación nace en evaluación
    });

    // Guardamos en el historial que el docente la inició
    await ReferralHistoryService.logStatusChange(
      newReferral.id, 
      'Pendiente', 
      teacherId, 
      'Derivación creada por el docente.'
    );

    return newReferral;
  }

  // 2. Cuando el gabinete evalúa la derivación y le da el "ACEPTAR"
  async acceptReferral(referralId, cabinetUserId, observations = '') {
    const referral = await ReferralRepository.getById(referralId);
    if (!referral) throw new Error('La derivación no existe.');
    if (referral.status !== 'Pendiente') throw new Error('Esta derivación ya fue procesada.');

    // Buscamos si el alumno ya tiene un legajo existente en la base de datos
    // Nota: Necesitás el método getByStudentId en tu CaseFileRepository que traiga el legajo sin filtrar por estado
    let caseFile = await CaseFileRepository.getByStudentId(referral.studentId);
    let historyMessage = '';

    if (!caseFile) {
      // CASO A: Es la primera vez del alumno en el gabinete. Creamos legajo de cero.
      caseFile = await CaseFileRepository.create({
        studentId: referral.studentId,
        status: 'Abierto',
        openingDate: new Date(),
        priority: 'Media',
        description: `Legajo inicial unificado. Creado a partir de derivación por ${referral.category}.`
      });
      historyMessage = 'Derivación aceptada. Se creó el Legajo unificado del alumno por primera vez.';
    } else {
      // CASO B: El alumno ya tenía legajo.
      if (caseFile.status === 'Cerrado') {
        // Si estaba archivado, lo REABRIMOS
        await CaseFileRepository.update(caseFile.id, {
          status: 'Abierto',
          updatedAt: new Date()
        });
        historyMessage = `Derivación aceptada. Se REABRIÓ el Legajo N° ${caseFile.id} para iniciar nuevo seguimiento.`;
      } else {
        // Si ya estaba abierto por otro tema, simplemente se suma
        historyMessage = `Derivación aceptada. Se asoció al Legajo N° ${caseFile.id} que ya se encuentra activo.`;
      }
    }

    // Vinculamos la derivación al legajo correspondiente y cambiamos su estado
    const updatedReferral = await ReferralRepository.update(referralId, {
      status: 'Aceptada',
      caseFileId: caseFile.id
    });

    // Registramos la acción en el historial con las observaciones de la psicopedagoga
    await ReferralHistoryService.logStatusChange(
      referralId, 
      'Aceptada', 
      cabinetUserId, 
      `${historyMessage} Observaciones: ${observations}`
    );

    return { referral: updatedReferral, caseFileId: caseFile.id };
  }

  // 3. Cuando el gabinete RECHAZA la derivación (por falta de datos o porque no corresponde)
  async rejectReferral(referralId, cabinetUserId, reason) {
    if (!reason) throw new Error('Es obligatorio justificar el motivo del rechazo.');

    const referral = await ReferralRepository.getById(referralId);
    if (!referral) throw new Error('La derivación no existe.');
    if (referral.status !== 'Pendiente') throw new Error('Esta derivación ya fue procesada.');

    const updatedReferral = await ReferralRepository.update(referralId, {
      status: 'Rechazada'
    });

    // Dejamos constancia del rechazo y el porqué
    await ReferralHistoryService.logStatusChange(
      referralId, 
      'Rechazada', 
      cabinetUserId, 
      `Motivo de rechazo: ${reason}`
    );

    return updatedReferral;
  }
}

export default new ReferralService();