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

const WORKSPACES = [
  { id: "bar-inc", name: "Bar Inc.", active: true },
  { id: "acme-corp", name: "Acme Corp", active: false },
]

export function WorkspaceSwitcher() {
  const [activeWorkspace, setActiveWorkspace] = React.useState("Bar Inc.")

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
            {WORKSPACES.map((workspace) => (
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
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Sparkles />
              Create workspace
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
