"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createWorkflow } from "@/features/workflows/data";
import { tasks, auth } from "@trigger.dev/sdk";
import type { helloWorldTask } from "@/trigger/example";

export async function createWorkflowAction(name: string) {
  const workflow = await createWorkflow(name);

  if (!workflow) {
    throw new Error("Failed to create workflow");
  }

  revalidatePath("/", "layout");
  redirect(`/workflows/${workflow.id}`);
}

export async function runWorkflowAction(name: string) {
  const handle = await tasks.trigger<typeof helloWorldTask>(
    "hello-world",
    { name }
  );

  const publicAccessToken = await auth.createPublicToken({
    scopes: { read: { runs: [handle.id] } },
  });

  return { runId: handle.id, publicAccessToken };
}
