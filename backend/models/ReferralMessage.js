// =========================
// ReferralMessage.js
// =========================

import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

const ReferralMessage = sequelize.define('ReferralMessage', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  senderType: {
    type: DataTypes.ENUM(
      'Teacher',
      'Cabinet'
    ),
    allowNull: false
  }

}, {
  timestamps: true
});

export default ReferralMessage;