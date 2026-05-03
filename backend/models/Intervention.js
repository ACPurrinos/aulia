import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Intervention = sequelize.define('Intervention', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  type: {
    type: DataTypes.ENUM(
      'Classroom Observation', 
      'Individual Interview', 
      'Family Meeting', 
      'Internal Staff Meeting', 
      'External Professional Contact',
      'Report Writing'
    ),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT
  },
  outcome: {
    type: DataTypes.TEXT
  }
}, { 
  timestamps: true 
});

export default Intervention;