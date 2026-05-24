import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

import {
  DocumentCategories
} from '../enums/index.js';

const Document = sequelize.define('Document', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  // Nombre visible dentro del sistema
  fileName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  },

  // Identificador único del storage
  storageKey: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },

  // Nombre original del archivo
  originalName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },

  // MIME type
  mimeType: {
    type: DataTypes.STRING(255),
    allowNull: true
  },

  // Tamaño en bytes
  fileSize: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      min: 1
    }
  },

  // Categoría documental
  category: {
    type: DataTypes.ENUM(
      ...Object.values(DocumentCategories)
    ),
    allowNull: false,
    defaultValue: DocumentCategories.OTHER
  },

  // Fecha real del documento
  documentDate: {
    type: DataTypes.DATE,
    allowNull: true
  },

  // Todo documento pertenece al legajo
  caseFileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CaseFile',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },

  // Opcionalmente asociado a una intervención
  interventionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Intervention',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },

  // Usuario que cargó el documento
  uploadedByUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
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
      fields: ['caseFileId']
    },
    {
      fields: ['interventionId']
    },
    {
      fields: ['category']
    }
  ]
});

export default Document;