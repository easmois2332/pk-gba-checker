import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ['/node_modules'],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    ...tsJestTransformCfg,
  },
};