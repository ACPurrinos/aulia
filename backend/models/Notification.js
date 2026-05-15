import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

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
    type: DataTypes.ENUM(
      'Referral',
      'Alert',
      'CheckIn',
      'System'
    ),
    defaultValue: 'System'
  },

  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  link: {
    type: DataTypes.STRING(255)
  }

}, {
  timestamps: true
});

export default Notification;