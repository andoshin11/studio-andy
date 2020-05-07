module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.js$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  verbose: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: false
    }
  }
}
