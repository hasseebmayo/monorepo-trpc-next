import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import turboPlugin from "eslint-plugin-turbo";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository with best practices.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Stylistic formatting rules
  stylistic.configs.customize({
    indent: 2,
    quotes: "double",
    semi: true,
    jsx: true,
    braceStyle: "1tbs",
  }),

  // Unicorn for modern JavaScript practices
  unicorn.configs["flat/recommended"],

  // Main configuration
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      // Turbo rules
      "turbo/no-undeclared-env-vars": "warn",

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // General rules
      "prefer-const": "warn",
      "no-var": "error",
      "object-shorthand": "warn",
      "prefer-template": "warn",

      // Unicorn rule adjustments
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-module": "off",
    },
  },

  // Convert errors to warnings
  {
    plugins: {
      onlyWarn,
    },
  },

  // Prettier config (must be last to override formatting rules)
  eslintConfigPrettier,

  // Ignore patterns
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/coverage/**",
      "**/.turbo/**",
      "**/drizzle/**",
    ],
  },
];

export default config;
