// import type { Config } from '@jest/types';
// import { pathsToModuleNameMapper } from 'ts-jest'
// import { compilerOptions } from './tsconfig.json'

// const config: Config.InitialOptions = {
//     preset: 'ts-jest',
//     testEnvironment: 'jsdom',
//     transform: {
//         "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
//     },
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//     transformIgnorePatterns: ['<rootDir>/node_modules/'],
//     moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' })


// };

// export default config;


import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary'],

};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
