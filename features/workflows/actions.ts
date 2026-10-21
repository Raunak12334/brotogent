"use server"

import { db, workflows } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getWorkflows(workspaceId = "bar-inc") {
  try {
    return await db
      .select()
      .from(workflows)
      .where(eq(workflows.workspaceId, workspaceId))
      .orderBy(desc(workflows.createdAt));
  } catch (error) {
    console.error("Failed to fetch workflows:", error);
    return [];
  }
}

export async function createWorkflowAction(name: string, workspaceId = "bar-inc") {
  try {
    const slug =
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `workflow-${Date.now()}`;

    const [created] = await db
      .insert(workflows)
      .values({
        id: `${slug}-${Math.floor(Math.random() * 1000)}`,
        name,
        workspaceId,
        status: "active",
      })
      .returning();

    revalidatePath("/");
    return { success: true, data: created };
  } catch (error) {
    console.error("Failed to create workflow:", error);
    return { success: false, error: "Failed to create workflow" };
  }
}
