import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { InterventionTypes } from '../enums/interventionEnums.js';

const Intervention = sequelize.define('Intervention', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  interventionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  type: {
    type: DataTypes.ENUM(...Object.values(InterventionTypes)),
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
  },

  // Legajo asociado
  caseFileId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  // Profesional responsable
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  timestamps: true,
  paranoid: true
});

export default Intervention;