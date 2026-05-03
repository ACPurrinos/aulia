const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Intervention = sequelize.define('Intervention', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  type: {
    type: DataTypes.ENUM(
      'Classroom Observation', 
      'Individual Interview', 
      'Family Meeting', 
      'Internal Staff Meeting', 
      'External Professional Contact',
      'Report Writing'
    ),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT
  },
  outcome: {
    type: DataTypes.TEXT
  }
}, { 
  timestamps: true 
});

module.exports = Intervention;