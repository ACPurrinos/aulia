import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

const ReferralHistory = sequelize.define('ReferralHistory', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  action: {
    type: DataTypes.ENUM(
      'Created',
      'Accepted',
      'Rejected',
      'MoreInfoRequested',
      'InfoProvided',
      'Closed'
    ),
    allowNull: false
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

  changedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  }

}, {
  timestamps: true
});

export default ReferralHistory;