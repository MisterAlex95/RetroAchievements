// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  rules: {
    semi: "error",
    "prefer-const": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-unused-vars": "error",
    "no-undef": "error",
  },
  extends: ["prettier", "expo"],
  plugins: ["simple-import-sort"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
};
