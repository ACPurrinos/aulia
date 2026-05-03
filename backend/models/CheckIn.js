const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CheckIn = sequelize.define('CheckIn', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  emotionalState: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  context: {
    type: DataTypes.STRING(45)
  },
  comment: {
    type: DataTypes.TEXT
  },
  helpRequested: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

module.exports = CheckIn;