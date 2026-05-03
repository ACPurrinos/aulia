const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Alert = sequelize.define('Alert', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING(45) // Ej: 'Emotional Pattern', 'Urgent Referral'
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium'
  },
  description: {
    type: DataTypes.STRING(255)
  },
  isResolved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, { timestamps: true });

module.exports = Alert;