// models/Addresses.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';
import User from './User.js';

const Address = sequelize.define('Addresses', {
  street: { type: DataTypes.STRING },
  barangay: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  zip_code: { type: DataTypes.STRING(20) }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Address.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Address, { foreignKey: 'user_id' });

export default Address; // ✅ ES module export