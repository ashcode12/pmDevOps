### **Requirements & Best Practices for Secure Password Generation**
Before implementing the password generation feature, let's define the key requirements and best practices.

---

### **🔹 Functional Requirements**
1. **Configurable Password Length**
   - The user should be able to specify the desired length (default: 16 characters).
   - Minimum length: 8 characters.
   - Maximum length: 64 characters.

2. **Character Set Customization**
   - Users should be able to include/exclude the following:
     - **Lowercase letters** (`a-z`)
     - **Uppercase letters** (`A-Z`)
     - **Numbers** (`0-9`)
     - **Special characters** (`!@#$%^&*()_+[]{}|;:'",.<>?/` etc.)

3. **Strong Entropy**
   - Ensure the randomness is cryptographically secure (use `crypto` module in Node.js instead of `Math.random`).
   - Avoid predictable patterns.

4. **Avoid Ambiguous Characters (Optional)**
   - Some characters look similar (`O` and `0`, `l` and `1`), which might be confusing.
   - Provide an option to exclude them.

5. **Copy to Clipboard Functionality (Frontend)**
   - Allow users to easily copy the generated password.

---

### **🔹 Best Practices for Security**
✅ **Use a Cryptographic Random Generator**
- `crypto.randomInt()` or `crypto.getRandomValues()` (instead of `Math.random()`).

✅ **Ensure a Good Mix of Character Types**
- Encourage users to select all types (but allow customization).

✅ **Prevent Weak Passwords**
- Enforce a minimum length.
- Discourage using only one type of character (e.g., all numbers).

✅ **User Experience Considerations**
- Provide instant feedback when generating a password.
- Make it easy to regenerate if the user is not satisfied.

---

### **🔹 Implementation Plan**
1. Create a function `generatePassword(options)`.
2. Use the `crypto` module for randomness.
3. Validate user inputs.
4. Return a strong password based on selected options.

---