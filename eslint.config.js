const cypress = require("eslint-plugin-cypress");

module.exports = [
  {
    ignores: [
      "cypress/reports/**",
      "cypress/screenshots/**",
      "cypress/videos/**",
    ],
  },

  {
    files: ["cypress/**/*.js"],

    plugins: {
      cypress,
    },

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
      },
    },

    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];