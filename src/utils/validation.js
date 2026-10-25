import { isValidPhoneNumber } from "libphonenumber-js";

// Email validation - secure regex pattern
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

// Password validation
export const isValidPassword = (password) => {
  return password && password.length >= 8;
};

// Phone number validation
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  return isValidPhoneNumber(phone);
};

// Name validation
export const isValidName = (name) => {
  return name && name.trim().length >= 2;
};

// Form validation helper
export const validateRegistrationForm = (formData, step) => {
  const errors = {};

  switch (step) {
    case 'account':
      if (!formData.email || !isValidEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!formData.password || !isValidPassword(formData.password)) {
        errors.password = 'Password must be at least 8 characters';
      }
      if (formData.confirmPassword && formData.password && formData.confirmPassword !== formData.password) {
        errors.confirmPassword = 'Passwords do not match';
      }
      break;

    case 'personal':
      if (!formData.firstName || !isValidName(formData.firstName)) {
        errors.firstName = 'First name is required';
      }
      if (!formData.lastName || !isValidName(formData.lastName)) {
        errors.lastName = 'Last name is required';
      }
      if (!formData.phoneNumber || !isValidPhone(formData.phoneNumber)) {
        errors.phoneNumber = 'Please enter a valid phone number';
      }
      break;

    case 'security':
      if (!formData.agreeToTerms) {
        errors.agreeToTerms = 'You must agree to the terms and conditions';
      }
      break;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
