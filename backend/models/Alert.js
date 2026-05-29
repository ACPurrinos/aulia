import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

import {
  AlertTypes,
  AlertPriorities,
  AlertStatusEnum
} from '../enums/index.js';

const Alert = sequelize.define('Alert', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  type: {
    type: DataTypes.ENUM(
      ...Object.values(AlertTypes)
    ),
    allowNull: false
  },

  source: {
    type: DataTypes.ENUM(
      'SYSTEM',
      'CHECKIN',
      'TEACHER',
      'PRECEPTOR',
      'MANUAL'
    ),
    allowNull: false
  },

  priority: {
    type: DataTypes.ENUM(
      ...Object.values(AlertPriorities)
    ),
    allowNull: false,
    defaultValue: AlertPriorities.NORMAL
  },

  status: {
    type: DataTypes.ENUM(
      ...Object.values(AlertStatusEnum)
    ),
    allowNull: false,
    defaultValue: AlertStatusEnum.PENDING
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [5, 1000]
    }
  },

  triggerReason: {
    type: DataTypes.STRING(255),
    allowNull: true
  },

  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'id'
    }
  },

  createdById: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'id'
    }
  },

  referralId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Referral',
      key: 'id'
    }
  }

}, {
  timestamps: true,
  paranoid: true
});

export default Alert;