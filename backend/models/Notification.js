import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { NotificationTypes } from '../enums/notificationEnums.js';

const Notification = sequelize.define('Notification', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  message: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  type: {
    type: DataTypes.ENUM(...Object.values(NotificationTypes)), // Dinámico y centralizado
    defaultValue: NotificationTypes.SYSTEM
  },

  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  link: {
    type: DataTypes.STRING(255)
  }  // Clave para que al hacer clic los lleve directo al legajo o derivación

}, {
  timestamps: true
});

export default Notification;