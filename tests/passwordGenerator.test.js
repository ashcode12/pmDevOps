const generatePassword = require("../utils/passwordGenerator");

describe("Password Generator Function", () => {
  test("Generates a password with default settings", () => {
    const password = generatePassword({});
    expect(password).toHaveLength(16);
    expect(typeof password).toBe("string");
  });

  test("Generates a password of specified length", () => {
    const password = generatePassword({ length: 32 });
    expect(password).toHaveLength(32);
  });

  test("Throws an error for invalid length", () => {
    expect(() => generatePassword({ length: 5 })).toThrow("Password length must be between 8 and 64 characters.");
    expect(() => generatePassword({ length: 100 })).toThrow("Password length must be between 8 and 64 characters.");
  });

  test("Throws an error if no character set is selected", () => {
    expect(() =>
      generatePassword({
        includeLowercase: false,
        includeUppercase: false,
        includeNumbers: false,
        includeSpecialChars: false,
      })
    ).toThrow("At least one character set must be selected.");
  });

  test("Generated password contains required character sets", () => {
    const password = generatePassword({
      length: 20,
      includeLowercase: true,
      includeUppercase: true,
      includeNumbers: true,
      includeSpecialChars: true,
    });

    expect(password).toMatch(/[a-z]/);
    expect(password).toMatch(/[A-Z]/);
    expect(password).toMatch(/[0-9]/);
    expect(password).toMatch(/[!@#$%^&*()_+\[\]{}|;:'",.<>?/`~]/);
  });
});
