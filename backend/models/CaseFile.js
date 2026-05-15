import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

const CaseFile = sequelize.define('CaseFile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  openingDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  subject: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium'
  },
  status: {
    type: DataTypes.ENUM('Open', 'Closed'),
    defaultValue: 'Open'
  },
  // --- CLAVE FORÁNEA AGREGADA ---
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Un legajo no puede existir sin un alumno
    references: {
      model: 'Student', // En singular por el freezeTableName
      key: 'id'
    }
  }
});

export default CaseFile;