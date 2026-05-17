import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { DocumentCategories } from '../enums/index.js';

const Document = sequelize.define('Document', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  // Nombre visible dentro del sistema
  fileName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  // Identificador único del archivo en almacenamiento
  // (AWS S3, Cloudinary, local storage, etc.)
  storageKey: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },

  // Nombre original del archivo
  originalName: {
    type: DataTypes.STRING(255)
  },

  // Tipo MIME
  // Ej: application/pdf
  mimeType: {
    type: DataTypes.STRING(100)
  },

  // Tamaño en bytes
  fileSize: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  // Categoría documental
  category: {
    type: DataTypes.ENUM(...Object.values(DocumentCategories)),
    defaultValue: DocumentCategories.OTHER
  },

  // Fecha real del documento
  // (no la fecha de subida)
  documentDate: {
    type: DataTypes.DATE
  },

  // Alumno al que pertenece el documento
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  // Intervención asociada (opcional)
  interventionId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  // Usuario que subió el archivo
  uploadedBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  timestamps: true,
  paranoid: true
});

export default Document;