import { DataTypes } from 'sequelize';
import sequelize from '../data/db.js';
import { UserRolesEnum } from '../Enums/index.js'; 

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
  // Relación manual (Foreign Key) por si Sequelize no la crea automáticamente
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Role', 
      key: 'id'
    }
  }
}, {
  timestamps: true,
  // ESTO ES CLAVE: Protege la contraseña en las consultas
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: { attributes: {}, }
  }
});

export default User;