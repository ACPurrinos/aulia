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

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },

  referralId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Referral',
      key: 'id'
    }
  }

}, {
  timestamps: true,
  paranoid: true
});

export default ReferralMessage;