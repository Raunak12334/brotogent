"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createWorkflow } from "@/features/workflows/data";

export async function createWorkflowAction(name: string) {
  const workflow = await createWorkflow(name);

  if (!workflow) {
    throw new Error("Failed to create workflow");
  }

  revalidatePath("/", "layout");
  redirect(`/workflows/${workflow.id}`);
}
