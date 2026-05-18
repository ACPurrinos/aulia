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

  // Identificador único del archivo en almacenamiento
  // (AWS S3, Cloudinary, local storage, etc.)
  storageKey: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },

  // Nombre original del archivo subido
  originalName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },

  // MIME type
  // Ejemplo:
  // application/pdf
  // image/png
  mimeType: {
    type: DataTypes.STRING(100),
    allowNull: true
  },

  // Tamaño en bytes
  fileSize: {
    type: DataTypes.INTEGER,
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

  // Fecha REAL del documento
  // (no necesariamente la fecha de subida)
  documentDate: {
    type: DataTypes.DATE,
    allowNull: true
  },

  // Alumno al que pertenece
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'id'
    }
  },

  // Intervención asociada (opcional)
  interventionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Intervention',
      key: 'id'
    }
  },

  // Usuario que subió el documento
  uploadedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  }

}, {
  timestamps: true,
  paranoid: true
});

export default Document;