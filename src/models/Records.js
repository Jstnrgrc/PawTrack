// models/Record.js
const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');
const Pet = require('./Pet');
const User = require('./User');

const Record = sequelize.define('Record', {
  record_type: { 
    type: DataTypes.ENUM('consultation','vaccination','surgery','grooming','checkup','billing','other'), 
    allowNull: false 
  },
  visit_date: { type: DataTypes.DATEONLY, allowNull: false },
  description: { type: DataTypes.TEXT },
  notes: { type: DataTypes.TEXT },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Relations
Record.belongsTo(Pet, { foreignKey: 'pet_id', onDelete: 'CASCADE' });
Pet.hasMany(Record, { foreignKey: 'pet_id' });

Record.belongsTo(User, { foreignKey: 'staff_id', onDelete: 'SET NULL' });
User.hasMany(Record, { foreignKey: 'staff_id' });

module.exports = Record;
