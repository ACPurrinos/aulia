// =========================
// Referral.js
// =========================

import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { ReferralStatus } from '../constants/referralStatus.js';

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
    type: DataTypes.ENUM(
      'Academic',
      'Socioemotional',
      'Both'
    ),
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  status: {
  type: DataTypes.ENUM(
    ReferralStatus.PENDING,
    ReferralStatus.IN_PROGRESS,
    ReferralStatus.MORE_INFO,
    ReferralStatus.REJECTED
  ),
  defaultValue: ReferralStatus.PENDING
},



  reviewedAt: {
    type: DataTypes.DATE
  },

  reviewedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    }
  }

}, {
  timestamps: true,
  paranoid: true
});

export default Referral;