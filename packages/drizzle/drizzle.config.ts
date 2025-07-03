import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schemas/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://hasseebmayo:hasseebmayo@localhost:5432/mydb",
  },
  verbose: true,
  strict: true,
});
