import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  birthDate: {
    type: DataTypes.DATEONLY
  },
  
  familyConsent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
},
}, {
  timestamps: true,
  paranoid: true // Borrado lógico
});

export default Student;