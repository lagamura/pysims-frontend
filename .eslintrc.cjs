/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    '@typescript-eslint'
  ],
  plugins: [
    '@typescript-eslint',
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: {
    "vue/script-setup-uses-vars": true,
  }
};
