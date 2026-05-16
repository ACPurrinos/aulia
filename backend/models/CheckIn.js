import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { CheckInContexts, EmotionalStates } from '../enums/checkinEnums.js';

const CheckIn = sequelize.define('CheckIn', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  emotionalState: {
    type: DataTypes.ENUM(...Object.values(EmotionalStates)), 
    allowNull: false
  },

  context: {
    type: DataTypes.ENUM(...Object.values(CheckInContexts)), 
    allowNull: true // Puede ser opcional por si el check-in es general
  },

  comment: {
    type: DataTypes.TEXT
  },

  helpRequested: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true, 
  
});

export default CheckIn;