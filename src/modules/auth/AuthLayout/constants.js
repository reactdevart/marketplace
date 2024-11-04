const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LOGIN_FORM = {
  email: {
    value: 'reactdevart@gmail.com',
    required: true,
    pattern: EMAIL_PATTERN,
  },
  password: {
    value: '}9`+W7d6vb08ddd',
    required: true,
    minLength: 8,
    isPassword: true,
  },
};

const FORGOT_PASSWORD_FORM = {
  email: {
    value: '',
    required: true,
    pattern: EMAIL_PATTERN,
  },
};

const RESET_PASSWORD_FORM = {
  email: {
    value: '',
    required: true,
    pattern: EMAIL_PATTERN,
  },
  password: {
    value: '',
    required: true,
    minLength: 8,
    isPassword: true,
  },
};
const REGISTER_INDIVIDUAL_FORM = {
  first_name: {
    value: '',
    required: true,
    minLength: 3,
  },
  last_name: {
    value: '',
    required: true,
    minLength: 3,
  },
  email: {
    value: '',
    required: true,
    pattern: EMAIL_PATTERN,
  },
  password: {
    value: '',
    required: true,
    minLength: 8,
    isPassword: true,
  },
  password_confirmation: {
    value: '',
    required: true,
    isConfirmPassword: true,
  },
  accept_terms: {
    value: false,
    isCheckbox: true,
    required: true,
  },
};

const REGISTER_COMPANY_FORM = {
  company_name: {
    value: '',
    required: true,
    minLength: 3,
  },
  email: {
    value: '',
    required: true,
    pattern: EMAIL_PATTERN,
  },
  license_code: {
    value: '',
    required: true,
    min: 3,
    max: 10,
    isNumber: true,
  },
  password: {
    value: '',
    required: true,
    minLength: 8,
    isPassword: true,
  },
  password_confirmation: {
    value: '',
    required: true,
    isConfirmPassword: true,
  },
  accept_terms: {
    value: false,
    isCheckbox: true,
    required: true,
  },
};

export { FORGOT_PASSWORD_FORM, LOGIN_FORM, REGISTER_COMPANY_FORM, REGISTER_INDIVIDUAL_FORM, RESET_PASSWORD_FORM };
