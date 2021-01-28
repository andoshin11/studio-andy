module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['error', 'never'],
    'require-jsdoc': 'off'
  }
}
