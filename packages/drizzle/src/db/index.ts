import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../schemas";

// Database connection
export function createConnection(connectionString: string) {
  const client = postgres(connectionString);
  return drizzle(client, { schema });
}

// Default connection (will use environment variables)
const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/mydb";

export const db = createConnection(connectionString);

// Export the schema for use in migrations

export * as schema from "../schemas";
