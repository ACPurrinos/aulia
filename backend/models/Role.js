import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true 
  }
}, { timestamps: false });

export default Role;