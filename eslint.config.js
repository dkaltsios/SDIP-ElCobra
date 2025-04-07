import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

import eslintComments from "eslint-plugin-eslint-comments";
import unicorn from "eslint-plugin-unicorn";
import sonarjs from "eslint-plugin-sonarjs";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      "eslint-comments": eslintComments,
      unicorn,
      sonarjs,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...eslintComments.configs.recommended.rules,
      ...unicorn.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
      "sonarjs/todo-tag": "off",

      // Your custom rules
      "semi": ["error", "always"],
      "quotes": [0, "double"],

      // Prettier compatibility: turn off conflicting formatting rules
      "unicorn/string-content": "off",
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
]);
