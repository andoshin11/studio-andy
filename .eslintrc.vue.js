const baseConfig = require('./.eslintrc.ts.js')

const overrideConfig = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'plugin:vue/recommended'],
  rules: {
    ...baseConfig.rules,
    indent: 0,
    'vue/html-closing-bracket-newline': [
      'warn',
      {
        multiline: 'never'
      }
    ]
  }
}

module.exports = overrideConfig
