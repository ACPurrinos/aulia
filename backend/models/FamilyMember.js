import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const FamilyMember = sequelize.define('FamilyMember', {
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
  relationship: {
    type: DataTypes.STRING(45) // Ej: 'Mother', 'Father', 'Guardian'
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  email: {
    type: DataTypes.STRING(45),
    validate: { isEmail: true }
  }
}, { timestamps: false });

export default FamilyMember;