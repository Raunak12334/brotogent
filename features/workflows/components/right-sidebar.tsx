"use client"

import { useState, useTransition } from "react"
import { PlayIcon, Loader2Icon, CheckCircle2Icon, XCircleIcon, CircleDotIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRealtimeRun } from "@trigger.dev/react-hooks"
import { runWorkflowAction } from "@/features/workflows/actions"
import type { helloWorldTask } from "@/trigger/example"

type RunHandle = { runId: string; publicAccessToken: string }

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  QUEUED:       { label: "Queued",    color: "text-yellow-500", icon: <CircleDotIcon className="size-4" /> },
  DEQUEUED:     { label: "Starting",  color: "text-yellow-500", icon: <CircleDotIcon className="size-4" /> },
  EXECUTING:    { label: "Running",   color: "text-blue-500",   icon: <Loader2Icon className="size-4 animate-spin" /> },
  WAITING:      { label: "Waiting",   color: "text-blue-400",   icon: <Loader2Icon className="size-4 animate-spin" /> },
  COMPLETED:    { label: "Completed", color: "text-green-500",  icon: <CheckCircle2Icon className="size-4" /> },
  FAILED:       { label: "Failed",    color: "text-red-500",    icon: <XCircleIcon className="size-4" /> },
  CRASHED:      { label: "Crashed",   color: "text-red-500",    icon: <XCircleIcon className="size-4" /> },
  CANCELED:     { label: "Canceled",  color: "text-muted-foreground", icon: <XCircleIcon className="size-4" /> },
  SYSTEM_FAILURE: { label: "System error", color: "text-red-500", icon: <XCircleIcon className="size-4" /> },
}

function RunStatus({ runId, publicAccessToken }: RunHandle) {
  const { run, error } = useRealtimeRun<typeof helloWorldTask>(runId, {
    accessToken: publicAccessToken,
    enabled: !!runId,
    skipColumns: ["payload", "output"],
  })

  if (error) {
    return (
      <p className="flex items-center gap-1.5 text-sm text-red-500">
        <XCircleIcon className="size-4" />
        Failed to subscribe: {error.message}
      </p>
    )
  }

  if (!run) {
    return (
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Loader2Icon className="size-4 animate-spin" />
        Connecting…
      </p>
    )
  }

  const cfg = STATUS_CONFIG[run.status] ?? { label: run.status, color: "text-muted-foreground", icon: <CircleDotIcon className="size-4" /> }

  return (
    <div className="flex flex-col items-center gap-1 text-sm">
      <p className={`flex items-center gap-1.5 font-medium ${cfg.color}`}>
        {cfg.icon}
        {cfg.label}
      </p>
      <p className="text-xs text-muted-foreground font-mono">{runId}</p>
    </div>
  )
}

export function RightSidebar() {
  const [isPending, startTransition] = useTransition()
  const [handle, setHandle] = useState<RunHandle | null>(null)

  function handleRun() {
    startTransition(async () => {
      const result = await runWorkflowAction("test")
      setHandle(result)
    })
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <Button onClick={handleRun} disabled={isPending}>
        {isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlayIcon />
        )}
        {isPending ? "Triggering…" : "Run Test"}
      </Button>

      {handle && (
        <RunStatus runId={handle.runId} publicAccessToken={handle.publicAccessToken} />
      )}
    </div>
  )
}

