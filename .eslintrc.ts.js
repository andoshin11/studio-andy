const baseConfig = require('./.eslintrc.js')

const overrideConfig = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ...baseConfig.parserOptions,
    parser: '@typescript-eslint/parser'
  },
  plugins: [...baseConfig.plugins, '@typescript-eslint'],
  rules: {
    ...baseConfig.rules,
    'no-undef': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off'
  }
}

module.exports = overrideConfig
