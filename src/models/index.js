const sequelize = require('../config/db');
const User = require('./userModel');
const VaultEntry = require('./vaultModel');

// If needed, define associations here, e.g.:
// User.hasMany(VaultEntry, { foreignKey: 'userId' });
// VaultEntry.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  VaultEntry
};
