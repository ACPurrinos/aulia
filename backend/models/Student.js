import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  birthDate: {
    type: DataTypes.DATEONLY
  },
  grade: {
    type: DataTypes.STRING(10) 
  },
  division: {
    type: DataTypes.STRING(10) // Ej: "A"
  },
  familyConsent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

export default Student;