import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Content-heavy marketing site: keep core Next rules, but avoid blocking
 * deploys on blog prose apostrophes / intentional intelhub `any` debt.
 * Tighten gradually; prefer new code clean.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Node / Worker entrypoints not using ESM app conventions
    "scripts/**",
    "workers/**",
  ]),
  {
    rules: {
      // Blog/tutorial prose uses straight quotes extensively
      "react/no-unescaped-entities": "off",
      // Gradual typing; do not fail CI on historical intelhub types
      "@typescript-eslint/no-explicit-any": "off",
      // React Compiler-oriented rules: noisy on existing dashboards
      "react-hooks/purity": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
      // Prefer warnings for unused during content iteration
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
