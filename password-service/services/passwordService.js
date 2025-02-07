const bcrypt = require('bcrypt');

// Encrypt a password
function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

// Decrypt a password (placeholder, bcrypt does not allow reverse decryption)
function decryptPassword(encryptedPassword) {
    return 'Decryption not possible with bcrypt'; // Placeholder
}

module.exports = { encryptPassword, decryptPassword };
