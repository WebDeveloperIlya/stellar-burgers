import type { Config } from '@jest/types';

module.exports = {
  // Предотвращает обработку нестандартных файлов
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@ui/(.*)$': '<rootDir>/src/ui/$1',
    '^@utils-types/(.*)$': '<rootDir>/src/utils-types/$1'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Если используете TypeScript
    '^.+\\.jsx?$': 'babel-jest' // Если используете Babel
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts', '<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom'
  // Другие настройки
};
