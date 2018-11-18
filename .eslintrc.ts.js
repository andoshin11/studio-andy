const baseConfig = require('./.eslintrc.js')

const overrideConfig = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'eslint:recommended', 'typescript'],
  parserOptions: {
    ...baseConfig.parserOptions,
    parser: 'typescript-eslint-parser'
  },
  plugins: [...baseConfig.plugins, 'typescript'],
  rules: {
    ...baseConfig.rules,
    'no-undef': 'off',
    'typescript/interface-name-prefix': 'warn',
    'typescript/explicit-member-accessibility': 'off',
    'typescript/member-ordering': 'off',
    'typescript/no-parameter-properties': 'off',
    'typescript/member-delimiter-style': 'off',
    'typescript/interface-name-prefix': 'off'
  }
}

module.exports = overrideConfig
