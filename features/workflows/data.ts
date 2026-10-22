"use server"

import { db, workflows } from "@/lib/db";
import { desc } from "drizzle-orm";


export async function listWorkflows() {
  return await db
    .select()
    .from(workflows)
    .orderBy(desc(workflows.createdAt));
}


export async function createWorkflow(name: string) {
  const [workflow] = await db
    .insert(workflows)
    .values({ name })
    .returning();

  return workflow
}
