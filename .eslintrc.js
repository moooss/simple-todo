module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    curly: ['error', 'all'],
    'no-console': 2,
    'no-undef': 0,
    'no-var': 2,
    'prefer-const': 2,
    // Disable prettier errors as they will automatically be fixed at commit anyway.
    'prettier/prettier': 0,
    'react/react-in-jsx-scope': 'off',
  },
};
