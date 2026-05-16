import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { CourseLevels, SchoolGrades} from '../enums/courseEnums.js';

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  academicYear: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: new Date().getFullYear()
},
  
  level: {
    type: DataTypes.ENUM(...Object.values(CourseLevels)), 
    allowNull: false
  },
  
  grade: {
    type: DataTypes.ENUM(...Object.values(SchoolGrades)),  
    allowNull: false
  },
  
  division: {
    type: DataTypes.STRING(10), // Libre: acepta "A", "B", "1ra", "Única"
    allowNull: false
  },

  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { 
  timestamps: false,

});

export default Course;