import { FormErrors } from '@/types';

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!email.includes('@')) return 'Please enter a valid email';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email';
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateDisplayName = (name: string): string | null => {
  if (!name) return 'Display name is required';
  if (name.trim().length < 2) return 'Display name must be at least 2 characters';
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

export const validateSignInForm = (email: string, password: string): FormErrors => {
  const errors: FormErrors = {};
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

export const validateSignUpForm = (
  email: string,
  password: string,
  confirmPassword: string,
  displayName: string
): FormErrors => {
  const errors: FormErrors = {};
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  const displayNameError = validateDisplayName(displayName);
  if (displayNameError) errors.displayName = displayNameError;
  
  return errors;
};

export const validateProfileForm = (displayName: string, email: string): FormErrors => {
  const errors: FormErrors = {};
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const displayNameError = validateDisplayName(displayName);
  if (displayNameError) errors.displayName = displayNameError;
  
  return errors;
};
