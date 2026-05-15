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
  fileUrl: {
    type: DataTypes.STRING(255), // La ruta en el servidor o nube
    allowNull: false
  },
  fileType: {
    type: DataTypes.STRING(20) // Ej: 'pdf', 'jpg', 'docx'
  },
  category: {
    type: DataTypes.ENUM('Medical', 'Legal', 'Pedagogical', 'Other'),
    defaultValue: 'Other'
  },
  uploadDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  // CLAVES FORÁNEAS
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Siempre tiene que ser de alguien
    references: { model: 'Student', key: 'id' }
  },
  interventionId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Solo si el documento nació en una intervención
    references: { model: 'Intervention', key: 'id' }
  }
}, { 
  timestamps: true 
});

export default Document;