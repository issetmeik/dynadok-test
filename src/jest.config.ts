export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
};
