const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
  }
}, { 
  timestamps: true 
});

module.exports = Document;