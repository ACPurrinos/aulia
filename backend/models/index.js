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

// --- ROLES Y USUARIOS ---
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// --- RELACIÓN 1 A 1: ESTUDIANTE - USUARIO ---
User.hasOne(Student, {
  foreignKey: 'userId',
  onDelete: 'CASCADE' 
});
Student.belongsTo(User, {
  foreignKey: 'userId'
});

// --- ESTRUCTURA ESCOLAR ---
Course.hasMany(Student, { foreignKey: 'courseId' });
Student.belongsTo(Course, { foreignKey: 'courseId' });

Student.hasMany(FamilyMember, { foreignKey: 'studentId' });
FamilyMember.belongsTo(Student, { foreignKey: 'studentId' });

// --- SEGUIMIENTO Y CHECK-INS ---
Student.hasMany(CheckIn, { foreignKey: 'studentId' });
CheckIn.belongsTo(Student, { foreignKey: 'studentId' });

Course.hasMany(CheckIn, { foreignKey: 'courseId' }); 
CheckIn.belongsTo(Course, { foreignKey: 'courseId' });

Student.hasMany(Alert, { foreignKey: 'studentId' });
Alert.belongsTo(Student, { foreignKey: 'studentId' });

// --- GABINETE (DERIVACIONES E INTERVENCIONES) ---
// ReferrerId es el Docente/Preceptor que inicia la derivación
User.hasMany(Referral, { foreignKey: 'referrerId' });
Referral.belongsTo(User, { foreignKey: 'referrerId' });

Student.hasMany(Referral, { foreignKey: 'studentId' });
Referral.belongsTo(Student, { foreignKey: 'studentId' });

// Legajo y Actuaciones
Student.hasMany(CaseFile, { foreignKey: 'studentId' });
CaseFile.belongsTo(Student, { foreignKey: 'studentId' });

CaseFile.hasMany(Intervention, { foreignKey: 'caseFileId' });
Intervention.belongsTo(CaseFile, { foreignKey: 'caseFileId' });

// ProfessionalId es el miembro del gabinete que hace la intervención
User.hasMany(Intervention, { foreignKey: 'professionalId' });
Intervention.belongsTo(User, { foreignKey: 'professionalId' });

// Un estudiante tiene muchos documentos (su carpeta completa)
Student.hasMany(Document, { foreignKey: 'studentId' });
Document.belongsTo(Student, { foreignKey: 'studentId' });

// Una intervención puede tener documentos adjuntos (informes, tests)
Intervention.hasMany(Document, { foreignKey: 'interventionId' });
Document.belongsTo(Intervention, { foreignKey: 'interventionId' });

// --- ASIGNACIONES DOCENTES (Muchos a Muchos) ---
const TeacherAssignment = sequelize.define('TeacherAssignment', {}, { 
    freezeTableName: true, 
    timestamps: false 
});

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