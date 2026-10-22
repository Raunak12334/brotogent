import Link from "next/link"
import { Workflow } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function WorkflowNotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground">
      <Empty className="w-full max-w-md flex-none border-0">
        <EmptyHeader className="max-w-none gap-4">
          <EmptyMedia variant="icon" className="mb-2 size-9">
            <Workflow className="size-4" aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>Workflow not found</EmptyTitle>
          <EmptyDescription>
            This workflow doesn&apos;t exist or may have been deleted.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-4">
          <Link href="/workflows" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Back to workflows
          </Link>
        </EmptyContent>
      </Empty>
    </main>
  )
}
