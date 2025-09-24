import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const User = sequelize.define('User', {
  first_name: { type: DataTypes.STRING, allowNull: false },
  middle_name: { type: DataTypes.STRING, allowNull: true },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin','staff','client'), defaultValue: 'client' },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'users',
  timestamps: true,           // enable createdAt and updatedAt
  createdAt: 'created_at',    // rename column
  updatedAt: 'updated_at',    // rename column
});

export default User;
