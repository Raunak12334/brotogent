import { Spinner } from "@/components/ui/spinner"

export default function WorkflowLoading() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background">
      <Spinner className="size-5" />
    </main>
  )
}
