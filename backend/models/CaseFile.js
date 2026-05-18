import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import {
  CaseFilePriority,
  CaseFileStatus
} from '../enums/index.js';

const CaseFile = sequelize.define('CaseFile', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  priority: {
    type: DataTypes.ENUM(...Object.values(CaseFilePriority)),
    allowNull: false,
    defaultValue: CaseFilePriority.NORMAL
  },

  status: {
    type: DataTypes.ENUM(...Object.values(CaseFileStatus)),
    allowNull: false,
    defaultValue: CaseFileStatus.OPEN
  },

  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // ← 1 solo caseFile por alumno
    references: {
      model: 'Student',
      key: 'id'
    },
    onDelete: 'RESTRICT'
  }

}, {
  timestamps: true,
  paranoid: true
});

export default CaseFile;