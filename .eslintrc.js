module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
  },
  extends: [
    'standard',
    'plugin:vue/recommended', // or 'plugin:vue/base'
  ],
  'env': {
    'browser': true,
    "es6": true
  },
  // add your custom rules here
  'rules': {
    'eqeqeq': ['error', 'always'],
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // trailing comma
    'comma-dangle': ['error', 'always-multiline'],
  }
}
