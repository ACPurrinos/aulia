import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { ReferralStatusEnum, ReferralActionEnum } from '../enums/index.js';

const ReferralHistory = sequelize.define('ReferralHistory', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  action: {
  type: DataTypes.ENUM(...Object.values(ReferralActionEnum)),
  allowNull: false
},

  oldStatus: {
  type: DataTypes.ENUM(...Object.values(ReferralStatusEnum))
},

newStatus: {
  type: DataTypes.ENUM(...Object.values(ReferralStatusEnum)),
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