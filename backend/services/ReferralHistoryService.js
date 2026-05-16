import ReferralHistoryRepository from '../repositories/ReferrealHistoryRepository';

class ReferralHistoryService {
  // Registrar un cambio de estado en la línea de tiempo
  async logStatusChange(referralId, status, userId, notes = '') {
    return await ReferralHistoryRepository.create({
      referralId,
      status,
      changedBy: userId, // ID del usuario que opera (docente, gabinete, etc.)
      notes,
      changeDate: new Date()
    });
  }

  // Consultar el historial completo de una derivación puntual
  async getHistoryByReferral(referralId) {
    return await ReferralHistoryRepository.getByReferralId(referralId);
  }
}

export default new ReferralHistoryService();