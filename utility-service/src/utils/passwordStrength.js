const zxcvbn = require('zxcvbn');

const checkStrength = (password) => {
  return zxcvbn(password).score;
};

module.exports = checkStrength;
