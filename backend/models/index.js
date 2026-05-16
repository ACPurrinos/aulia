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
// ReferrerId es el Docente/Preceptor que inicia la derivación
User.hasMany(Referral, { foreignKey: 'referrerId', as: 'SubmittedReferrals' }); // Alias agregado
Referral.belongsTo(User, { foreignKey: 'referrerId', as: 'Referrer' });        // Alias agregado

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

// =========================
// NOTIFICATIONS
// =========================

User.hasMany(Notification, {
  foreignKey: 'userId'
});

Notification.belongsTo(User, {
  foreignKey: 'userId'
});

// =========================
// REFERRAL HISTORY
// =========================

Referral.hasMany(ReferralHistory, {
  foreignKey: 'referralId'
});

ReferralHistory.belongsTo(Referral, {
  foreignKey: 'referralId'
});

User.hasMany(ReferralHistory, {
  foreignKey: 'changedBy'
});

ReferralHistory.belongsTo(User, {
  foreignKey: 'changedBy'
});

// =========================
// REFERRAL MESSAGES
// =========================

Referral.hasMany(ReferralMessage, {
  foreignKey: 'referralId'
});

ReferralMessage.belongsTo(Referral, {
  foreignKey: 'referralId'
});

// El usuario (persona) que redactó el mensaje dentro de la derivación
User.hasMany(ReferralMessage, { foreignKey: 'senderId' });
ReferralMessage.belongsTo(User, { foreignKey: 'senderId', as: 'Sender' });


// =========================
// TEACHER ASSIGNMENTS
// =========================

// Un docente tiene muchas asignaciones
User.hasMany(TeacherAssignment, {
  foreignKey: 'teacherId'
});

TeacherAssignment.belongsTo(User, {
  foreignKey: 'teacherId'
});

// Un curso tiene muchas asignaciones
Course.hasMany(TeacherAssignment, {
  foreignKey: 'courseId'
});

TeacherAssignment.belongsTo(Course, {
  foreignKey: 'courseId'
});

// Una materia tiene muchas asignaciones
Subject.hasMany(TeacherAssignment, {
  foreignKey: 'subjectId'
});

TeacherAssignment.belongsTo(Subject, {
  foreignKey: 'subjectId'
});

User.hasMany(Referral, {
  foreignKey: 'reviewedBy',
  as: 'ReviewedReferrals'
});

Referral.belongsTo(User, {
  foreignKey: 'reviewedBy',
  as: 'Reviewer'
});

Referral.hasOne(CaseFile, {
  foreignKey: 'referralId'
});

CaseFile.belongsTo(Referral, {
  foreignKey: 'referralId'
});

// =========================
// ALERTS
// =========================


// Una derivación puede generar una alerta (o ninguna)
Referral.hasOne(Alert, { foreignKey: 'referralId' });
Alert.belongsTo(Referral, { foreignKey: 'referralId' });

// El usuario (Docente/Gabinete) que detecta y carga la alerta manualmente
User.hasMany(Alert, { foreignKey: 'createdById', as: 'CreatedAlerts' });
Alert.belongsTo(User, { foreignKey: 'createdById', as: 'Creator' });

// Para filtrar alertas por curso rápidamente
Course.hasMany(Alert, { foreignKey: 'courseId' });
Alert.belongsTo(Course, { foreignKey: 'courseId' });

// Para saber qué acción del gabinete dio respuesta a esta alerta
Intervention.hasMany(Alert, { foreignKey: 'interventionId' });
Alert.belongsTo(Intervention, { foreignKey: 'interventionId' });

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