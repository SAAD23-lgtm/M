module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleNameMapper: {
    '^react$': '<rootDir>/../node_modules/react',
    '^react/jsx-runtime$': '<rootDir>/../node_modules/react/jsx-runtime',
    '^react/jsx-dev-runtime$': '<rootDir>/../node_modules/react/jsx-dev-runtime',
    '^react-test-renderer$': '<rootDir>/../node_modules/jest-expo/node_modules/react-test-renderer',
    '^react-test-renderer/package.json$':
      '<rootDir>/../node_modules/jest-expo/node_modules/react-test-renderer/package.json',
    '^expo/src/winter/(.*)$': '<rootDir>/tests/mocks/emptyMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|react-native|expo(nent)?|@expo(nent)?/.*|expo-router|@expo/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg))',
  ],
};
