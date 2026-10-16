import { Plus, Workflow } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground">
      <Empty className="w-full max-w-md flex-none border-0">
        <EmptyHeader className="max-w-none gap-4">
          <EmptyMedia variant="icon" className="mb-2 size-9">
            <Workflow className="size-4" aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No workflow selected</EmptyTitle>
          <EmptyDescription>
            Select a workflow from the sidebar or create a new one to get
            started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-4">
          <Button type="button" size="lg">
            <Plus data-icon="inline-start" aria-hidden="true" />
            New workflow
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
