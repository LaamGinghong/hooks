export default {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)s$': [
      'babel-jest',
      {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: true,
              },
            },
          ],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/.vitepress'],
  reporters: ['default', 'jest-junit'],
}
