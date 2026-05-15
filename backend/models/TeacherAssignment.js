import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';


const TeacherAssignment = sequelize.define('TeacherAssignment', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  academicYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  freezeTableName: true,
  timestamps: true,

  indexes: [
    {
      unique: true,
      fields: [
        'teacherId',
        'courseId',
        'subjectId',
        'academicYear'
      ]
    }
  ]
});

export default TeacherAssignment;