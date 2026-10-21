"use server"

import { db, workspaces } from "@/lib/db";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getWorkspaces() {
  try {
    return await db.select().from(workspaces).orderBy(desc(workspaces.createdAt));
  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    return [];
  }
}

export async function createWorkspaceAction(name: string) {
  try {
    const slug =
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `ws-${Date.now()}`;

    const [created] = await db
      .insert(workspaces)
      .values({
        id: slug,
        name,
      })
      .returning();

    revalidatePath("/");
    return { success: true, data: created };
  } catch (error) {
    console.error("Failed to create workspace:", error);
    return { success: false, error: "Failed to create workspace" };
  }
}
