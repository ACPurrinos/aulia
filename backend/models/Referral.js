const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Referral = sequelize.define('Referral', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  reason: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'More Info Required', 'Rejected'),
    defaultValue: 'Pending'
  }
});

module.exports = Referral;