import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const connectionString = process.env.DB_URL;

console.log(`Migrating database at ${connectionString}`);

const client = postgres(connectionString, { prepare: false, max: 1 });
const db = drizzle(client);

await migrate(db, { migrationsFolder: "../db/migrations" });
await client.end({ timeout: 1 });
console.log("Database migrated successfully!");
