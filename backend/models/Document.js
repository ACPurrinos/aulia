// =========================
// Document.js
// =========================

import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

const Document = sequelize.define('Document', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  fileName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  storageKey: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },

  originalName: {
    type: DataTypes.STRING(255)
  },

  mimeType: {
    type: DataTypes.STRING(100)
  },

  fileSize: {
    type: DataTypes.INTEGER
  },

  category: {
    type: DataTypes.ENUM(
      'Medical',
      'Legal',
      'Pedagogical',
      'Other'
    ),
    defaultValue: 'Other'
  },

  uploadDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'id'
    }
  },

  interventionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Intervention',
      key: 'id'
    }
  }

}, {
  timestamps: true,
  paranoid: true
});

export default Document;