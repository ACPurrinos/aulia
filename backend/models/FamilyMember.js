import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { FamilyRelationships } from '../enums/index.js';

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
    type: DataTypes.ENUM(...Object.values(FamilyRelationships)), // 'Madre', 'Padre', 'Tutor Legal', etc.
    allowNull: false
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