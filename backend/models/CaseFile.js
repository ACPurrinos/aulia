import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { CaseFilePriority, CaseFileStatus } from '../enums/index.js';

const CaseFile = sequelize.define('CaseFile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subject: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM(...Object.values(CaseFilePriority)),
    defaultValue: CaseFilePriority.MEDIUM
  },
  status: {
    type: DataTypes.ENUM(...Object.values(CaseFileStatus)),
    defaultValue: CaseFileStatus.OPEN
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Student', 
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

export default CaseFile;