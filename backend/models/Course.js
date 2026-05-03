import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  level: {
    type: DataTypes.STRING(45), // Ej: "Primary", "Secondary"
    allowNull: false
  },
  grade: {
    type: DataTypes.STRING(45), // Ej: "1st Year"
    allowNull: false
  },
  division: {
    type: DataTypes.STRING(10), // Ej: "A", "B"
    allowNull: false
  }
}, { timestamps: false });

export default Course;