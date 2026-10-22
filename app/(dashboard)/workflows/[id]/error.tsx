"use client"

import { TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface WorkflowErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function WorkflowError({ error, reset }: WorkflowErrorProps) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground">
      <Empty className="w-full max-w-md flex-none border-0">
        <EmptyHeader className="max-w-none gap-4">
          <EmptyMedia variant="icon" className="mb-2 size-9">
            <TriangleAlert className="size-4" aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            {error.message ?? "An unexpected error occurred while loading this workflow."}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-4">
          <Button type="button" size="lg" onClick={reset}>
            Try again
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
