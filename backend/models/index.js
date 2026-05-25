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
import Notification from './Notification.js';
import ReferralHistory from './ReferralHistory.js';
import ReferralMessage from './ReferralMessage.js';
import TeacherAssignment from './TeacherAssignment.js';

// --- ROLES Y USUARIOS ---
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// --- RELACIÓN 1 A 1: ESTUDIANTE - USUARIO ---
User.hasOne(Student, {
  foreignKey: {
    name:'userId',
    allowNull: false,
    unique: true
  },
  onDelete: 'CASCADE' 
});
Student.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
    unique: true
  }
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
User.hasMany(Referral, { foreignKey: 'referrerId', as: 'submittedReferrals' });
Referral.belongsTo(User, { foreignKey: 'referrerId', as: 'referrer' });        

User.hasMany(Referral, { foreignKey: 'reviewedBy', as: 'reviewedReferrals' });
Referral.belongsTo(User, { foreignKey: 'reviewedBy', as: 'reviewer' });

Student.hasMany(Referral, { foreignKey: 'studentId' });
Referral.belongsTo(Student, { foreignKey: 'studentId' });

// Legajo y Actuaciones (Relación bidireccional unificada)

CaseFile.hasMany(Referral, { foreignKey: 'caseFileId' });
Referral.belongsTo(CaseFile, { foreignKey: 'caseFileId' });

Student.hasOne(CaseFile, {foreignKey: 'studentId'});
CaseFile.belongsTo(Student, {foreignKey: 'studentId'});

CaseFile.hasMany(Intervention, { foreignKey: 'caseFileId' });
Intervention.belongsTo(CaseFile, { foreignKey: 'caseFileId' });

User.hasMany(Intervention, {
  foreignKey: 'professionalId',
  as: 'interventions'
});

Intervention.belongsTo(User, {
  foreignKey: 'professionalId',
  as: 'professional'
});

// Documentación de Alumnos e Intervenciones


Intervention.hasMany(Document, { foreignKey: 'interventionId' });
Document.belongsTo(Intervention, { foreignKey: 'interventionId' });

// =========================
// REFERRAL HISTORY
// =========================
Referral.hasMany(ReferralHistory, { foreignKey: 'referralId' });
ReferralHistory.belongsTo(Referral, { foreignKey: 'referralId' });

User.hasMany(ReferralHistory, {foreignKey: 'changedBy', as: 'historyChanges'});
ReferralHistory.belongsTo(User, {foreignKey: 'changedBy', as: 'changedByUser'});

// =========================
// REFERRAL MESSAGES (CHAT)
// =========================
Referral.hasMany(ReferralMessage, { foreignKey: 'referralId' });
ReferralMessage.belongsTo(Referral, { foreignKey: 'referralId' });

User.hasMany(ReferralMessage, {
  foreignKey: 'userId',
  as: 'messages'
});

ReferralMessage.belongsTo(User, {
  foreignKey: 'userId',
  as: 'sender'
});

// =========================
// NOTIFICATIONS
// =========================
User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

// =========================
// TEACHER ASSIGNMENTS
// =========================
User.hasMany(TeacherAssignment, { foreignKey: 'teacherId' });
TeacherAssignment.belongsTo(User, { foreignKey: 'teacherId' });

Course.hasMany(TeacherAssignment, { foreignKey: 'courseId' });
TeacherAssignment.belongsTo(Course, { foreignKey: 'courseId' });

Subject.hasMany(TeacherAssignment, { foreignKey: 'subjectId' });
TeacherAssignment.belongsTo(Subject, { foreignKey: 'subjectId' });

// =========================
// ALERTS
// =========================
Referral.hasMany(Alert, { foreignKey: 'referralId' });
Alert.belongsTo(Referral, { foreignKey: 'referralId' });

User.hasMany(Alert, { foreignKey: 'createdById', as: 'createdAlerts' });
Alert.belongsTo(User, { foreignKey: 'createdById', as: 'creator' });

Course.hasMany(Alert, { foreignKey: 'courseId' });
Alert.belongsTo(Course, { foreignKey: 'courseId' });

Intervention.hasMany(Alert, { foreignKey: 'interventionId' });
Alert.belongsTo(Intervention, { foreignKey: 'interventionId' });

User.hasMany(Document, {
  foreignKey: 'uploadedBy',
  as: 'uploadedDocuments'
});

Document.belongsTo(User, {
  foreignKey: 'uploadedByUserId',
  as: 'uploader'
});

CaseFile.hasMany(Document, { foreignKey: 'caseFileId' });
Document.belongsTo(CaseFile, { foreignKey: 'caseFileId' });


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
  TeacherAssignment,
  Notification,
  ReferralHistory,
  ReferralMessage
};