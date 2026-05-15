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
  }

}, {
  timestamps: true
});

export default ReferralHistory;