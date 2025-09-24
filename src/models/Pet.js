// models/Pet.js
const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');
const User = require('./User');

const Pet = sequelize.define('Pet', {
  name: { type: DataTypes.STRING, allowNull: false },
  species: { type: DataTypes.STRING },
  breed: { type: DataTypes.STRING },
  gender: { type: DataTypes.ENUM('male','female','unknown') },
  birth_date: { type: DataTypes.DATEONLY },
  image_url: { type: DataTypes.STRING },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Relation
Pet.belongsTo(User, { foreignKey: 'owner_id', onDelete: 'CASCADE' });
User.hasMany(Pet, { foreignKey: 'owner_id' });

module.exports = Pet;
