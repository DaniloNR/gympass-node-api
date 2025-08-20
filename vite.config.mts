import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: "src",
    projects: [
      {
        extends: true,
        test: {
          name: "e2e",
          include: ["http/controllers/**/__tests__/*.spec.ts"],
          environment: "./vitest-environments/prisma.ts",
        },
      },
      {
        extends: true,
        test: {
          name: "unit",
          include: ["use-cases/**/__tests__/*.spec.ts"],
          environment: "node",
        },
      },
    ],
  },
});