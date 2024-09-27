// module.exports = {
//   preset: 'jest',
//   testEnvironment: 'node',
//   testRegex: "__tests__/.*.e2e.test.js$",
// }

/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  testRegex: "__tests__/.*\\.e2e\\.test\\.js$", // Adjust regex to match your test files
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {
    "^.+\\.js$": "babel-jest", // Use Babel to transpile your test files
  },
};
