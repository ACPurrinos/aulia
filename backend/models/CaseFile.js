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
    type: DataTypes.ENUM(
      ...Object.values(CaseFilePriority)
    ),
    allowNull: false,
    defaultValue: CaseFilePriority.NORMAL
  },

  status: {
    type: DataTypes.ENUM(
      ...Object.values(CaseFileStatus)
    ),
    allowNull: false,
    defaultValue: CaseFileStatus.OPEN
  },

  // Un único legajo por alumno
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'Student',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  }

}, {
  timestamps: true,
  paranoid: true,

  indexes: [
    {
      unique: true,
      fields: ['studentId']
    }
  ]
});

export default CaseFile;