import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

import {
  InterventionTypes
} from '../enums/interventionEnums.js';

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
    type: DataTypes.ENUM(
      ...Object.values(InterventionTypes)
    ),
    allowNull: false
  },

  // Título corto para UI/listados
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      len: [3, 150]
    }
  },

  // Descripción completa
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  // Resumen ejecutivo
  summary: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  // Resultado / acuerdos / próximos pasos
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
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },


  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  }

}, {
  timestamps: true,
  paranoid: true,

  indexes: [
    {
      fields: ['caseFileId']
    },
    {
      fields: ['professionalId']
    },
    {
      fields: ['interventionDate']
    }
  ]
});

export default Intervention;