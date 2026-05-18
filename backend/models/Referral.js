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

  // === COLUMNAS ESENCIALES PARA PASAR LOS DATOS ===
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'id'
    }
  },

  referrerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },

  caseFileId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Nulo al principio, se vincula al aceptar la derivación
    references: {
      model: 'CaseFile',
      key: 'id'
    }
  },
  // ===============================================

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