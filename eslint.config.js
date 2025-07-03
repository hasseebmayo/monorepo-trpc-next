import { config } from "@workspace/eslint-config/base";

export default [
  ...config,
  {
    ignores: ["apps/**", "packages/**", "dist/**", "build/**", ".next/**", "node_modules/**"],
  },
];
