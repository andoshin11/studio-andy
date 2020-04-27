module.exports = {
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.js$': 'ts-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  verbose: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  }
}
