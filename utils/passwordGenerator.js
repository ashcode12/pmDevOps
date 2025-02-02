const crypto = require("crypto");

/**
 * Generates a secure password based on user options.
 * @param {Object} options - The options for password generation.
 * @param {number} options.length - The length of the password (default: 16).
 * @param {boolean} options.includeLowercase - Whether to include lowercase letters.
 * @param {boolean} options.includeUppercase - Whether to include uppercase letters.
 * @param {boolean} options.includeNumbers - Whether to include numbers.
 * @param {boolean} options.includeSpecialChars - Whether to include special characters.
 * @returns {string} - The generated secure password.
 */
function generatePassword({
  length = 16,
  includeLowercase = true,
  includeUppercase = true,
  includeNumbers = true,
  includeSpecialChars = true,
} = {}) {
  if (length < 8 || length > 64) {
    throw new Error("Password length must be between 8 and 64 characters.");
  }

  const charSets = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    specialChars: "!@#$%^&*()_+[]{}|;:'\",.<>?/`~",
  };

  let charPool = "";
  if (includeLowercase) charPool += charSets.lowercase;
  if (includeUppercase) charPool += charSets.uppercase;
  if (includeNumbers) charPool += charSets.numbers;
  if (includeSpecialChars) charPool += charSets.specialChars;

  if (!charPool) {
    throw new Error("At least one character set must be selected.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charPool.length);
    password += charPool[randomIndex];
  }

  return password;
}

module.exports = generatePassword;
