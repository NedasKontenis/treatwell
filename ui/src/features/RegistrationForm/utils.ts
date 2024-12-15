export const passwordChecks = (password) => {
  return {
    length: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const getRequirementLabel = (key) => {
  switch (key) {
    case 'length':
      return '8 or more characters';
    case 'hasUpperCase':
      return 'One uppercase letter';
    case 'hasLowerCase':
      return 'One lowercase letter';
    case 'hasNumber':
      return 'One number';
    case 'hasSpecialChar':
      return 'One special character (!@#$%^&*(),.?":{}|<>)';
    default:
      return '';
  }
};
