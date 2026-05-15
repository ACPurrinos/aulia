import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

const CaseFile = sequelize.define('CaseFile', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  openingDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  subject: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium'
  },

  status: {
    type: DataTypes.ENUM('Open', 'Closed'),
    defaultValue: 'Open'
  },

  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'id'
    }
  },
  referralId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'Referral',
    key: 'id'
  }
}

}, {
  timestamps: true,
  paranoid: true
});

export default CaseFile;