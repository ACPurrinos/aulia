import sequelize from '../data/db.js';

import User from './User.js';
import Role from './Role.js';
import Student from './Student.js';
import FamilyMember from './FamilyMember.js';
import CheckIn from './CheckIn.js';
import Referral from './Referral.js';
import CaseFile from './CaseFile.js';
import Intervention from './Intervention.js';
import Alert from './Alert.js';
import Document from './Document.js';
import Subject from './Subject.js';
import Course from './Course.js';

Role.hasMany(User);
User.belongsTo(Role);

Course.hasMany(Student);
Student.belongsTo(Course);
Student.hasMany(FamilyMember);
FamilyMember.belongsTo(Student);

Student.hasMany(CheckIn);
CheckIn.belongsTo(Student);
Course.hasMany(CheckIn); 
CheckIn.belongsTo(Course);
Student.hasMany(Alert);
Alert.belongsTo(Student);

User.hasMany(Referral);
Referral.belongsTo(User);
Student.hasMany(Referral);
Referral.belongsTo(Student);

Student.hasMany(CaseFile);
CaseFile.belongsTo(Student);
CaseFile.hasMany(Intervention);
Intervention.belongsTo(CaseFile);
User.hasMany(Intervention);
Intervention.belongsTo(User);

Student.hasMany(Document);
Document.belongsTo(Student);
Intervention.hasMany(Document);
Document.belongsTo(Intervention);

const TeacherAssignment = sequelize.define('TeacherAssignment', {}, { timestamps: false });
User.belongsToMany(Subject, { through: TeacherAssignment });
Subject.belongsToMany(User, { through: TeacherAssignment });
User.belongsToMany(Course, { through: TeacherAssignment });
Course.belongsToMany(User, { through: TeacherAssignment });
Subject.belongsToMany(Course, { through: TeacherAssignment });
Course.belongsToMany(Subject, { through: TeacherAssignment });

export {
  sequelize,
  User,
  Role,
  Student,
  FamilyMember,
  CheckIn,
  Referral,
  CaseFile,
  Intervention,
  Alert,
  Document,
  Subject,
  Course,
  TeacherAssignment
};