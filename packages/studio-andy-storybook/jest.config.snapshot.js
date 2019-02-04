module.exports = {
  moduleFileExtensions: ['vue', 'js', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.(js|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/.jest/babel-vue-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../studio-andy-app/src/$1',
    '^@storybook/(.*)$': '<rootDir>/node_modules/@storybook/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['<rootDir>/test/snapshot/*.js'],
  verbose: true,
  setupFiles: ['./.jest/register-context.js']
}
