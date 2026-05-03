import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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
  }
});

export default CaseFile;