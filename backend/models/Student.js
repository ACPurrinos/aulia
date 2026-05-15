import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(45),
    allowNull: false
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
  timestamps: true
});

export default Student;