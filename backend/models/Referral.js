import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { ReferralStatusEnum, ReferralCategoriesEnum } from '../enums/index.js';


const Referral = sequelize.define('Referral', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  category: {
    type: DataTypes.ENUM(...Object.values(ReferralCategoriesEnum)),
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM(...Object.values(ReferralStatusEnum)),
    defaultValue: ReferralStatusEnum.PENDING
  
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