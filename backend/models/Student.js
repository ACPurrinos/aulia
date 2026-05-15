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
  userId: {
    type: DataTypes.INTEGER,
    unique: true, 
    references: {
      model: 'User', 
      key: 'id'
    }
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
},
courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Course',
      key: 'id'
    }
  }

}, {
  timestamps: true,
  paranoid: true // Borrado lógico
});

export default Student;