import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { ReferralActionEnum } from '../enums/index.js';

const ReferralHistory = sequelize.define('ReferralHistory', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  referralId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Referral',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },

  action: {
    type: DataTypes.ENUM(...Object.values(ReferralActionEnum)),
    allowNull: false
  },

  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  changedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    },
    onDelete: 'RESTRICT'
  }

}, {
  timestamps: true,
  updatedAt: false // El historial no debería editarse
});

export default ReferralHistory;