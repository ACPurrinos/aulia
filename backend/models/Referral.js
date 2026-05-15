// =========================
// Referral.js
// =========================

import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { ReferralStatus, ReferralCategories } from '../constants/index.js';


const Referral = sequelize.define('Referral', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  category: {
    type: DataTypes.ENUM(...Object.values(ReferralCategories)),
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM(...Object.values(ReferralStatus)),
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