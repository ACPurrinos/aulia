// =========================
// ReferralHistory.js
// =========================

import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

const ReferralHistory = sequelize.define('ReferralHistory', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  oldStatus: {
    type: DataTypes.STRING(45)   
  },

  newStatus: {
    type: DataTypes.STRING(45),
    allowNull: false
  },

  comment: {
    type: DataTypes.TEXT
  },

  changedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }

}, {
  timestamps: false
});

export default ReferralHistory;