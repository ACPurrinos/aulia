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
    allowNull: false,
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
    type: DataTypes.TEXT,
    allowNull: true
  },

  outcome: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  caseFileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CaseFile',
      key: 'id'
    }
  },

  professionalId: {
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

export default Intervention;