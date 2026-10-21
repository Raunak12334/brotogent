import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/db/schema";

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(connectionString);
const db = drizzle({ client: sql, schema });

async function seed() {
  console.log("Seeding Neon database...");

  // Insert workspaces
  await db
    .insert(schema.workspaces)
    .values([
      { id: "bar-inc", name: "Bar Inc." },
      { id: "acme-corp", name: "Acme Corp" },
    ])
    .onConflictDoNothing();

  console.log("Seeded workspaces.");

  // Insert workflows
  const initialWorkflows = [
    "dominant-wasp",
    "honest-reindeer",
    "expected-llama",
    "essential-ocelot",
    "creepy-echidna",
    "eastern-silkworm",
    "cultural-lion",
    "proud-weasel",
    "regional-bonobo",
  ];

  await db
    .insert(schema.workflows)
    .values(
      initialWorkflows.map((slug) => ({
        id: slug,
        name: slug,
        workspaceId: "bar-inc",
        status: "active",
      }))
    )
    .onConflictDoNothing();

  console.log("Seeded workflows.");
  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
