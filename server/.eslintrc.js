module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'import/no-extraneous-dependencies': 0,
    'no-console': 0,
    'no-restricted-syntax': 0,
    'no-case-declarations': 0,
  },
};
