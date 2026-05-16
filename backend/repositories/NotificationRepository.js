import { Notification } from '../models/index.js';

class NotificationRepository {

  // 1. Crear una notificación (para cuando un evento del sistema deba avisar a alguien)
  async create(notificationData) {
    return await Notification.create(notificationData);
  }

  // 2. Traer TODAS las notificaciones de un usuario específico
  // (Útil para armar el panel o la sección "Historial de notificaciones")
  async getByUserId(userId) {
    return await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']] // Las más recientes arriba de todo
    });
  }

  // 3. Traer solo las notificaciones NO LEÍDAS de un usuario
  // ¡Este método es clave! Sirve para pintar el "globito rojo" con el número en la campana del menú
  async getUnreadByUserId(userId) {
    return await Notification.findAll({
      where: { 
        userId, 
        isRead: false 
      },
      order: [['createdAt', 'DESC']]
    });
  }

  // 4. Marcar una sola notificación como leída (cuando el usuario hace click en ella)
  async markAsRead(id) {
    const notification = await Notification.findByPk(id);
    if (!notification) return null;
    return await notification.update({ isRead: true });
  }

  // 5. Marcar TODAS las notificaciones de un usuario como leídas al mismo tiempo
  // (Típico botón de "Marcar todas como leídas" que limpia la campanita)
  async markAllAsRead(userId) {
    return await Notification.update(
      { isRead: true },
      { where: { userId, isRead: false } }
    );
  }

  // 6. Eliminar una notificación vieja
  async delete(id) {
    const notification = await Notification.findByPk(id);
    if (!notification) return false;
    await notification.destroy();
    return true;
  }
}

export default new NotificationRepository();