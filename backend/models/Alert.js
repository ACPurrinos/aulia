import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { AlertTypes, AlertPriorities } from '../enums/index.js';

/**
 * Modelo Alert: Representa un evento significativo detectado o reportado
 * que requiere la atención del equipo de orientación escolar.
 */
const Alert = sequelize.define('Alert', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  type: {
    type: DataTypes.ENUM(...Object.values(AlertTypes)),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // Nivel de urgencia para la gestión del flujo de trabajo del gabinete
  priority: {
    type: DataTypes.ENUM(...Object.values(AlertPriorities)),
    defaultValue: AlertPriorities.MEDIUM
  },
  // Descripción fenomenológica: qué se observa, sin juicios de valor
  description: {
    type: DataTypes.STRING(500), 
    allowNull: false,
    validate: {
      len: [5, 500] 
    }
  },
  // Estado del ciclo de intervención
  isResolved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
}, { 
  timestamps: true
});

export default Alert;