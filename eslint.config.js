import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        browser: true,
        es2021: true
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"]
    }
  }
];