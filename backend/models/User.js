import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { UserRolesEnum } from '../enums/index.js'; 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true 
  },
  firstName: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
    // Nota: Aquí guardarás el hash de bcrypt, no el texto plano
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  
}, {
  timestamps: true,
  // Protege la contraseña excluyendola de las consultas
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: { attributes: {}, }
  }
});

export default User;