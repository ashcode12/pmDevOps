const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VaultEntry = sequelize.define('VaultEntry', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  encryptedPassword: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = VaultEntry;
