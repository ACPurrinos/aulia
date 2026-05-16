import ReferralMessageRepository from '../repositories/ReferralMessageRepository.js  ';
import ReferralRepository from '../repositories/ReferralRepository.js';

class ReferralMessageService {

  // 1. Enviar un nuevo mensaje dentro de la derivación
  async sendMessage(messageData, senderId) {
    // Validamos que la derivación exista antes de colgarle un mensaje
    const referral = await ReferralRepository.getById(messageData.referralId);
    if (!referral) {
      throw new Error('No se puede enviar el mensaje porque la derivación no existe.');
    }

    // Opcional: Si la derivación ya está archivada/rechazada hace mucho, 
    // podrías bloquear nuevos mensajes, pero por ahora permitimos debatir.

    return await ReferralMessageRepository.create({
      referralId: messageData.referralId,
      senderId: senderId, //  (User ID)
      message: messageData.message,
      sentAt: new Date()
    });
  }

  // 2. Traer toda la conversación de una derivación (ordenada cronológicamente)
  async getChatByReferral(referralId) {
    const referral = await ReferralRepository.getById(referralId);
    if (!referral) {
      throw new Error('Derivación no encontrada.');
    }

    // Nota: Asegurate de que tu repositorio ordene por 'sentAt' ASC 
    // para que se lea como un chat de arriba hacia abajo (del más viejo al más nuevo)
    return await ReferralMessageRepository.getByReferralId(referralId);
  }

  // 3. Borrar un mensaje (por si el profe se equivocó de canal o escribió algo mal)
  async deleteMessage(messageId, userId) {
    const message = await ReferralMessageRepository.getById(messageId);
    if (!message) {
      throw new Error('El mensaje no existe.');
    }

    // Regla de seguridad: Solo el que escribió el mensaje puede borrarlo
    if (message.senderId !== userId) {
      throw new Error('No tenés permisos para borrar un mensaje de otro usuario.');
    }

    await ReferralMessageRepository.delete(messageId);
    return { success: true, message: 'Mensaje eliminado correctamente.' };
  }
}

export default new ReferralMessageService();