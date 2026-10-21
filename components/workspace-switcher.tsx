"use client"

import * as React from "react"
import { Building2, Check, ChevronDown, Sparkles } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  createWorkspaceAction,
  getWorkspaces,
} from "@/features/workspaces/actions"

interface WorkspaceItem {
  id: string
  name: string
}

const DEFAULT_WORKSPACES: WorkspaceItem[] = [
  { id: "bar-inc", name: "Bar Inc." },
  { id: "acme-corp", name: "Acme Corp" },
]

export function WorkspaceSwitcher() {
  const [workspaces, setWorkspaces] =
    React.useState<WorkspaceItem[]>(DEFAULT_WORKSPACES)
  const [activeWorkspace, setActiveWorkspace] = React.useState("Bar Inc.")

  React.useEffect(() => {
    let isMounted = true
    getWorkspaces().then((data) => {
      if (isMounted && data.length > 0) {
        setWorkspaces(data.map((w) => ({ id: w.id, name: w.name })))
        setActiveWorkspace((prev) =>
          data.some((w) => w.name === prev) ? prev : data[0].name
        )
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  async function handleCreateWorkspace() {
    const name = prompt("Enter new workspace name:")
    if (name?.trim()) {
      const trimmed = name.trim()
      const tempId = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      setWorkspaces((prev) => [{ id: tempId, name: trimmed }, ...prev])
      setActiveWorkspace(trimmed)
      await createWorkspaceAction(trimmed)
    }
  }

  return (
    <div className="group-data-[collapsible=icon]:hidden min-w-0 flex-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg p-1 text-left outline-hidden transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            />
          }
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-purple-600 text-white shadow-xs">
            <Building2 className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
            {activeWorkspace}
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start" side="bottom" sideOffset={6}>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => setActiveWorkspace(workspace.name)}
                className="gap-2 cursor-pointer"
              >
                <div className="flex size-6 items-center justify-center rounded-md bg-purple-600/10 text-purple-600 dark:bg-purple-600/20 dark:text-purple-400">
                  <Building2 className="size-3.5" />
                </div>
                <span className="flex-1 font-medium">{workspace.name}</span>
                {activeWorkspace === workspace.name && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={handleCreateWorkspace}
            >
              <Sparkles />
              Create workspace
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
